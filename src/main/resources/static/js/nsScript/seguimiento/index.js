/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.seguimiento.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.seguimiento.Index.Page = new SIGPI.seguimiento.Index.Controller();
        SIGPI.seguimiento.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

