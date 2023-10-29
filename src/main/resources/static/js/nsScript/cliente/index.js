/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('COBRA.Cliente.Index');
    $(document).ready(function () {
        'use strict';
        COBRA.Cliente.Index.Page = new COBRA.Cliente.Index.Controller();
        COBRA.Cliente.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

