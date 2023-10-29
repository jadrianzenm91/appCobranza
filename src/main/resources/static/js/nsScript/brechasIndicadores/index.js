/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.BrechasIndicadores.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.BrechasIndicadores.Index.Page = new SIGPI.BrechasIndicadores.Index.Controller();
        SIGPI.BrechasIndicadores.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

