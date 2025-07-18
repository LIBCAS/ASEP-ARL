/** ZAKLAD obrazovky pwd dialog
 * nedokoncene, pretoze sa zatial zvolilo ine riesenie
 *
 * 02.03.12 on; zrusene *jslint laxbreak: true *
 * 03.04.09 rs; uprava formatovania + zrusenie tried i3.ui.cs
 */
//
// 04.06.08 rs;
// --
/*global Ext,i3,alert */
Ext.ns('i3.ui.PwdDlg');
// panel
i3.ui.PwdDlg.Panel = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        items: [{
            xtype: 'textfield',
            name: 'pwd',
            fieldLabel: 'Password',
            width: 180
        }, {
            xtype: 'textfield',
            name: 'pwd',
            fieldLabel: 'Password confirmation',
            width: 180
        }]
    });
    i3.ui.PwdDlg.Panel.superclass.constructor.call(this, config);
};
Ext.extend(i3.ui.PwdDlg.Panel, Ext.form.FormPanel);
// window wrapping
//
// config options:
//  idpref: id prefix of the window
//
i3.ui.PwdDlg.Win = function(config) {
    config = config || {};
    // makra na jednoduche prefixovanie id-ciek elementov
    var idpref = i3.getIdPrefFn(config.idpref),
        getCmp = i3.getCmpFn(config.idpref);
    Ext.apply(config, {
        id: 'PwdDlg' // ZATIAL predpokladame len jeden
            ,
        layout: 'fit',
        width: 300,
        height: 380,
        minWidth: 200,
        minHeight: 250,
        closable: true,
        plain: true,
        resizable: true,
        modal: true,
        closeAction: 'hide' //, tbar:        toolBar
            ,
        items: new i3.ui.PwdDlg.Panel()
    });
    i3.ui.PwdDlg.Win.superclass.constructor.call(this, config);
};
//Ext.extend(i3.ui.PwdDlg.Win, Ext.Window, {
//});
// Globalna funkcia na ziskanie objektu PwdDlg okna
// zatial vyzera, ze by mohlo stacit jedno pre celu app.
// Neskor sa moze pripadne upravit
//
i3.ui.PwdDlg.getWin = function() {
    var fp = Ext.getCmp('pwddlg');
    if (!fp) {
        fp = new i3.ui.PwdDlg.Win({
            idpref: 'pwdd_'
        });
    }
    return fp;
};
