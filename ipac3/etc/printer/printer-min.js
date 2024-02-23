/* (c) 1996-2010, Cosmotron */
/*global i3,console,Ext,alert,document,window */
if (typeof i3==='undefined') {i3={};} i3.version='i3 printer 1.0a - 22.02.12';
Ext.ux.Printer=function(){return{renderers:{},registerRenderer:function(b,a){this.renderers[b]=new (a)();
},getRenderer:function(a){return this.renderers[a];},print:function(a){var d=a.getXTypes().split("/");
for(var b=d.length-1;b>=0;b--){var e=d[b],c=this.getRenderer(e);if(c!=undefined){c.print(a);
break;}}}};}();Ext.override(Ext.Component,{getXTypes:function(){var a=this.constructor;
if(!a.xtypes){var e=[],b=this;while(b){var d=b.constructor.xtype;if(d!=undefined){e.unshift(d);
}b=b.constructor.superclass;}a.xtypeChain=e;a.xtypes=e.join("/");}return a.xtypes;
}});Ext.ux.Printer.BaseRenderer=Ext.extend(Object,{print:function(b){var a=b&&b.getXType?String.format("print_{0}_{1}",b.getXType(),b.id.replace(/-/g,"_")):"print";
var c=window.open("",a);c.document.write(this.generateHTML(b));if(Ext.isGecko){c.print();
c.close();return;}c.document.close();this.doPrintOnStylesheetLoad.defer(10,this,[c]);
},doPrintOnStylesheetLoad:function(c){var b=c.document.getElementById("csscheck"),a=b.currentStyle||getComputedStyle(b,null);
if(a.display!=="none"){this.doPrintOnStylesheetLoad.defer(10,this,[c]);return;}c.print();
c.close();},generateHTML:function(a){return new Ext.XTemplate('<!DOCTYPE html>',"<html>","<head>",'<meta charset="UTF-8"/>','<link href="'+this.stylesheetPath+"?"+new Date().getTime()+'" rel="stylesheet" type="text/css" media="screen,print"/>',"<title>"+this.getTitle(a)+"</title>","</head>","<body>",'<div id="csscheck"></div>',this.generateBody(a),"</body>","</html>").apply(this.prepareData(a));
},generateBody:Ext.emptyFn,prepareData:function(a){return a;},getTitle:function(a){return typeof a.getTitle=="function"?a.getTitle():(a.title||"Printing");
},stylesheetPath:"stylesheets/print.css"});Ext.ux.Printer.PanelRenderer=Ext.extend(Ext.ux.Printer.BaseRenderer,{generateBody:function(a){return String.format("<div class='x-panel-print'>{0}</div>",a.body.dom.innerHTML);
}});Ext.ux.Printer.registerRenderer("panel",Ext.ux.Printer.PanelRenderer);