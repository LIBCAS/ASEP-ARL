/**
 *
 * 02.05.24 on; podpora pro editaci ctenaru
 * 23.09.16 on; rozsirena funkce getDbFormat
 * 20.05.16 on; doplnena metoda getDbFormat
 */
/*global epca, Ext, i3*/
Ext.ns('epca');
epca.Config = {
    // 21.10.11 on; presunute do epca.Config.User
    /*ictx: 'Cbvk',
    webformURL: '/csp/cbvk/util.web.WebForm.cls',    // ulozeni formularu

    dbCat: 'CbvkUsCat',
    dbAuth: 'CbvkUsAuth',
    dbTab: 'CbvkUnTablesd',
    dbCatFmt: 'US',     // 02.09.11 on; doplneno
    dbAuthFmt: 'USA',   // 02.09.11 on; doplneno
    LinkDbCat: 'cbvk_us_cat',
    LinkDbAuth: 'cbvk_us_auth',
    DbNameCat: 'US_CAT',
    DbNameAuth: 'US_AUTH',

    displayFmt: 'US_BASIC',
    displayFmtAuth: 'USA_BASIC',  // 20.07.11 on; doplnene

    //shortDiplayFmtUnTabd: 'UNA_BASIC',
    shortDiplayFmtUnTabd: 'EPCAFORM_BASIC',

    defaultCatForm: 'bb',
    defaultAuthForm: 'EPCA_FORM_A_skoleni_1301648856',*/
    //time in miliseconds after the notification pop-up window from epca.notification disappears
    notificationHideTime: '5000',
    maxLanguageIndex: 3, // maximalna hodnota, pre ktore su definovane jazyky v DB
    getLinkDbValue: function(dbName) {
        switch (dbName) {
            case epca.Config.User.dbCat:
                return epca.Config.User.LinkDbCat;
            case epca.Config.User.dbAuth:
                return epca.Config.User.LinkDbAuth;
                // 02.05.24 on; podpora pro ctenare
            case epca.Config.User.dbUser:
                return i3.ictx.toLowerCase() + '_is_user';
            default:
                return undefined;
        }
    },
    /**
     * Vrati nazov DB podla hodnoty z mapy tagov
     * @param {Object} tagmapDbValue
     */
    getDbName: function(tagmapDbValue) {
        switch (tagmapDbValue) {
            case epca.Config.User.DbNameAuth:
                return epca.Config.User.dbAuth;
            case epca.Config.User.DbNameCat:
                return epca.Config.User.dbCat;
            case epca.Config.User.DbNameEpca:
                return epca.Config.User.dbEpca;
                // 02.05.24 on; podpora pro ctenare
            case 'IS_USER':
                return epca.Config.User.dbUser;
            default:
                return undefined;
        }
    },
    getUnFormat: function(dbName) {
        switch (dbName) {
            case epca.Config.User.dbCat:
                return 'B';
            case epca.Config.User.dbAuth:
                return 'A';
                // 02.05.24 on; podpora pro ctenare
            case epca.Config.User.dbUser:
                return 'U';
            default:
                return undefined;
        }
    },
    // 20.05.16 on; vrati format DB - US, USA ...
    getDbFormat: function(dbName) {
        var i, o;
        switch (dbName) {
            case epca.Config.User.dbCat:
                return epca.Config.User.dbCatFmt;
            case epca.Config.User.dbAuth:
                return epca.Config.User.dbAuthFmt;
            case epca.Config.User.dbEpca:
                return epca.Config.User.dbEpcaFmt;
                // 02.05.24 on; podpora pro ctenare
            case epca.Config.User.dbUser:
                return 'ISU';
        }
        // 22.09.16 on; pokud nic nenajde, zkusi jeste projit pole epca.Config.User.otherDbList
        if (epca.Config.User.otherDbList) {
            for (i = 0; i < epca.Config.User.otherDbList.length; i++) {
                o = epca.Config.User.otherDbList[i];
                if (dbName === o[0]) {
                    return o[1];
                }
            }
        }
        return undefined;
    },
    /**
     * Vrati zadany jazyk, vzhladom na maximalny pocet definovanych jazykov
     */
    getLanguage: function() {
        return Math.min(i3.language, epca.Config.maxLanguageIndex);
    }
    /*getDbAuthFmt: function()
     {
     return epca.Config.User.dbAuthFmt;
     },
     getDbCatFmt: function()
     {
     return epca.Config.User.dbCatFmt;
     } */
};
Ext.reg('epca.Config', epca.Config);
