

try {
    ns('SIGPI.ControlAccesos.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.ControlAccesos.Index.Page = new SIGPI.ControlAccesos.Index.Controller();
        SIGPI.ControlAccesos.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

