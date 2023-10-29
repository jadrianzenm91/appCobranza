/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.parametroValor.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.parametroValor.Index.Page = new SIGPI.parametroValor.Index.Controller();
        SIGPI.parametroValor.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

