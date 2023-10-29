/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('COBRA.Tansversal.Index');
    $(document).ready(function () {
        'use strict';
        COBRA.Tansversal.Index.Page = new COBRA.Tansversal.Index.Controller();
        COBRA.Tansversal.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

