/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('COBRA.dashboard.Index');
    $(document).ready(function () {
        'use strict';
        COBRA.dashboard.Index.Page = new COBRA.dashboard.Index.Controller();
        COBRA.dashboard.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

