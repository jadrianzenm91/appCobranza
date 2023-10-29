/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.ComiteTrabajos.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.ComiteTrabajos.Index.Page = new SIGPI.ComiteTrabajos.Index.Controller();
        SIGPI.ComiteTrabajos.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

