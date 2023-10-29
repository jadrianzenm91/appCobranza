$(document).ready(function () {

        
 //$('input.number').number(true, 2);
 
 
 //$('input.number').val('0.00');
var controls = $("input.number");
controls.bind("drop", function () {
    return false;
});
                
//Acciones
$('[data-toggle="tooltip"]').tooltip();
$('.collapse').toggleClass('in');// Abrir todos los paneles

$('nav li.active').removeClass('active'); //Al cargar la pagina se quita la clase ACTIVE del menú.

switch(window.location.pathname){
    case '/appSIGIN/ideasInversion': $('nav li[name=linkIdeasInversion]').addClass('active'); break;
    case '/appSIGIN/nuevoIOARR': $('nav li[name=linkNuevoIOARR]').addClass('active');
                                 $('nav a[name=linkGrupoNuevo]').parent().addClass('active');break;
    case '/appSIGIN/nuevoPIP': $('nav li[name=linkProyecto]').addClass('active'); 
                               $('nav a[name=linkGrupoNuevo]').parent().addClass('active');break;
    case '/appSIGIN/brechaIndicador': $('nav li[name=linkBrechaIndicador]').addClass('active'); break;
    case '/appSIGIN/admin/controlAcceso': $('nav li[name=linkControlAcceso]').addClass('active'); 
                                    $('nav a[name=linkGrupoAdmin]').parent().addClass('active');break;
    case '/appSIGIN/mantParametroValor': $('nav li[name=linkParametros]').addClass('active'); 
                                         $('nav a[name=linkGrupoAdmin]').parent().addClass('active');break;
}
//$('nav li.active').parent().addClass('in');

//Clases
$('.panel-heading').addClass('link');

window.alert = function (mensaje) {
      //$('#msj').html('<div class="message alert alert-danger" role="alert">' + mensaje + '</div>');
      $(".myAlert-bottom").show();
        setTimeout(function(){
          $(".myAlert-bottom").hide(); 
        }, 10);
};

});

function alerta(type, msj){
    if(type == 'success'){
        $('#divAlerta').html('<div class="myAlert-bottom alert alert-success" style="z-index:999999;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' 
        + "<strong>Excelente! </strong>" + msj + '</div>');
        $(".myAlert-bottom").show();
            setTimeout(function(){
              $(".myAlert-bottom").hide(); 
            }, 10000);
        }
    else if(type == 'warning'){
        $('#divAlerta').html('<div class="myAlert-bottom alert alert-warning" style="z-index:999999;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' 
        + "<strong>Alerta! </strong>" + msj + '</div>');
        $(".myAlert-bottom").show();
            setTimeout(function(){
              $(".myAlert-bottom").hide(); 
            }, 10000);
        }
    else if(type == 'danger'){
        $('#divAlerta').html('<div class="myAlert-bottom alert alert-danger"  style="z-index:999999;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' 
        + "<strong>Error! </strong>" + msj + '</div>');
        $(".myAlert-bottom").show();
            setTimeout(function(){
              $(".myAlert-bottom").hide(); 
            }, 10000);
    }
}

function urlApiLogin(path){
    return 'http://localhost:8082/api/v1/' + path;
}
function urlApiCobranza(path){
    return 'http://localhost:8081/api/v1/' + path;
}



