/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('COBRA.Login.Index');
    $(document).ready(function () {
        'use strict';
        COBRA.Login.Index.Page = new COBRA.Login.Index.Controller();
        COBRA.Login.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

