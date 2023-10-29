/// <summary>
/// Script de Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.PlanDeTrabajo.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.PlanDeTrabajo.Index.Page = new SIGPI.PlanDeTrabajo.Index.Controller();
        SIGPI.PlanDeTrabajo.Index.Page.Ini();
        
    });
} catch (ex) {
    alert(ex.message);
}

