/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('COBRA.Factura.Index');
    $(document).ready(function () {
        'use strict';
        COBRA.Factura.Index.Page = new COBRA.Factura.Index.Controller();
        COBRA.Factura.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

