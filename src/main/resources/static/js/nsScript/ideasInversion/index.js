/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.IdeasInversion.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.IdeasInversion.Index.Page = new SIGPI.IdeasInversion.Index.Controller();
        SIGPI.IdeasInversion.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

