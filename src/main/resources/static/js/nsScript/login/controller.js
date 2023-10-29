/// <summary>
/// Script de Controladora de la Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('COBRA.Login.Index.Controller');
    COBRA.Login.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';
            
            base.Event.limpiarSessionStorage();
            base.Control.btnLogin().on('click', base.Event.submit);
            
        };

        base.Parametros = {
            
        };

        base.Control = {
            username: function () {
                return $('[name=username]');
            },
            password: function () {
                return $('[name=password]');
            },
            btnLogin: function () {
                return $('input[name=btnLogin]');
            },
            chkRecordarClave: function () {
                return $('input[name=chkRecordarClave]');
            }
        };

        base.Event = {
            submit: function(){
                 if(base.Control.username().val().trim().length == 0){
                   alerta('warning','Ingresar usuario.');
                   base.Control.username().focus();
                   return false;
                 }
                 else if(base.Control.password().val().trim().length == 0){
                    alerta('warning','Ingresar contraseña.');
                    base.Control.password().focus();
                    return false;
                 }
                 else{
                    base.Ajax.iniciarSession();
                 }
            },
            limpiarSessionStorage: function(){
                //ELIMINAMOS LOS DATOS DEL LOGIN ANTERIOR
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("menu");
            }
        	            
        };
        base.Ajax = {
            iniciarSession: function(){
                var user = base.Control.username().val().trim();
                var password = base.Control.password().val().trim();
                
                $.ajax({
                    async: true,
                    type: 'POST',
                    url: urlApiLogin('auth/login'),
                    data: {'usuario':user, 'password': password},
                    
                    success: function (response) {

                        if (response.success) {
                            
                            var user = response.data;
                            var obj = {
                                uuid: user.uuid,
                                idusuario: user.idusuario,
                                token : user.token,
                                usuario : user.usuario,
                                nombresCompletos: user.nombresCompletos,
                                fechaexp: user.fechaexp
                            };
                            sessionStorage.setItem("user", JSON.stringify(obj));
                            alerta(response.type, response.message);
                            setTimeout(function(){
                                window.location.href = '/cobrador/facturas';
                              }, 500);
                            
                            

                        } else {
                            alerta(response.type, response.message);
                        }
                    }
                });
                       
            }
           
        };
        base.Function = {
           
        };
           
    };
} catch (ex) {
    alert(ex.message);
}


