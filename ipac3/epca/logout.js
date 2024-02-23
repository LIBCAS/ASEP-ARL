/**
 * 21.10.19 on; predelano
 *
 * reakce na zmenu local storage
 */
/*global Ext,i3,epca,window,localStorage,location,console */
function handler() {
    try {
        // 21.10.19 on; predelane
        /*var UserIsLogin = i3.Login.ctx.isLoggedIn;
         if ((UserIsLogin) && (localStorage.getItem(ssoIctx) == 0)) {
         i3.Login.csFixLocationHrefLogout('ictx#language', true);
         }*/
        var ls = localStorage.getItem('loginarl');
        if (ls === '0') {
            //console.log("User is logout, reload page");
            location.reload();
        }
    } catch (ignore) {}
}
// listener se nastavi po spusteni/prihlaseni do aplikace (v URL neni parametr "logout")
// v pripade, ze se uzivatel odhlasi na jine zalozce z ipacu, provede odhlaseni i zde
try {
    if (window.addEventListener) {
        window.addEventListener('storage', handler, false);
    } else {
        window.attachEvent('onstorage', handler);
    }
} catch (e) {
    console.log('addEventListener not supported!');
}
