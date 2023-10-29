/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.ExpTecnico.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.ExpTecnico.Index.Page = new SIGPI.ExpTecnico.Index.Controller();
        SIGPI.ExpTecnico.Index.Page.Ini();        
    });
} catch (ex) {
    alert(ex.message);
}

