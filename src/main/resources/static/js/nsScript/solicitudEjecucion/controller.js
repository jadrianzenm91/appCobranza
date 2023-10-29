/// <summary>
/// Script de Controladora de la Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.SolicitudEjecucion.Index.Controller');
    SIGPI.SolicitudEjecucion.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';
            base.Event.loadFileUpload();
            base.Control.btnGuardarAdjunto().on('click', base.Event.clickGuardarADJ);
            base.Control.btnGuardar().on('click', base.Event.clickBtnGuardar);
            base.Control.txtfile().on('change', function () {
                base.Event.changeFileGuardar();
            });
            base.Control.tablaDocsAdjuntos().on('click', '.fa-trash-alt', function () {
                base.Event.clickEditarEstadoFileUpload($(this));
            });
            base.Control.btnEnviar().on('click', base.Event.clickbtnEnviar);
            base.Control.btnAprobar().on('click', base.Event.clickbtnAprobar);
            base.Control.btnAdjuntos().on('click', base.Event.clickAdjuntos);
            base.Control.btnGuardarObservacion().on('click', base.Event.clickbtnGuardarObservacion);
        };



        base.Control = {
            cboUIT: function () {
                return $('[name=cboUIT]');
            },
            btnGuardarAdjunto: function () {
                return $('#btnAdjuntar');
            },
            txtnomforeva: function () {
                return $('#txtnomforeva');
            },
            txtcodforeva: function () {
                return $('#txtcodforeva');
            },
            hdnIdProyectoIOARR: function () {
                return $('#hdnIdProyectoIOARR');
            },
            btnGuardar: function () {
                return $('#btnGuardar');
            },
            txtidproioarr: function () {
                return $('#txtidproioarr');
            },
            txtdescdoc: function () {
                return $('#txtNamefile');
            },
            txtCodigoInterno: function () {
                return $('#txtCodigoInterno');
            },
            txtNomdoc: function () {
                return $('#txtNomdoc');
            },
            txtfile: function () {
                return $('#txtfile');
            },
            txtNamefile: function () {
                return $('#txtNamefile');
            },
            hdnFileName: function () {
                return $('#hdnFileName');
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
            btnAprobar: function () {
                return $('[name=btnAprobar]');
            },
            txtObservacion: function () {
                return $('#txtObservacion');
            },
            btnGuardarObservacion: function () {
                return $('#btnGuardarObservacion');
            }
        };

        base.Parametros = {
            Mensajes: {
                TituloMensajeConfirmacion: Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion,
                Confirmacion: Web.SIGPI.MensajeSistema.Confirmacion
            },
            codigoNuevoIOARR: base.Control.hdnIdProyectoIOARR().val(),
            codigoSolEjecucion: 0,
            codigo: 0

        };

        base.Event = {
            loadFileUpload: function () {
                var item = {
                    idbrecindi: 0,
                    procactual: Web.SIGPI.Parametro.AprobacionIOARR,
                    idproioarr: base.Parametros.codigoNuevoIOARR,
                    idproyepip: 0
                };
                base.Ajax.ajaxListFileUpload(item);
            },
            clickbtnAprobar: function () {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, 'Está seguro de APROBAR la Solicitud de Ejecución?', function (result) {
                    if (result) {
                        var item = {
                            idproioarr: base.Parametros.codigoNuevoIOARR
                        };
                        base.Ajax.ajaxAprobarIOARRUIT(item);
                    }
                });
            },
            clickbtnGuardarObservacion: function () {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, Web.SIGPI.MensajeSistema.Confirmacion, function (result) {
                    if (result) {
                        var obj = {
                            descobserv: base.Control.txtObservacion().val(),
                            idproioarr: base.Parametros.codigoNuevoIOARR
                        };
                        console.log(obj);
                        base.Ajax.ajaxGuardarObservacion(obj);

                    }
                });
            },
            clickEditarEstadoFileUpload: function (id) {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, Web.SIGPI.MensajeSistema.MensajeConfirmacionCambiarEstado, function (result) {
                    if (result) {
                        base.Ajax.ajaxDeleteFileUpload($(id).data('id'));
                    }
                });
            },
            clickGuardarADJ: function () {
                if (base.Function.validarCamposFileUpload()) {
                    BootstrapDialog.confirm(base.Parametros.Mensajes.TituloMensajeConfirmacion, base.Parametros.Mensajes.Confirmacion, function (result) {
                        if (result) {
                            var obj = {
                                urldoc: base.Control.hdnFileURL().val(),
                                descdoc: base.Control.txtNamefile().val(),
                                nomdoc: base.Control.hdnFileName().val(),
                                procactual: Web.SIGPI.Parametro.AprobacionIOARR,
                                idproyepip: 0,
                                idproioarr: base.Parametros.codigoNuevoIOARR
                            };
                            base.Ajax.ajaxSendFileUpload(obj);
                        }
                    }
                    );
                }
            },
            clickBtnGuardar: function () {
                BootstrapDialog.confirm(base.Parametros.Mensajes.TituloMensajeConfirmacion, base.Parametros.Mensajes.Confirmacion, function (result) {
                    if (result) {
                        var obj = {
                            idproioarr: base.Control.txtidproioarr().val(),
                            uitmayor75: base.Control.cboUIT().val()
                        };
                        base.Ajax.setNuevoUIT(obj);
                    }
                });
            },
            clickbtnEnviar: function () {
                if (base.Function.validarCampos()) {
                    BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, 'Está seguro de enviar a REVISION al EMGRA?', function (result) {
                        if (result) {
                            var item = base.Function.getDatosUIT();
                            base.Ajax.ajaxEnviarIOARR(item);

                        }
                    });
                }
            },
            changeFileGuardar: function () {

                var data = new FormData();
                $.each(base.Control.txtfile()[0].files, function (i, file) {
                    data.append('file-' + i, file);
                });
                base.Ajax.ajaxChangeFileGuardar(data);
            },
            clickAdjuntos: function () {
                base.Control.modalAdjuntos().modal('show');
                base.Function.cargarTablaAdjuntos();
            }
        };

        base.Ajax = {
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
            ajaxlistFileAdjuntoIOARR: function (item) {
                $.ajax({
                    url: Web.SIGPI.URL.listFileAdjuntoIOARR,
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(item),
                    success: function (response) {
                        console.log(response);
                        var data = {
                            data: response.data
                        };
                        base.Function.cargarTablaAdjuntos(data);
                    }
                });
            },
            ajaxAprobarIOARRUIT: function (data)
            {
                $.ajax({
                    "url": 'aprobarIOARRUIT',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(data),
                    success: function (response) {
                        console.log(response);
                        alerta(response.type, response.message);
                        window.location = './seguimientoIOARR?id=' + response.data.idproioarr;
                    }
                });
            },
            ajaxGuardarObservacion: function (obj) {
                $.ajax({
                    "url": 'insertObservacionUIT',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(obj),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Function.limpiarCampoObservacion();
                        window.location = './seguimientoIOARR?id=' + data.data.idproioarr;

                    }
                });
            },
            ajaxEnviarIOARR: function (data) {
                $.ajax({
                    "url": 'enviarSolicitudIOARRUIT',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(data),
                    success: function (response) {
                        console.log(response);
                        alerta(response.type, response.message);
                        window.location = './seguimientoIOARR?id=' + response.data.idProIOARR;
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
            changeFileGuardar: function () {

                var data = new FormData();
                $.each(base.Control.txtfile()[0].files, function (i, file) {
                    data.append('file-' + i, file);
                });
                base.Ajax.ajaxChangeFileUpload(data);
            }
        };

        base.Function = {
            getDatosUIT: function () {
                var item = {
                    idProIOARR: base.Parametros.codigoNuevoIOARR,
                    uitmayor75: base.Control.cboUIT().val(),
                    nomforeva: base.Control.txtnomforeva().val(),
                    codforeva: base.Control.txtcodforeva().val()
                };

                return item;
            },
            validarCamposFileUpload: function () {
                var cadena = '';
                if (base.Control.hdnFileURL().val() == '') {
                    cadena += '<br>Debe seleccionar un archivo.';
                }
                if (base.Control.txtdescdoc().val() == '') {
                    cadena += '<br>Debe ingresar la descripción del archivo.';
                }

                if (cadena.length > 0) {
                    alerta('warning', cadena);
                    return false;
                }
                return true;
            },
            validarCampos: function () {
                var cadena = '';
                if (base.Control.cboUIT().val() == 0) {
                    cadena += '<br>Debe Seleccionar una Opción';
                }
                if (base.Control.txtnomforeva().val() == '') {
                    cadena += '<br>Debe Ingresar Nombre';
                }
                if (base.Control.txtcodforeva().val() == '') {
                    cadena += '<br>Debe ingresar Codigo';
                }
                if (cadena.length > 0) {
                    alerta('warning', cadena);
                    return false;
                }
                return true;


            },
            limpiarCampoObservacion: function () {
                base.Control.txtObservacion().val('');
            },
            limpiarCamposFileUpload: function () {
                base.Control.txtfile().val('');
                base.Control.hdnFileURL().val('');
                base.Control.txtNamefile().val('');
                base.Control.hdnFileName().val('');
            },
            LimpiarControles: function () {
                base.Control.txtfile().val('');
                base.Control.hdnFileURL().val('');
                base.Control.hdnFileName().val('');
                base.Control.txtdescdoc().val('');
            },
            cargarTablaAdjuntos: function (data) {

                base.Control.tablaDocsAdjuntos().DataTable({
                    paging: false,
                    "cache": false,
                    searching: false,
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
                        $('table .fas').closest('td').addClass('accion');
                        $('[data-toggle="tooltip"]').tooltip();
                    }
                });
            }



        };
    };
} catch (ex) {
    alert(ex.message);
}



