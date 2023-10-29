/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.seguimientoIOARR.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.seguimientoIOARR.Index.Page = new SIGPI.seguimientoIOARR.Index.Controller();
        SIGPI.seguimientoIOARR.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

