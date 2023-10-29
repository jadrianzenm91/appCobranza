/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.P02Perfil.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.P02Perfil.Index.Page = new SIGPI.P02Perfil.Index.Controller();
        SIGPI.P02Perfil.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

