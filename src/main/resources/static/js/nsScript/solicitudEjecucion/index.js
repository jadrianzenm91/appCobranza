/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.SolicitudEjecucion.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.SolicitudEjecucion.Index.Page = new SIGPI.SolicitudEjecucion.Index.Controller();
        SIGPI.SolicitudEjecucion.Index.Page.Ini();        
    });
} catch (ex) {
    alert(ex.message);
}

