

try {
    ns('SIGPI.UnidadEjecutoraInver.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.UnidadEjecutoraInver.Index.Page = new SIGPI.UnidadEjecutoraInver.Index.Controller();
        SIGPI.UnidadEjecutoraInver.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

