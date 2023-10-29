/// <summary>
/// Script de Controladora de la Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.seguimiento.Index.Controller');
    SIGPI.seguimiento.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';
            $('.collapse').toggleClass('in');//apertura todos loas paneles
            
            base.Event.loadFileUpload();
            base.Ajax.ajaxListarObservacion();
            base.Control.btnGuardarObservacion().on('click', base.Event.clickbtnGuardarObservacion);
            
            base.Control.tablaDocsAdjuntos().on('click', '.fa-trash-alt', function () {
                base.Event.clickEditarEstadoFileUpload($(this));
            });
            base.Control.SeccionDocumentosAdjuntos.btnAdjuntar().on('click', base.Event.clickAdjuntar);
            base.Control.SeccionDocumentosAdjuntos.txtfile().on('change', function () {
                base.Event.changeFileUpload();
            });
            $('.number').number(true, 2);
        };
        base.Control = {
            hdnIdProyectoPIP: function () {
                return $('#hdnIdProyectoPIP');
            },
            tblObservacion: function () {
                return $('#tblObservacion');
            },
            btnGuardarObservacion: function () {
                return $('#btnGuardarObservacion');
            },
            txtObservacion: function () {
                return $('#txtObservacion');
            },
            tablaDocsAdjuntos: function () {
                return $('#tblDocsAdjuntos');
            },
            SeccionDocumentosAdjuntos: {
                txtfile: function () {
                    return $('#txtfile');
                },
                txtNamefile: function () {
                    return $('#txtNamefile');
                },
                btnAdjuntar: function () {
                    return $('#btnAdjuntar');
                },
                hdnFileName: function () {
                    return $('#hdnFileName');
                },
                hdnFileURL: function () {
                    return $('#hdnFileURL');
                }
            }

        };
         base.Parametros = {
            codigoNuevoPIP: base.Control.hdnIdProyectoPIP().val()
        };
        base.Event = {
            loadFileUpload: function () {

                var item = {
                    idbrecindi: 0,
                    idproyepip: base.Parametros.codigoNuevoPIP,
                    idproioarr: 0
                };
                base.Ajax.ajaxListFileUpload(item);
            },
            clickEditarEstadoFileUpload: function (id) {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, Web.SIGPI.MensajeSistema.MensajeConfirmacionCambiarEstado, function (result) {
                    if (result) {
                        base.Ajax.ajaxDeleteFileUpload($(id).data('id'));
                    }
                });
            },
            clickAdjuntar: function () {
                if (base.Function.validarCamposFileUpload()) {
                    BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, Web.SIGPI.MensajeSistema.MensajeConfirmacionAdjuntar, function (result) {
                        if (result) {
                            var obj = {
                                urldoc: base.Control.SeccionDocumentosAdjuntos.hdnFileURL().val(),
                                descdoc: base.Control.SeccionDocumentosAdjuntos.txtNamefile().val(),
                                nomdoc: base.Control.SeccionDocumentosAdjuntos.hdnFileName().val(),
                                idproyepip: base.Parametros.codigoNuevoPIP
                            };
                            base.Ajax.ajaxSendFileUpload(obj);
                        }
                    });
                }
            },
            clickbtnGuardarObservacion: function () {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, Web.SIGPI.MensajeSistema.Confirmacion, function (result) {
                    if (result) {
                        var obj = {
                            descobserv: base.Control.txtObservacion().val(),
                            idproyepip: base.Parametros.codigoNuevoPIP
                        };
                        console.log(obj);
                        base.Ajax.ajaxGuardarObservacion(obj);

                    }
                });
            },
            changeFileUpload: function () {

                var data = new FormData();
                $.each(base.Control.SeccionDocumentosAdjuntos.txtfile()[0].files, function (i, file) {
                    data.append('file-' + i, file);
                });
                base.Ajax.ajaxChangeFileUpload(data);
            },
            
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
                        console.log(response);
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
                        if(data.success == true){
                            base.Function.limpiarCamposFileUpload();
                            base.Event.loadFileUpload();
                        }
                    }
                });
            },
            ajaxChangeFileUpload: function (data) {
                $.ajax({
                    url: Web.SIGPI.URL.changeFileUpload,
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function (response) {
                        console.log(response);
                        if(response.success == true){
                            response = response.data;
                            base.Control.SeccionDocumentosAdjuntos.hdnFileName().val(response.nomdoc);
                            base.Control.SeccionDocumentosAdjuntos.hdnFileURL().val(response.urldoc);
                        }else{
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
            ajaxGuardarObservacion: function (obj) {
                
                $.ajax({
                    "url": 'insertObservacionSeg',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(obj),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Function.limpiarCampoObservacion();
                        base.Ajax.ajaxListarObservacion();
                    }
                });
            },
            ajaxListarObservacion: function () {
                var obj = {
                    idproioarr: 0,
                    idproyepip: base.Parametros.codigoNuevoPIP
                };
                $.ajax({
                    "url": 'getAllObservacionSeg',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(obj),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Function.cargarTablaObservaciones(data);
                    }
                });
            }
        };
        base.Function = {
            limpiarCamposFileUpload: function () {
                base.Control.SeccionDocumentosAdjuntos.txtfile().val('');
                base.Control.SeccionDocumentosAdjuntos.hdnFileURL().val('');
                base.Control.SeccionDocumentosAdjuntos.txtNamefile().val('');
                base.Control.SeccionDocumentosAdjuntos.hdnFileName().val('');
            },
            limpiarCampoObservacion: function () {
                base.Control.txtObservacion().val('');
            },
            validarCamposFileUpload: function () {
                var cadena = '';
                if (base.Control.SeccionDocumentosAdjuntos.hdnFileURL().val() == '') {
                    cadena += '<br>Debe seleccionar un archivo.';
                }
                if (base.Control.SeccionDocumentosAdjuntos.txtNamefile().val() == '') {
                    cadena += '<br>Debe ingresar la descripción del archivo.';
                }

                if (cadena.length > 0) {
                    alerta('warning', cadena);
                    return false;
                }
                return true;
            },
            cargarTablaObservaciones: function (data) {

                base.Control.tblObservacion().DataTable({
                    paging: false,
                    searching: false,
                    "cache": false,
                    "lengthMenu": [5, 50],
                    destroy: true,
                    ordering: false,
                    "ajax": function (request, callback, settings) {
                        callback(data);
                    },
                    "columns": [
                        {"data": "idobservac", "title": "Codigo"},
                        {"data": "descobserv", "title": "Observación"},
                        {"data": "descprocactual", "title": "Proceso Observado"},
                        {"data": "feccreacio", "title": "Fecha Creación"}
                    ],
                    'fnDrawCallback': function () {  validarPermiso();
                        //$('thead tr th.sorting_asc').removeClass('sorting_asc');
                        $('table').removeClass('dataTable');
                    }
                });
            },
            cargarTablaAdjuntos: function (data) {

                base.Control.tablaDocsAdjuntos().DataTable({
                    paging: false,
                    searching: false,
                    "cache": false,
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
                                        + '<span class="d-none" data-toggle="tooltip" data-placement="top" title="Eliminar archivo" class="fas fa-trash-alt" data-id="' + full.iddocument + '"></span>'
                            }
                        }
                    ],
                    'fnDrawCallback': function () {  validarPermiso();
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


