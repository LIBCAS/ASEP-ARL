// vola se v pripade, kdy je v URL parametr "logout", tzn. uzivatel se odhlasil z aplikace a potrebujeme to sdelit jine zalozce z ipacem
try {
    if (localStorage.getItem(ssoIctx) != 0) {
        localStorage.setItem(ssoIctx, '0');
    }
} catch (e) {}
