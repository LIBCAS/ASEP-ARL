/// musi bezet na stejnem serveru jako ARL s contentServerem, pouze https
/// vyzaduje existenci adresare contmp v repozitari (repo)

var http = require('http');
var router = require('routes')();
var Busboy = require('busboy');
var fs = require('fs');
var Static = require('node-static');
var path = require('path');
var urlMod = require('url');
var Cookies = require( "cookies" );
var request = require('request');
var contentRange = require('content-range');

const port = 8068;
const home = '/home/cosmo/db_cav'
const repo = '/srv/lv1_asep_repository/repository1'
const base = 'https://asep.lib.cas.cz/';
//const base = 'https://asep-frontend-node.lib.cas.cz/';
const ipac = base + 'i2/i2.entry.cls?st=rest&op=uploader'
const timeout = 1000 * 60;

/*
var httpsOptions = {
  key: fs.readFileSync('/etc/pki/tls/private/asep.lib.cas.cz-nopw.key'),
  cert: fs.readFileSync('/etc/pki/tls/certs/asep.lib.cas.cz.pem'),
  ca: [ fs.readFileSync('/etc/pki/ca-trust/extracted/pem/chain_TERENA_SSL_CA_3.pem') ]
};
*/

var fileServer = new(Static.Server)(path.join(home, 'csp-dir'), { cache: 3600 });
const pathDir = path.join(repo, 'contmp');
var session = {};

// Define our route for uploading files
router.addRoute('/multipart_upload/*?', function (req, res, params) {
  var cookies = new Cookies( req, res);
  var sid = cookies.get("nsid");
  cookies.set("nsid",sid);
  console.log('nsid: ' + sid);
  
  if (req.method === 'POST') {  
    // Create an Busyboy instance passing the HTTP Request headers.
    var busboy = new Busboy({ headers: req.headers });
    var name = "", size = 0, mime = "", params = {};    
    var range = contentRange.parse(req.headers['content-range']);    
    
    // Listen for event when Busboy finds a file to stream.
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      //console.log('fieldname: ' + fieldname, 'filename: ' + filename, 'encoding: ' + encoding, 'mimetype: ' + mimetype);
      const pathFile = pathToFile(pathDir, sid, filename);
      name = filename, mime = mimetype;
      
      
      fs.stat(pathFile, function(err, stats) {
        var len = 0;
        if (stats && stats.size && (!range || range.first == 0 )) {
          console.log('delete: ',pathFile, ', size: ', stats.size);
          fs.unlinkSync(pathFile);  // tohle by melo byt vyjimecne
          stats.size=0;
        }
        
        var stream = fs.createWriteStream(pathFile, {flags:'a'});
            
        // We are streaming! Handle chunks
        file.on('data', function (chunk) {
          len = len + chunk.length;
          //console.log('data: ' + chunk.length);
          stream.write(chunk);
        });
        
        // Completed streaming the file.
        file.on('end', function () {
          console.log('Finished with ' + fieldname);				
          stream.end();
          
          //console.dir(stats);
          if (stats) {            
            size = stats.size+len;
          } else {
            size = len;
          }
        });
      });
    });
    
    // Listen for event when Busboy finds a non-file field.
    busboy.on('field', function (fieldname, val) {
      //console.log(fieldname, val);
      params[fieldname]=val;
    });
    
    // Listen for event when Busboy is finished parsing the form.
    busboy.on('finish', function () {
      res.statusCode = 200;
      console.log(size, name);
      //console.dir(params);
      var isReq = false;
      
      if (!range || range.first == 0 || range.last+1 == range.length) {
        var url = ipac + '&ctype=' + mime + '&nodesid=' + sid + '&origname=' + encodeURIComponent(name) + '&size=' + size;
        var cspchd = session[sid];
        if (cspchd) {
          url = url + '&OCSPCHD=' + cspchd + '&CSPCHD=' + cspchd;
        }
        if (range) {
          if (range.first == 0) {
            url = url + '&nodefirst=' + range.length;
          }
          else if (size != range.length) {
            var msg={files:[{error: 'size'}]};
            res.end(JSON.stringify(msg));
            return;
          }
        }
        
        for (var key in params) {        
          url = url + '&' + key + '=' + encodeURIComponent(params[key]);
        }
        console.log(url);            

        request({url:url,timeout:timeout}, function(error, res3, body) { 
          if (!error) {
            console.log(body);
            try {
              var res2 = JSON.parse(body.split('<')[0]);
            } catch (e) {
              var res2 = {error: 'parse'};
            }
            if (res2.error) {
              var msg={files:[{name: name, error: res2.error}]};
            } else {
              session[sid] = res2.cspchd;
              var url = res2.url.replace('http://localhost/', base);
              var msg={files:[{name: name, size: res2.size, url:url, finished: res2.finished}]};
            }          
            res.end(JSON.stringify(msg));
          } else {
            console.log('request error');
            console.dir(error);
            res.end('chyba');
          }
        });        
      } else {
        //console.dir(range);
        console.log(req.headers['content-range']);
        var msg={files:[{name: name, size: size, finished: 0}]}
        res.end(JSON.stringify(msg));
      }
    });
    
    // Pipe the HTTP Request into Busboy.
    req.pipe(busboy);
  } else {
    var url_parts = urlMod.parse(req.url, true);
    var query = url_parts.query;    
    const pathFile = pathToFile(pathDir, sid, query.file);
    
    fs.stat(pathFile, function(err, stats) {
      if (stats) {
        console.log('resume:', query.resume, query.file, stats.size);    
        res.end(JSON.stringify({files:[{name: query.file, size:stats.size, finished:0}]}));
      } else {
        console.log('resume:', query.resume, query.file, 0);    
        res.end(JSON.stringify({files:[{name: query.file, size:0, finished:0}]}));
      }      
    });    
  }
});

router.addRoute('/i2/*', function (req, res, params) {
  var part = req.url.split('/i2/')[1]
  console.log(req.url, part);
  //console.dir(params);  
  req.url = part;  
  fileServer.serve(req, res);  
});

router.addRoute('/uploader.html?*', function (req, res, params) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  var url_parts = urlMod.parse(req.url, true);
  var query = url_parts.query;        
  console.dir(query);
  
  var htmlfile=query.lang==='en' ? 'uploader-en.html' : 'uploader.html'
  console.log('cspfile:',htmlfile);
  var lang=query.lang==='en' ? '&language=3' : ''
  
  fs.readFile(path.join(home, 'csp-dir', 'user', query.ictx, htmlfile), 'utf8', function (err,data) {
    if (err) {
      console.log(err);
      res.end('ugh');
      return;
    }    
    
    var cookies = new Cookies( req, res);
    var sid = cookies.get("nsid") || random(100000000, 999999999);
    cookies.set("nsid",sid);
    console.log('nsid: ' + sid);
    
    var url = ipac + '&ictx='+query.ictx + '&repository='+query.repo + '&idx='+query.idx + '&multi=1&node=main'
                   + '&nodesid='+sid + '&nodeuser='+query.user + '&nodecred='+query.cred + lang;
    console.log(url);

    request({url:url,timeout:timeout}, function(error, res2, body) { 
      var result = data.replace(/%IDX%/g, query.idx);
      result = result.replace(/%ICTX%/g, query.ictx);      
      
      if (!error) {
        //body = body.replace(/http:\/\/localhost\//g, base);
        body = body.replace(/http:\/\//g, 'https://');
        result = result.replace('%MAIN%', body);
      } else {
        result = result.replace('%MAIN%', "CHYBA SPOJENI");
      }
      
      res.end(result);
    });
  });
});

// var server = https.createServer(httpsOptions, function (req, res) {
var server = http.createServer(function (req, res) {

  // Check if the HTTP Request URL matches on of our routes.
  var match = router.match(req.url);  
  
  // We have a match!
  if (match) match.fn(req, res, match.params);
});

server.listen(port, function () {
  console.log('Listening on port ' + port);
});

function pathToFile(pathDir, sid, filename) {
  return path.join(pathDir, 'node_' + sid + '_' + filename.replace(/[\"*:<>?\\/|]/gi, '_'));
}

function random(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low).toString();
}

