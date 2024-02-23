/**
 * 20.05.16 on; uprava getRecord
 */
/*global epca, Ext, i3*/
Ext.ns('epca');
/**
 *  funcie/metody pre pracu so zaznamami v ramci evidencie zaznamov
 *
 */
epca.WsRecord = {
    getRecord: function(recordId, form) {
        i3.WS.getRecord({
            classn: epca.Config.User.dbCat,
            fmt: 'LINEMARC',
            t001: recordId,
            success: function(selectedRecord, processFunction) {
                // 20.05.16 on; zmena
                //form.get(0).setMarc(epca.convertToObject(selectedRecord.data, epca.Config.getUnFormat(epca.Config.User.dbAuth)));
                form.get(0).setMarc(epca.convertToObject(selectedRecord.data, epca.Config.getDbFormat(epca.Config.User.dbAuth)));
                //form.populateForm()
            },
            failure: function(errmsg, o) {
                this(undefined, o);
                //Ext.example.msg('Error', 'Pri ukladaní formulára sa vyskytla chyba: {0}',errmsg);
            },
            scope: this
        });
    }
};
