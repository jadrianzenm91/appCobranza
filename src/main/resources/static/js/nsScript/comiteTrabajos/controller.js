/// <summary>
/// Script de Controladora de la Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.ComiteTrabajos.Index.Controller');
    SIGPI.ComiteTrabajos.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';
            base.Event.loadFileUpload();
            base.Function.cargarBandeja();
            base.Control.btnGuardar().on('click', base.Event.clickGuardar);
            base.Control.tablaComiteTrabajo().on('click', '.fa-edit', function () {
                base.Event.clickEditar($(this));
            });
            base.Control.btnEnviar().on('click', base.Event.clickbtnEnviar);
            base.Control.btnEnviarIOARR().on('click', base.Event.clickbtnEnviarIOARR);
            base.Control.tablaComiteTrabajo().on('click', '.fa-trash-alt', function () {
                base.Event.clickEditarEstado($(this));
            });
            base.Control.btnGuardarEditar().on('click', base.Event.clickGuardarEditar);
            base.Control.btnAprobar().on('click', base.Event.clickbtnAprobar);
            base.Control.btnGuardarFecha().on('click', base.Event.clickBtnGuardarFecha);
            base.Control.btnGuardarObservacion().on('click', base.Event.clickbtnGuardarObservacion);
            base.Control.txtdatepicker().datepicker({
                dateFormat: base.Parametros.dateFormat,
                changeMonth: true,
                changeYear: true
            });
            base.Control.btnAdjuntar().on('click', base.Event.clickAdjuntar);
            base.Control.txtfile().on('change', function () {
                base.Event.changeFileGuardar();
            });
            base.Control.tablaDocsAdjuntos().on('click', '.fa-trash-alt', function () {
                base.Event.clickEditarEstadoFileUpload($(this));
            });

        };

        base.Control = {
            btnAdjuntar: function () {
                return $('#btnAdjuntar');
            },
            btnEnviar: function () {
                return $('[name=btnEnviar]');
            },
            btnEnviarIOARR: function () {
                return $('[name=btnEnviarIOARR]');
            },
            btnGuardarFecha: function () {
                return $('[name=btnGuardarFecha]');
            },
            btnAprobar: function () {
                return $('[name=btnAprobar]');
            },
            tablaComiteTrabajo: function () {
                return $('#tblComiteTrabajo');
            },
            tablaDocsAdjuntos: function () {
                return $('#tblDocsAdjuntos');
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
            btnGuardar: function () {
                return $('#btnGuardar');
            },
            txtIntegrante: function () {
                return $('#txtIntegrante');
            },
            txtNrooficio: function () {
                return $('#txtNrooficio');
            },
            txtIntegranteeditar: function () {
                return $('#txtIntegranteeditar');
            },
            txtNrooficioeditar: function () {
                return $('#txtNrooficioeditar');
            },
            txtidproyepip: function () {
                return $('#txtidproyepip');
            },
            txtidproioarr: function () {
                return $('#txtidproioarr');
            },
            txtCodigoInterno: function () {
                return $('#txtCodigoInterno');
            },
            modalEditar: function () {
                return $('#mdlEditar');
            },
            btnGuardarEditar: function () {
                return $('#btnGuardarEditar');
            },
            btnGuardarObservacion: function () {
                return $('#btnGuardarObservacion');
            },
            txtObservacion: function () {
                return $('#txtObservacion');
            },
            hdnIdProyectoPIP: function () {
                return $('#hdnIdProyectoPIP');
            },
            hdnIdProyectoIOARR: function () {
                return $('#hdnIdProyectoIOARR');
            },
            txtFecplatra: function () {
                return $('#txtFecplatra');
            },
            txtdatepicker: function () {
                return $('input.datepicker');
            }
        };

        base.Parametros = {
            codigoNuevoPIP: base.Control.hdnIdProyectoPIP().val(),
            codigoNuevoIOARR: base.Control.hdnIdProyectoIOARR().val(),
            dateFormat: "dd/mm/yy",
            ingrese: {
                text: "",
                value: ""

            },
            Mensajes: {
                TituloMensajeConfirmacion: Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion,
                Confirmacion: Web.SIGPI.MensajeSistema.Confirmacion
            },
            TituloModal: {
            },
            codigoComiteTrabajo: 0,
            codigo: 0,
            codigoNuevoPIP: base.Control.hdnIdProyectoPIP().val()
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
                                procactual: Web.SIGPI.Parametro.ComiteTrabajo,
                                idproyepip: base.Parametros.codigoNuevoPIP,
                                idproioarr: base.Parametros.codigoNuevoIOARR
                            };
                            base.Ajax.ajaxSendFileUpload(obj);
                        }
                    }
                    );
                }
            },
            clickbtnEnviar: function () {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, 'Está seguro de ENVIAR el Proyecto de Comite a plan de trabajo?', function (result) {
                    if (result) {
                        var item = base.Function.getDatosFechaPlan();
                        base.Ajax.ajaxEnviarComite(item);
                    }
                });
            },
            clickbtnEnviarIOARR: function () {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, 'Está seguro de ENVIAR el Proyecto Comite de Trabajo?', function (result) {
                    if (result) {
                        var item = {
                            idProIOARR: base.Parametros.codigoNuevoIOARR
                        };
                        base.Ajax.ajaxEnviarComiteIOARR(item);
                    }
                });
            },
            clickbtnAprobar: function () {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, 'Está seguro de APROBAR el Proyecto de Comite?', function (result) {
                    if (result) {
                        var item = {
                            idproyepip: base.Parametros.codigoNuevoPIP
                        };
                        base.Ajax.ajaxAprobarComite(item);
                    }
                });
            },
            clickBtnGuardarFecha: function () {
                if (base.Function.validarFecha()) {
                    BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, Web.SIGPI.MensajeSistema.Confirmacion, function (result) {
                        if (result) {
                            var item = base.Function.getDatosFechaPlan();
                            base.Ajax.ajaxGuardarFecha(item);
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
            clickGuardar: function () {
                BootstrapDialog.confirm(base.Parametros.Mensajes.TituloMensajeConfirmacion, base.Parametros.Mensajes.Confirmacion, function (result) {
                    if (result) {
                        var obj = {
                            idintegrante: base.Parametros.codigoComiteTrabajo,
                            integrante: base.Control.txtIntegrante().val(),
                            nrooficio: base.Control.txtNrooficio().val(),
                            idproyepip: base.Parametros.codigoNuevoPIP,
                            idproioarr: base.Parametros.codigoNuevoIOARR
                        };
                        console.log(obj);
                        base.Ajax.ajaxGuardar(obj);
                    }
                });
            },
            clickEditar: function (objt) {
                base.Ajax.getComiteTrabajo($(objt).data('id'));
                base.Control.modalEditar();
            },
            clickGuardarEditar: function () {
                BootstrapDialog.confirm(base.Parametros.Mensajes.TituloMensajeConfirmacion, base.Parametros.Mensajes.Confirmacion, function (result) {
                    if (result) {
                        var objt = {
                            idintegrante: base.Parametros.codigoComiteTrabajo,
                            integrante: base.Control.txtIntegranteeditar().val(),
                            nrooficio: base.Control.txtNrooficioeditar().val()

                        };
                        console.log(objt);
                        base.Ajax.ajaxGuardarEditar(objt);
                    }
                });
            },
            clickEditarEstado: function (id) {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, Web.SIGPI.MensajeSistema.MensajeConfirmacionCambiarEstado, function (result) {
                    if (result) {
                        base.Ajax.setEstadoComiteTrabajo($(id).data('id'));
                    }
                });
            },
            loadFileUpload: function () {

                var item = {
                    idbrecindi: 0,
                    procactual: Web.SIGPI.Parametro.ComiteTrabajo,
                    idproioarr: base.Parametros.codigoNuevoIOARR,
                    idproyepip: base.Parametros.codigoNuevoPIP
                };
                base.Ajax.ajaxListFileUpload(item);
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
            ajaxEnviarComite: function (data) {
                $.ajax({
                    "url": 'enviarComite',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(data),
                    success: function (response) {
                        console.log(response);
                        alerta(response.type, response.message);
                        window.location = './seguimientoPIP?id=' + response.data.idProyepip;
                    }
                });
            },
            ajaxEnviarComiteIOARR: function (data) {
                $.ajax({
                    "url": 'enviarComiteIOARR',
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
            ajaxGuardarFecha: function (data) {
                console.log(data);
                $.ajax({
                    "url": 'setComite',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(data),
                    success: function (response) {
                        console.log(response);
                        alerta(response.type, response.message);
                        //window.location = './seguimientoPIP?id=' + response.data.idProyepip;
                    }
                });
            },
            ajaxAprobarComite: function (data) {
                $.ajax({
                    "url": 'aprobarComite',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(data),
                    success: function (response) {
                        console.log(response);
                        alerta(response.type, response.message);
                        window.location = './seguimientoPIP?id=' + response.data.idproyepip;
                    }
                });
            },
            ajaxGuardarObservacion: function (obj) {

                $.ajax({
                    "url": 'insertObservacionComite',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(obj),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);

                        base.Function.limpiarCampoObservacion();
                        window.location = './seguimientoPIP?id=' + data.data.idproyepip;
                        ;
                    }
                });
            },
            ajaxGuardar: function (obj) {
                $.ajax({
                    "url": 'registrarComiteTrabajo',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(obj),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Function.cargarBandeja();
                        base.Function.LimpiarControles();
                    }
                });
            },
            getComiteTrabajo: function (id) {
                $.ajax({
                    "url": 'getComiteTrabajo',
                    "type": 'GET',
                    "data": {"id": id},
                    success: function (res) {
                        console.log(res);
                        base.Function.cargarDatosComiteTrabajo(res.data);
                    }
                });
            },
            ajaxGuardarEditar: function (objt) {
                $.ajax({
                    "url": 'actualizarComiteTrabajo',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(objt),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Control.modalEditar().modal('hide');
                        base.Function.cargarBandeja();
                    }
                });
            },
            setEstadoComiteTrabajo: function (id) {
                $.ajax({
                    "url": 'actualizarEstadoComite',
                    "type": 'GET',
                    "data": {"id": id},
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Function.cargarBandeja();
                    }
                });
            }
        };

        base.Function = {
            limpiarCamposFileUpload: function () {
                base.Control.txtfile().val('');
                base.Control.hdnFileURL().val('');
                base.Control.txtNamefile().val('');
                base.Control.hdnFileName().val('');
            },
            validarCamposFileUpload: function () {
                var cadena = '';
                if (base.Control.hdnFileURL().val() == '') {
                    cadena += '<br>Debe seleccionar un archivo.';
                }
                if (base.Control.txtNamefile().val() == '') {
                    cadena += '<br>Debe ingresar la descripción del archivo.';
                }

                if (cadena.length > 0) {
                    alerta('warning', cadena);
                    return false;
                }
                return true;
            },
            validarFecha: function () {
                var cadena = '';
                if (base.Control.txtFecplatra().val() == base.Parametros.ingrese.value) {
                    cadena += '<br>Debe Ingresar Fecha de Entrega del Plan de Trabajo';
                }
                if (cadena.length > 0) {
                    alerta('warning', cadena);
                    return false;
                }
                return true;
            },
            getDatosFechaPlan: function () {
                var item = {
                    idProyepip: base.Parametros.codigoNuevoPIP
                    , fecplatra: base.Control.txtFecplatra().val()
                };
                return item;
            },
            LimpiarControles: function () {
                base.Control.txtIntegrante().val('');
                base.Control.txtNrooficio().val('');
            },
            limpiarCampoObservacion: function () {
                base.Control.txtObservacion().val('');
            },
            cargarDatosComiteTrabajo: function (data) {
                base.Parametros.codigoComiteTrabajo = data.idintegrante;
                base.Parametros.codigo = data.idproyepip;
                base.Control.txtCodigoInterno().val(base.Parametros.codigoComiteTrabajo);
                base.Control.txtIntegranteeditar().val(data.integrante);
                base.Control.txtNrooficioeditar().val(data.nrooficio);
            },
            cargarBandeja: function () {
                var obj = {
                    idproyepip: base.Parametros.codigoNuevoPIP,
                    idproioarr: base.Parametros.codigoNuevoIOARR,
                    pageInfo: null

                };
                base.Control.tablaComiteTrabajo().DataTable({
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
                            "url": 'ListComiteTrabajo',
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
                        {"data": "row_number", "title": "N°"},
                        {"data": "integrante", "title": "Integrante"},
                        {"data": "nrooficio", "title": "Número de Documento"},
                        {
                            "data": "idintegrante", "title": "Acción", "sType": "html", "mRender": function (data, type, full)
                            {
                                return '<span class="fas fa-edit" data-id="' + full.idintegrante + '" data-toggle="modal" data-target="#mdlEditar"></span>' +
                                        '<span class="fas fa-trash-alt" data-id="' + full.idintegrante + '"></span>';
                            }
                        }
                    ],
                    'fnDrawCallback': function () {
                        validarPermiso();
                        $('thead tr th.sorting_asc').removeClass('sorting_asc');
                        $('table').removeClass('dataTable');
                        $('table .fas').parent().addClass('accion');
                    }
                });
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


