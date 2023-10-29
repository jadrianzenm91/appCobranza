/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
try {
    ns('SIGPI.inforConsistPIP.Index');
    $(document).ready(function () {
        'use strict';
        SIGPI.inforConsistPIP.Index.Page = new SIGPI.inforConsistPIP.Index.Controller();
        SIGPI.inforConsistPIP.Index.Page.Ini();        
    });
} catch (ex) {
    alert(ex.message);
}

