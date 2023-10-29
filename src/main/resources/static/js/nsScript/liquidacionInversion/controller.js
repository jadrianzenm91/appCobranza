/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
try {
    ns('SIGPI.liquidacionInversion.Index.Controller');
    SIGPI.liquidacionInversion.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';
            base.Event.loadFileUpload();
            base.Control.btnAdjuntar().on('click', base.Event.clickAdjuntar);
            base.Control.btnEnviar().on('click', base.Event.clickbtnEnviar);
            base.Control.btnEnviarPIP().on('click', base.Event.clickbtnEnviarPIP);
            base.Control.btnRegresar().on('click', base.Event.clickbtnRegresar);
            base.Control.txtfile().on('change', function () {
                base.Event.changeFileGuardar();
            });
            base.Control.btnAdjuntos().on('click', base.Event.clickAdjuntos);

            base.Control.tablaDocsAdjuntos().on('click', '.fa-trash-alt', function () {
                base.Event.clickEditarEstadoFileUpload($(this));
            });

        };


        base.Control = {
            hdnIdProyectoPIP: function () {
                return $('#hdnIdProyectoPIP');
            },
            hdnIdProyectoIOARR: function () {
                return $('#hdnIdProyectoIOARR');
            },
            btnAdjuntar: function () {
                return $('#btnAdjuntar');
            },
            btnRegresar: function () {
                return $('[name=btnRegresar]');
            },
            txtIntegrante: function () {
                return $('#txtIntegrante');
            },
            txtNrooficio: function () {
                return $('#txtNrooficio');
            },
            txtidproyepip: function () {
                return $('#txtidproyepip');
            },
            txtCodigoInterno: function () {
                return $('#txtCodigoInterno');
            },
            txtNomdoc: function () {
                return $('#txtNomdoc');
            },
            cboCierre: function () {
                return $('#cboCierre');
            },
            txtfile: function () {
                return $('#txtfile');
            },
            hdnFileName: function () {
                return $('#hdnFileName');
            },
            txtNamefile: function () {
                return $('#txtNamefile');
            },
            hdnFileURL: function () {
                return $('#hdnFileURL');
            },
            modalAdjuntos: function () {
                return $('#mdlAdjuntos');
            },
            tablaDocsAdjuntos: function () {
                return $('#tblDocsAdjuntos');
            },
            btnAdjuntos: function () {
                return $('#btnAdjuntos');
            },
            btnEnviar: function () {
                return $('[name=btnEnviar]');
            },
            btnEnviarPIP: function () {
                return $('[name=btnEnviarPIP]');
            },
            btnAprobar: function () {
                return $('[name=btnAprobar]');
            },
            btnGuardarObservacion: function () {
                return $('#btnGuardarObservacion');
            }
        };

        base.Parametros = {
            Seleccione: {
                text: "-- Seleccione --",
                value: "-1"
            },
            Mensajes: {
                TituloMensajeConfirmacion: Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion,
                Confirmacion: Web.SIGPI.MensajeSistema.Confirmacion
            },
            codigoInforConsistenciaPIP: 0,
            codigo: 0,
            codigoNuevoPIP: base.Control.hdnIdProyectoPIP().val(),
            codigoNuevoIOARR: base.Control.hdnIdProyectoIOARR().val()
        };


        base.Event = {
            clickAdjuntar: function () {
                if (base.Function.validarCamposFileUpload()) {
                    BootstrapDialog.confirm(base.Parametros.Mensajes.TituloMensajeConfirmacion, base.Parametros.Mensajes.Confirmacion, function (result) {
                        if (result) {
                            var obj = {
                                urldoc: base.Control.hdnFileURL().val(),
                                descdoc: base.Control.txtNamefile().val(),
                                nomdoc: base.Control.hdnFileName().val(),
                                procactual: Web.SIGPI.Parametro.LiquidacionInversion,
                                idproyepip: base.Parametros.codigoNuevoPIP,
                                idproioarr: base.Parametros.codigoNuevoIOARR
                            };
                            base.Ajax.ajaxSendFileUpload(obj);
                        }
                    }
                    );
                }
            },
            changeFileGuardar: function () {

                var data = new FormData();
                $.each(base.Control.txtfile()[0].files, function (i, file) {
                    data.append('file-' + i, file);
                });
                base.Ajax.ajaxChangeFileGuardar(data);
            },
            clickEditarEstadoFileUpload: function (id) {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, Web.SIGPI.MensajeSistema.MensajeConfirmacionCambiarEstado, function (result) {
                    if (result) {
                        base.Ajax.ajaxDeleteFileUpload($(id).data('id'));
                    }
                });
            },
            clickbtnEnviar: function () {
                if (base.Function.validarCampoCierre()) {
                    BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, 'Está seguro de Guardar?', function (result) {
                        if (result) {
                            var item = {
                                idproyepip: base.Parametros.codigoNuevoPIP,
                                idproioarr: base.Parametros.codigoNuevoIOARR
                            };
                            console.log(item);
                            base.Ajax.ajaxAprobarPIP(item);

                            var item2 = base.Function.getDatosCierreInv();
                            base.Ajax.ajaxGuardar(item2);


                        }
                    });
                }
            },
            clickbtnEnviarPIP: function () {
                if (base.Function.validarCampoCierre()) {
                    BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, 'Está seguro de Guardar?', function (result) {
                        if (result) {
                            var item = {
                                idproyepip: base.Parametros.codigoNuevoPIP,
                                idproioarr: base.Parametros.codigoNuevoIOARR
                            };
                            console.log(item);
                            base.Ajax.ajaxAprobarPIP(item);

                            var item2 = base.Function.getDatosCierreInv();
                            base.Ajax.ajaxGuardarPIP(item2);


                        }
                    });
                }
            },
            clickbtnRegresar: function () {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, 'Está seguro de Regresar a Ejecución Fisica y Financiera?', function (result) {
                    if (result) {
                        var item = {
                            idproyepip: base.Parametros.codigoNuevoPIP,
                            idproioarr: base.Parametros.codigoNuevoIOARR
                        };
                        console.log(item);
                        base.Ajax.ajaxRegresar(item);
                    }
                });
            },
            clickbtnGuardarPIP: function () {
                var item = base.Function.getDatosCierreInv();
                base.Ajax.ajaxGuardarPIP(item);
            },
            loadFileUpload: function () {

                var item = {
                    idbrecindi: 0,
                    procactual: Web.SIGPI.Parametro.LiquidacionInversion,
                    idproioarr: base.Parametros.codigoNuevoIOARR,
                    idproyepip: base.Parametros.codigoNuevoPIP
                };
                base.Ajax.ajaxListFileUpload(item);
            }
        };

        base.Ajax = {
            ajaxGuardar: function (item2) {
                $.ajax({
                    "url": 'registrarCierreInversion',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(item2),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        //window.location = './seguimientoIOARR?id=' + response.data.idproioarr;
                        //base.Function.cargarBandeja();
                        // base.Function.LimpiarControles();
                    }
                });
            },
            ajaxGuardarPIP: function (item2) {
                $.ajax({
                    "url": 'registrarCierreInversionPIP',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(item2),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        //window.location = './seguimientoIOARR?id=' + response.data.idproioarr;
                        //base.Function.cargarBandeja();
                        // base.Function.LimpiarControles();
                    }
                });
            },
            ajaxListFileUpload: function (item) {
                $.ajax({
                    url: Web.SIGPI.URL.listFileUpload,
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(item),
                    success: function (response) {
                        var data = {
                            data: response.data
                        };
                        base.Function.cargarTablaAdjuntos(data);
                    }
                });
            },
            ajaxSendFileUpload: function (obj) {
                $.ajax({
                    url: Web.SIGPI.URL.saveFileUpload,
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(obj),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        if (data.success == true) {
                            base.Function.limpiarCamposFileUpload();
                            base.Event.loadFileUpload();
                        }

                    }
                });
            },
            ajaxChangeFileGuardar: function (data) {
                $.ajax({
                    url: Web.SIGPI.URL.changeFileUpload,
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function (response) {
                        console.log(response);
                        if (response.success == true) {
                            response = response.data;
                            base.Control.hdnFileName().val(response.nomdoc);
                            base.Control.hdnFileURL().val(response.urldoc);
                        } else {
                            alerta(response.type, response.message);
                        }
                    }
                });
            },
            ajaxDeleteFileUpload: function (id) {
                $.ajax({
                    "url": Web.SIGPI.URL.deleteFileUpload,
                    "type": 'GET',
                    "data": {"id": id},
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Event.loadFileUpload();
                    }
                });
            },
            ajaxAprobarPIP: function (data) {
                $.ajax({
                    "url": 'aprobarLiquidacionInversion',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(data),
                    success: function (response) {
                        console.log(response);
                        alerta(response.type, response.message);
                        window.location = response.data.idproioarr != 0 ? './seguimientoIOARR?id=' + response.data.idproioarr :
                                './seguimientoPIP?id=' + response.data.idproyepip;
                    }
                });
            },
            ajaxRegresar: function (data) {
                $.ajax({
                    "url": 'regresar',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(data),
                    success: function (response) {
                        console.log(response);
                        alerta(response.type, response.message);
                        window.location = response.data.idproioarr != 0 ? './seguimientoIOARR?id=' + response.data.idproioarr :
                                './seguimientoPIP?id=' + response.data.idproyepip;
                    }
                });
            }

        };



        base.Function = {
            getDatosCierreInv: function () {
                var item = {
                    idProIOARR: base.Parametros.codigoNuevoIOARR
                    , idProyepip: base.Parametros.codigoNuevoPIP
                    , cierreinv: base.Control.cboCierre().val()
                };

                return item;
            },
            limpiarCamposFileUpload: function () {
                base.Control.txtfile().val('');
                base.Control.hdnFileURL().val('');
                base.Control.txtNamefile().val('');
                base.Control.hdnFileName().val('');
            },
            limpiarCampoObservacion: function () {
                base.Control.txtObservacion().val('');
            },
            validarCamposFileUpload: function () {
                var cadena = '';
                if (base.Control.hdnFileURL().val() == '') {
                    cadena += '<br>Debe seleccionar un archivo.';
                }
                if (base.Control.txtNamefile().val() == '') {
                    cadena += '<br>Debe ingresar la descripción del archivo.';
                }
                if (base.Control.cboCierre().val() == '') {
                    cadena += '<br>Seleccione Cierre de Inversion.';
                }

                if (cadena.length > 0) {
                    alerta('warning', cadena);
                    return false;
                }
                return true;
            },
            validarCampoCierre: function () {
                var cadena = '';

                if (base.Control.cboCierre().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe Seleccionar Cierre de Inversion.';
                }
                if (cadena.length > 0) {
                    alerta('warning', cadena);
                    return false;
                }
                return true;
            },
            cargarTablaAdjuntos: function (data) {

                base.Control.tablaDocsAdjuntos().DataTable({
                    paging: false,
                    "cache": false,
                    "bFilter": false,
                    "lengthMenu": [5, 50],
                    destroy: true,
                    ordering: false,
                    "ajax": function (request, callback, settings) {
                        callback(data);
                    },
                    "columns": [
                        {"data": "iddocument", "title": "Codigo Documento"},
                        {"data": "descdoc", "title": "Descripción Documento"},
                        {"data": "feccreacio", "title": "Fecha Creación"},
                        {
                            "data": "iddocument", "title": "Acción", "sType": "html", "mRender": function (data, type, full)
                            {
                                return '<a data-toggle="tooltip" data-placement="top" title="Descargar Archivo" href="' + Web.SIGPI.URL.DownloadFile + full.nomdoc + '" target="_blank"><span class="fas fa-download"></span></a>'
                                        + '<span data-toggle="tooltip" data-placement="top" title="Eliminar archivo" class="fas fa-trash-alt" data-id="' + full.iddocument + '"></span></div>'
                            }
                        }
                    ],
                    'fnDrawCallback': function () {
                        validarPermiso();
                        $('thead tr th.sorting_asc').removeClass('sorting_asc');
                        $('table').removeClass('dataTable');
                        $('table .fas').parent().addClass('accion');
                        $('[data-toggle="tooltip"]').tooltip();
                    }
                });
            }
        };
    };
} catch (ex) {
    alert(ex.message);
}



