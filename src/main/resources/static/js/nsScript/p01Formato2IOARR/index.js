try {
    ns('SIGPI.p01Formato2IOARR.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.p01Formato2IOARR.Index.Page = new SIGPI.p01Formato2IOARR.Index.Controller();
        SIGPI.p01Formato2IOARR.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}


