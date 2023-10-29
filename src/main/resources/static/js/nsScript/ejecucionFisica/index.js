/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
try {
    ns('SIGPI.ejecucionFisica.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.ejecucionFisica.Index.Page = new SIGPI.ejecucionFisica.Index.Controller();
        SIGPI.ejecucionFisica.Index.Page.Ini();        
    });
} catch (ex) {
    alert(ex.message);
}

