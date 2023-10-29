/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.nuevoIOARR.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.nuevoIOARR.Index.Page = new SIGPI.nuevoIOARR.Index.Controller();
        SIGPI.nuevoIOARR.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

