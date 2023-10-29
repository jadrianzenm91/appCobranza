/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.nuevoPIP.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.nuevoPIP.Index.Page = new SIGPI.nuevoPIP.Index.Controller();
        SIGPI.nuevoPIP.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

