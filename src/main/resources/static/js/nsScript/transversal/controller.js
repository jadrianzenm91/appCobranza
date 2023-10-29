/// <summary>
/// Script de Controladora de la Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('COBRA.Tansversal.Index.Controller');
    COBRA.Tansversal.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';
            
            base.Event.loadPage();
            base.Control.btnSalir().on('click', base.Event.cerrarSesion);
            
        };

        base.Parametros = {
            Url : {
                irLogin: '/'
            }
        };

        base.Control = {
            
            btnSalir: function () {
                return $('[name=lblSalir]');
            },
            lblUsuario: function () {
                return $('[name=lblUsuario]');
            }
        };

        base.Event = {
            
            loadPage: function(){
                
                if(sessionStorage.getItem("user")){
                    /*if(!sessionStorage.getItem("menu")){//no existe menu
                        base.Ajax.cargarModulo();//obtenemos menu por token usuario
                    }
                    else{
                        base.Event.mostrarDatosPrincipal();
                    }*/
                    base.Event.mostrarDatosPrincipal();
                    base.Ajax.validarToken();
                    
                }else{
                    base.Event.irPageLogin('Usuario expirado');
                }
                
                
            },
            mostrarDatosPrincipal: function(){
                 //base.Function.escribirMenu();
                 base.Function.escribirUsuario();
                 //base.Function.escribirMenuTabs();
            },
            cerrarSesion: function(){
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("menu");
                 window.location = base.Parametros.Url.irLogin;
            },
            irPageLogin: function(msg){
                alerta(null, msg);
                window.location = base.Parametros.Url.irLogin;
                
            }
        	            
        };
        base.Ajax = {
            cargarModulo: function(){
                 $.ajax({
                    "url":  URL_API_LOGIN+ '/user/getModulos',
                      "type": 'POST',
                     "dataType": 'json',
                     contentType: "application/json",
                     success: function (response) {
                         
                         if(response.success){
                             sessionStorage.setItem("menu", JSON.stringify(response.data));
                             
                             if(response.data.length > 0){//existe menu
                               //base.Event.mostrarDatosPrincipal();
                             }   
                         }else{
                             base.Event.irPageLogin(response.message);
                         }
                     }
                     

                 }); 
            },
            cargarSubModulo: function(){
                 $.ajax({
                    "url":  URL_API_LOGIN+ '/user/getSubModulos',
                      "type": 'POST',
                     "dataType": 'json',
                     contentType: "application/json",
                     success: function (response) {
                         
                         if(response.success){
                             sessionStorage.setItem("menu", JSON.stringify(response.data));
                             
                             if(response.data.length > 0){//existe menu
                               base.Event.mostrarDatosPrincipal();
                             }   
                         }else{
                             base.Event.irPageLogin(response.message);
                         }
                     }
                     

                 }); 
            },
            cargarAccesos: function(){
                 $.ajax({
                    "url":  URL_API_LOGIN+ '/user/obtenerAccesosPorToken',
                      "type": 'POST',
                     "dataType": 'json',
                     contentType: "application/json",
                     success: function (response) {
                         
                         if(response.success){
                             sessionStorage.setItem("menu", JSON.stringify(response.data));
                             
                             if(response.data.length > 0){//existe menu
                               base.Event.mostrarDatosPrincipal();
                             }   
                         }else{
                             base.Event.irPageLogin(response.message);
                         }
                     }
                     

                 }); 
            },
            
            validarToken: function(){
                $.ajax({
                    "url":  urlApiLogin('auth/validarToken'),
                      "type": 'POST',
                     success: function (response) {
                         
                         $("input[name='hdnHostname']").val(response.data.hostname);
                         $("input[name='hdnIp']").val(response.data.ipTerminal);
                            
                         if(!response.success){
                             alerta(response.type, response.message);
                             base.Event.irPageLogin(response.message);
                         }
                     }
                     /*beforeSend: function (xhr, jqXAjax) {
                        
                        if(sessionStorage.getItem("user")){
                            var hdnHostname = $("input[name='hdnHostname']").val();
                            var hdnIp = $("input[name='hdnIp']").val();
                             var user = JSON.parse(sessionStorage.getItem("user"));
                              xhr.setRequestHeader("token", user.token); 
                              xhr.setRequestHeader("usuario", user.usuario); 
                              xhr.setRequestHeader("idusuario", user.idusuario); 
                              xhr.setRequestHeader("hdnHostname", hdnHostname); 
                              xhr.setRequestHeader("hdnIp", hdnIp); 
                        }
                    }*/

                 }); 
            }
            
        };
        base.Function = {
           escribirMenu: function(){
                var listaMenu = JSON.parse(sessionStorage.getItem("menu"));
                var cadMenu = "";
                $('.list-unstyled').html("");
                $.each(listaMenu, function(i, item){
                      //MENU PADRE
                     if(item.idPadre==0){
                        
                         cadMenu+='<li>';
                         if(base.Function.existeSubMenu(listaMenu, item.idMenu)){
                             cadMenu+='<a href="#'+item.idMenu+'" data-toggle="collapse" aria-expanded="true" '+ (item.blank=='1'? " target='_blank'": "") +'>'+item.menu+'</a>';
                             //MENU HIJOS
                             cadMenu+='<ul class="list-unstyled collapse in" id="'+item.idMenu+'">';
                             $.each(listaMenu, function(j, itemHijo){
                                 if(item.idMenu == itemHijo.idPadre){
                                     cadMenu+='<li><a href="'+itemHijo.url+ '" '+ (itemHijo.blank=='1'? " target='_blank'": "") + '">'+itemHijo.menu+'</a></li>';
                                 }
                             });
                             cadMenu+='</ul>';
                         }else{
                             cadMenu+='<a href="'+item.url+ (item.blank=='1'? " target='_blank'": "")+ ' ">'+item.menu+'</a>';
                         }

                         cadMenu+='</li>';
                     }
                 });
                 $('.list-unstyled').append(cadMenu);
                 
           },
           escribirMenuTabs: function(){
                var listaMenu = JSON.parse(sessionStorage.getItem("menu"));
                var cadMenu = "";
                $('[name=ulTabs]').html("");
                $.each(listaMenu, function(i, item){
                    //OPCIONES DE ULTIMO NIVEL
                     if(item.url!="#"){
                         cadMenu+='<li name="'+item.menu+'"><a href="'+item.url+'" '+(item.blank=='1'? " target='_blank'": "")+'>'+item.menu+'</a></li>';
                     }
                     
                 });
                 $('[name=ulTabs]').append(cadMenu);
                 base.Function.activarCssMenuActive();
                 
           },
           existeSubMenu: function(listaMenu, idMenu){
             var result=false;
                   
                   $.each(listaMenu, function(j, itemHijo){
                        if(idMenu == itemHijo.idPadre){
                            result = true; 
                            return false;//salir del each
                        }
                    });
                    
                    return result;  
           },
           activarCssMenuActive: function(){
               $.each($('[name=ulTabs] li a'), function(i, item){
                   if(location.pathname == $(item).attr('href')){
                        $(item).parent('li').addClass('active');
                    }
               })
               
           },
           escribirUsuario: function(){
               var usuario = JSON.parse(sessionStorage.getItem("user"));
               base.Control.lblUsuario().text(usuario.nombresCompletos);
           },
           escribirAnimation: function(data){
               var usuario = JSON.parse(sessionStorage.getItem("user"));
               
               base.Control.divAnimationTeams().html('');    
               $.each(data, function(index, item){
                  var enlace = '';
                  if(item.nombredoc.indexOf('.mp4')>0){
                    enlace = '<a>'+item.resumen+'</a>';
                    enlace += '<div class="embed-responsive embed-responsive-4by3"><video preload="none" controls loop muted width="320" height="240">'+
                                '<source src="'+COBRA.URL.CROSS.contextPath+'/showmov?id='+item.nombredoc+'" type="video/mp4">'+
                              '</video></div>';
                  }else if(item.nombredoc.indexOf('.pdf')>0){
                    enlace='<a href="' + COBRA.URL.CROSS.DownloadFile + item.nombredoc + '/'+usuario.token+'/'+usuario.idusuario+ '" target="_blank">'+item.resumen+'</a>';
                  }else{
                      enlace = item.resumen;
                  }
                                      
                  var cadena = '<div class="panel panel-info">'+
                                    '<div class="panel-heading">'+
                                      '<h4 class="panel-title">Fecha Publicacion: '+item.feccreacio+'</h4>'+
                                   '</div>'+
                                    '<div>'+
                                      '<div class="panel-body">'+
                                          '<div class=" row">'+
                                            '<div class="col-md-12">'+
                                              enlace+
                                            '</div>'+
                                          '</div>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>';
                  base.Control.divAnimationTeams().append(cadena);    
               });
           }
        };
           
    };
} catch (ex) {
    alert(ex.message);
}


