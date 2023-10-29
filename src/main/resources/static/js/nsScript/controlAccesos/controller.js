
try {
    ns('SIGPI.ControlAccesos.Index.Controller');
    SIGPI.ControlAccesos.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';

            base.Function.cargarBandeja();
            $('input[data-findenter=1]').on('keypress', function (e) {
                if (e.which == 13) {
                    base.Event.clickBuscar();
                }
            });
            base.Control.btnBuscar().on('click', base.Event.clickBuscar);
            base.Control.btnAgregar().on('click', base.Event.clickAgregar);
            base.Control.tablaControlAccesos().on('click', '.fa-sync-alt', function () {
                base.Event.clickEditarPassword($(this));
            });
            base.Control.cboListaPerfil().on('change', base.Event.changeListaPerfil);

            base.Control.tablaControlAccesos().on('click', '.fa-user-tie', function () {
                base.Event.clickEditarPerfil($(this));
            });
            base.Control.btnGuardarPassword().on('click', base.Event.clickGuardarPassword);
            base.Control.btnGuardarPasswordPropio().on('click', base.Event.clickGuardarPasswordPropio);
            base.Control.btnGuardarPerfil().on('click', base.Event.clickGuardarPerfil);

            base.Control.tablaControlAccesos().on('click', 'input[type=checkbox]', function () {
                base.Event.clickEstadoUsuario($(this).is(':checked'), $(this).attr('data-id'));
            });
        };
        base.Parametros = {
            Seleccione: {
                text: "-- Seleccione --",
                value: "-1"
            },
            ingrese: {
                text: "",
                value: ""

            },
            Mensajes: {
                TituloMensajeConfirmacion: Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion,
                Confirmacion: Web.SIGPI.MensajeSistema.Confirmacion
            }

        };
        base.Control = {
            tablaControlAccesos: function () {
                return $('#tblControlAccesos');
            },
            cboListaPerfil: function () {
                return $('#cboListaPerfil');
            },
            txtNumSerie: function () {
                return $('#txtNumSerie');
            },
            btnBuscar: function () {
                return $('#btnBuscar');
            },
            btnAgregar: function () {
                return $('#btnAgregar');
            },
            txtNsa: function () {
                return $('#txtNsa');
            },
            txtGrado: function () {
                return $('#txtGrado');
            },
            txtDatos: function () {
                return $('#txtDatos');
            },
            txtDatos1: function () {
                return $('#txtDatos1');
            },
            txtNombres: function () {
                return $('#txtNombres');
            },
            txtUnidad: function () {
                return $('#txtUnidad');
            },
            txtPassword: function () {
                return $('#txtPassword');
            },
            txtPerfil: function () {
                return $('#txtPerfil');
            },
            txtIdperfil: function () {
                return $('#txtIdperfil');
            },
            txtIdperfil1: function () {
                return $('#txtIdperfil1');
            },
            modalEditarPassword: function () {
                return $('#mdlEditarPassword');
            },
            modalEditarPerfil: function () {
                return $('#mdlEditarPerfil');
            },
            btnGuardarPassword: function () {
                return $('#btnGuardarPassword');
            },
            btnGuardarPasswordPropio: function () {
                return $('#btnGuardarPasswordPropio');
            },
            btnGuardarPerfil: function () {
                return $('#btnGuardarPerfil');
            }
        };
        base.Event = {
            clickEditarPassword: function (objt) {
                base.Ajax.UpdUsuarioPassword($(objt).data('id'));
                base.Control.modalEditarPassword().modal('show');
            },
            clickEditarPerfil: function (objt) {
                base.Ajax.UpdUsuarioPassword($(objt).data('id'));
                base.Control.modalEditarPerfil().modal('show');
            },
            clickGuardarPassword: function () {
                BootstrapDialog.confirm(base.Parametros.Mensajes.TituloMensajeConfirmacion, base.Parametros.Mensajes.Confirmacion, function (result) {
                    if (result) {
                        var objt = {
                            idusuario: base.Parametros.codigoControlAcceso,
                            password: base.Control.txtPassword().val()
                        };
                        console.log(objt);
                        base.Ajax.ajaxGuardarPassword(objt);
                    }
                });
            },
            clickGuardarPasswordPropio: function () {
                if (base.Function.validarPassword()) {
                            var objt = {
                                idusuario: base.Control.txtDatos().val(),
                                password: base.Control.txtPassword().val()
                            };
                            console.log(objt);
                            base.Ajax.ajaxGuardarPassword(objt);
                }
            },
            clickGuardarPerfil: function () {
                BootstrapDialog.confirm(base.Parametros.Mensajes.TituloMensajeConfirmacion, base.Parametros.Mensajes.Confirmacion, function (result) {
                    if (result) {
                        var objt = {
                            idusuario: base.Parametros.codigoControlAcceso,
                            idperfil: base.Control.txtIdperfil().val()
                        };
                        console.log(objt);
                        base.Ajax.ajaxGuardarPerfil(objt);
                    }
                });
            },
            clickBuscar: function () {
                if (base.Function.validarCampos()) {
                    base.Ajax.getControlAcceso(base.Control.txtNumSerie().val());
                }
            },
            clickAgregar: function () {
                if (base.Function.validarCamposs()) {
                    BootstrapDialog.confirm(base.Parametros.Mensajes.TituloMensajeConfirmacion, base.Parametros.Mensajes.Confirmacion, function (result) {
                        if (result) {
                            var obj = {
                                nsa: base.Control.txtNsa().val(),
                                usuario: base.Control.txtNsa().val(),
                                idperfil: base.Control.txtIdperfil1().val()
                            };
                            base.Ajax.ajaxGuardar(obj);
                        }
                    });
                }
            },
            clickEstadoUsuario: function (estado, id) {
                var item = {
                    idusuario: id,
                    estado: estado

                };
                base.Ajax.setEstadoUsuario(item);
            },
            changeListaPerfil: function () {
                var param = {
                    value: base.Control.cboListaPerfil().val()
                };

                base.Ajax.getDataControlDesplegable('cargarPerfil', param);
            }
        };
        base.Ajax = {
            ajaxGuardarPassword: function (objt) {
                $.ajax({
                    "url": 'actualizarUsuarioPassword',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(objt),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Control.modalEditarPassword().modal('hide');
                        base.Function.cargarBandeja();
                        base.Function.limpiarCampos;

                    }
                });
            },
            ajaxGuardarPerfil: function (objt) {
                $.ajax({
                    "url": 'actualizarUsuarioPerfil',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(objt),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Control.modalEditarPerfil().modal('hide');
                        base.Function.cargarBandeja();
                    }
                });
            },
            UpdUsuarioPassword: function (id) {
                $.ajax({
                    "url": 'getUsuarioPassword',
                    "type": 'GET',
                    "data": {"id": id},
                    success: function (res) {
                        console.log(res);
                        base.Function.cargarDatosUsuarioPAssword(res.data);
                    }
                });
            },
            ajaxGuardar: function (obj) {
                $.ajax({
                    "url": 'registrarUsuario',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(obj),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Function.cargarBandeja();
                        base.Function.limpiarCamposDatosUsuarios();
                    }
                });
            },
            getControlAcceso: function (id) {
                $.ajax({
                    "url": 'BuscarUsuario',
                    "type": 'GET',
                    "data": {"nsa": id},
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Function.cargarDatosControlAcceso(data.data);
                        return data.data;
                    }
                });
            },
            setEstadoUsuario: function (item) {
                $.ajax({
                    "url": 'actualizarEstadoUsuario',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(item),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                    }
                });
            },
            getDataControlDesplegable: function (url, controlDestino, data, callback) {
                $.ajax({
                    "url": url,
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(data),
                    success: function (res) {
                        console.log(res);
                        base.Function.cargarControlDesplegable(controlDestino, res.data, callback);
                    }
                });
            }
        };
        base.Function = {
            limpiarCamposDatosUsuarios: function () {
                base.Control.txtNumSerie().val('');
                base.Control.txtNsa().val('');
                base.Control.txtGrado().val('');
                base.Control.txtNombres().val('');
                base.Control.txtUnidad().val('');
                base.Control.txtIdperfil1().val('-1');
            },
            limpiarCampos: function () {
                base.Control.txtPassword().val('');
            },
            validarPassword: function () {
                var cadena = '';
                if (base.Control.txtPassword().val() == base.Parametros.ingrese.value) {
                    cadena += '<br>Ingrese Contraseña Nueva';
                }
                if (cadena.length > 0) {
                    alerta('warning', cadena);
                    return false;
                }
                return true;
            },
            validarCamposs: function () {
                var cadena = '';
                if (base.Control.txtNsa().val() == base.Parametros.ingrese.value) {
                    cadena += '<br>Numero de Serie invalido';
                }

                if (base.Control.txtIdperfil1().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe Seleccionar Perfil del usuario.';
                }
                if (base.Control.txtNsa().val() != base.Control.txtNumSerie().val()) {
                    cadena += '<br>Datos de Usuario no corresponden a Numero de Serie';
                }
                if (cadena.length > 0) {
                    alerta('warning', cadena);
                    return false;
                }
                return true;
            },
            validarCampos: function () {
                var cadena = '';
                if (base.Control.txtNumSerie().val() == base.Parametros.ingrese.value) {
                    cadena += '<br>Ingrese Numero de Serie';
                }
                if (cadena.length > 0) {
                    alerta('warning', cadena);
                    return false;
                }
                return true;
            },
            cargarDatosControlAcceso: function (data) {
                if (data === null) {
                    base.Control.txtGrado().val("");
                    base.Control.txtNombres().val("");
                    base.Control.txtUnidad().val("");
                } else {
                    base.Control.txtNsa().val(data.nsa);
                    base.Control.txtGrado().val(data.grado);
                    base.Control.txtNombres().val(data.nombres);
                    base.Control.txtUnidad().val(data.unidad);
                }
            },
            cargarDatosUsuarioPAssword: function (data) {
                base.Parametros.codigoControlAcceso = data.idusuario;
                base.Control.txtDatos().val(data.datos);
                base.Control.txtDatos1().val(data.datos);
                base.Control.txtIdperfil().val(data.idperfil);
            },
            cargarControlDesplegable: function (control, data, callback) {
                $(control).empty();
                if (data.length > 1) {
                    control.append(new Option(base.Parametros.Seleccione.text, base.Parametros.Seleccione.value));
                }
                $.each(data, function (index, item) {
                    control.append(new Option(item.text, item.value));
                });
                if (data.length == 1 && callback !== undefined) {
                    callback();
                }
            },
            cargarBandeja: function () {
                var obj = {
                    pageInfo: null
                };

                base.Control.tablaControlAccesos().DataTable({
                    "bFilter": true,
                    bDestroy: true,
                    "ordering": false,
                    "cache": false,
                    "bProcessing": false,
                    "bPaginate": true,
                    "ajax": function (request, callback, settings) {
                        obj.pageInfo = this.fnPagingInfo();
                        console.log(obj);
                        console.log(this.fnPagingInfo());
                        $.ajax({
                            "url": 'ListControlAcceso',
                            "type": 'POST',
                            contentType: "application/json",
                            "dataType": 'json',
                            "data": JSON.stringify(obj),
                            success: function (data) {
                                console.log(data);
                                var result = data.data;
                                callback({
                                    'data': result
                                });
                            }
                        });
                    },
                    "columns": [
                        {"data": "nsa", "title": "Nsa"},
                        {"data": "nombres", "title": "Nombre"},
                        {"data": "sigla", "title": "Unidad"},
                        // {"data": "password", "title": "Password"},
                        {"data": "perfil", "title": "Perfil"},
                        {"data": "feccreacio", "title": "Fecha de creacion"},
                        {
                            "data": "idusuario", "title": "estado", "sType": "html", "mRender": function (data, type, full)
                            {
                                return '<label class="switch"><input type="checkbox" data-id="' + full.idusuario + '"  ' + (full.estado == true ? "checked" : "") + '><span class="slider round"></span></label>'
                            }
                        },
                        {
                            "data": "nsa", "title": "Acción", "sType": "html", "mRender": function (data, type, full)
                            {
                                return '<span data-toggle="tooltip" data-placement="top" title="Modificar Contraseña" class="fas fa-sync-alt" data-id="' + full.idusuario + '" data-toggle="modal" data-target="#mdlEditarPassword"></span>' +
                                        '<span data-toggle="tooltip" data-placement="top" title="Modificar Perfil" class="fas fa-user-tie" data-id="' + full.idusuario + '" data-toggle="modal" data-target="#mdlEditarPerfil"></span>'
                            }
                        }
                    ],
                    'fnDrawCallback': function () {
                        validarPermiso();
                        $('thead tr th.sorting_asc').removeClass('sorting_asc');
                        $('table').removeClass('dataTable');
                        $('table .fas').parent().addClass('accion');
                        $('[data-toggle="tooltip"]').tooltip();
                    },
                });
            }
        };
    };
} catch (ex) {
    alert(ex.message);
}
