/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.Base.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.Base.Index.Page = new SIGPI.Base.Index.Controller();
        SIGPI.Base.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

