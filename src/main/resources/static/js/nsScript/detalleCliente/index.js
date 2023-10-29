/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('COBRA.detalleCliente.Index');
    $(document).ready(function () {
        'use strict';
        COBRA.detalleCliente.Index.Page = new COBRA.detalleCliente.Index.Controller();
        COBRA.detalleCliente.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

