/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
try {
    ns('SIGPI.liquidacionInversion.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.liquidacionInversion.Index.Page = new SIGPI.liquidacionInversion.Index.Controller();
        SIGPI.liquidacionInversion.Index.Page.Ini();        
    });
} catch (ex) {
    alert(ex.message);
}

