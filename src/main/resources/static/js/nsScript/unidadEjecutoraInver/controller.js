
try {
    ns('SIGPI.UnidadEjecutoraInver.Index.Controller');
    SIGPI.UnidadEjecutoraInver.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';

            base.Function.cargarBandeja();
            base.Control.btnBuscar().on('click', base.Event.clickBuscar);
            base.Control.btnAgregar().on('click', base.Event.clickAgregar);
            base.Control.tablaUnidadEjecutora().on('click', '.fa-trash-alt', function () {
                base.Event.clickEditarEstado($(this));
            });


        };
        base.Parametros = {
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
            tablaUnidadEjecutora: function () {
                return $('#tablaUnidadEjecutora');
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
            txtGradoNombre: function () {
                return $('#txtGradoNombre');
            },
            txtDescri: function () {
                return $('#txtDescri');
            },
            txtCodigo: function () {
                return $('#txtCodigo');
            },
            txtNumSerie: function () {
                return $('#txtNumSerie');
            }

        };
        base.Event = {
            clickEditarEstado: function (id) {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, Web.SIGPI.MensajeSistema.MensajeConfirmacionCambiarEstado, function (result) {
                    if (result) {
                        base.Ajax.setEstadoUnidadEjecutoraInv($(id).data('id'));
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
                                descunidad: base.Control.txtDescri().val(),
                                responsable: base.Control.txtGradoNombre().val(),
                                codunieje: base.Control.txtCodigo().val()
                            };
                            base.Ajax.ajaxGuardar(obj);
                        }
                    });
                }
            },
        };
        base.Ajax = {
            setEstadoUnidadEjecutoraInv: function (id) {
                $.ajax({
                    "url": 'actualizarEstadoUnidadEjecutoraInver',
                    "type": 'GET',
                    "data": {"id": id},
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Function.cargarBandeja();
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
            ajaxGuardar: function (obj) {
                $.ajax({
                    "url": 'registrarUnidadEjecutoraInver',
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
            }
        };
        base.Function = {
            limpiarCamposDatosUsuarios: function () {
                base.Control.txtNumSerie().val('');
                base.Control.txtNsa().val('');
                base.Control.txtGradoNombre().val('');
                base.Control.txtDescri().val('');
                base.Control.txtCodigo().val('');
            },
            validarCamposs: function () {
                var cadena = '';
                if (base.Control.txtNsa().val() == base.Parametros.ingrese.value) {
                    cadena += '<br>Numero de Serie invalido';
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
                    base.Control.txtGradoNombre().val("");
                    base.Control.txtDescri().val("");
                } else {
                    base.Control.txtNsa().val(data.nsa);
                    base.Control.txtGradoNombre().val(data.gradonombre);
                    base.Control.txtDescri().val(data.descri);
                    base.Control.txtCodigo().val(data.codigo);
                }
            },
            cargarBandeja: function () {
                var obj = {
                    pageInfo: null
                };
                base.Control.tablaUnidadEjecutora().DataTable({
                    "bFilter": false,
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
                            "url": 'ListUnidadEjecutoraInver',
                            "type": 'POST',
                            contentType: "application/json",
                            "dataType": 'json',
                            "data": JSON.stringify(obj),
                            success: function (res) {
                                console.log(res);
                                var result = res.data;
                                callback({
                                    'data': result

                                });
                            }
                        });
                    },
                    "columns": [
                        {"data": "nsa", "title": "NSA"},
                        {"data": "responsable", "title": "responsable"},
                        {"data": "descunidad", "title": "Descripcion de la Unidad"},
                        {"data": "feccreacio", "title": "Fecha de creacion"},
                        {
                            "data": "identificador", "title": "Acción", "sType": "html", "mRender": function (data, type, full)
                            {
                                return  '<span class="fas fa-trash-alt" title="Eliminar Responsable" data-id="' + full.identificador + '"></span>'
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
