

try {
    ns('SIGPI.BrechasIndicadores.Index.Controller');
    SIGPI.BrechasIndicadores.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';
            base.Function.cargarBandeja();
            base.Event.loadFuncion();
            base.Event.loadSector();
            base.Control.btnBuscar().on('click', base.Event.clickBuscar);
            base.Control.btnNuevo().on('click', base.Event.clickNuevo);
            base.Control.cboFuncion().on('change', base.Event.changeFuncion);
            base.Control.cboDivFuncion().on('change', base.Event.changeDivFuncion);
            base.Control.btnGuardar().on('click', base.Event.clickGuardar);
            base.Control.btnGuardarEditar().on('click', base.Event.clickGuardarEditar);
            base.Control.btnImprimir().on('click', base.Event.clickbtnImprimir);
            base.Control.btnAdjuntarModal().on('click', base.Event.clickAdjuntarModal);

            base.Control.tablaBrechasIndicadores().on('click', '.fa-edit', function () {
                base.Event.clickEditar($(this));
            });
            base.Control.tablaBrechasIndicadores().on('click', '.fa-copy', function () {
                base.Event.clickCopiar($(this));
            });
            base.Control.tablaBrechasIndicadores().on('click', '.fa-trash-alt', function () {
                base.Event.clickEditarEstado($(this));
            });
            base.Control.tablaDocsAdjuntos().on('click', '.fa-trash-alt', function () {
                base.Event.clickEditarEstadoFileUpload($(this));
            });
            base.Control.tablaBrechasIndicadores().on('click', '.fa-copy', function () {
                base.Event.clickDuplicar($(this));
            });
            base.Control.SeccionDocumentosAdjuntos.btnAdjuntar().on('click', base.Event.clickAdjuntar);
            base.Control.SeccionDocumentosAdjuntos.txtfile().on('change', function () {
                base.Event.changeFileUpload();
            });

        };
        base.Parametros = {
            Seleccione: {
                text: "-- Seleccione --",
                value: "-1"
            },
            TablaParametro: {
                Sector: Web.SIGPI.Parametro.Sector

            },
            Mensajes: {
                TituloMensajeConfirmacion: Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion,
                Confirmacion: Web.SIGPI.MensajeSistema.Confirmacion
            },
            TituloModal: {
                nuevo: "Nuevo Registro de Brechas e Indicadores",
                editar: "Editar Registro de Brechas e Indicadores",
                copiar: "Copiar Registro de Brechas e Indicadores"
            },
            codigoBrechaIndicador: 0
        };
        base.Control = {
            spanAnioTitle: function () {
                return $('#spanAnioTitle');
            },
            txtCodigoInterno: function () {
                return $('#txtCodigoInterno');
            },
            tablaBrechasIndicadores: function () {
                return $('#tblBrechasIndicadores');
            },
            tablaDocsAdjuntos: function () {
                return $('#tblDocsAdjuntos');
            },
            txtAnio: function () {
                return $('#cboAnio');
            },
            txtAnioNuevo: function () {
                return $('#cboAnioNuevo');
            },
            txtServicioAsociadoTopologia: function () {
                return $('#txtServicioAsociadoTopologia');
            },
            txtServicioAsociadoTopologiaNuevo: function () {
                return $('#txtServicioAsociadoTopologiaNuevo');
            },
            txtIndicador: function () {
                return $('#txtIndicador');
            },
            txtIndicadorNuevo: function () {
                return $('#txtIndicadorNuevo');
            },
            txtTipologia: function () {
                return $('#txtTipologia');
            },
            txtSector: function () {
                return $('#txtSector');
            },
            txtUnidadMed: function () {
                return $('#txtUnidadMed');
            },
            txtCapPro: function () {
                return $('#txtCapPro');
            },
            btnBuscar: function () {
                return $('#btnBuscar');
            },
            btnImprimir: function () {
                return $('#btnImprimir');
            },
            btnNuevo: function () {
                return $('#btnNuevo');
            },
            titleModal: function () {
                return $('.modal-title', '#mdlNuevo');
            },
            modalAdjuntos: function () {
                return $('#mdlAdjuntos');
            },
            modalNuevo: function () {
                return $('#mdlNuevo');
            },
            modalEditar: function () {
                return $('#mdlEditar');
            },
            cboFuncion: function () {
                return $('#cboFuncion');
            },
            cboDivFuncion: function () {
                return $('#cboDivFuncion');
            },
            cboGrupoFunc: function () {
                return $('#cboGrupoFunc');
            },
            btnGuardar: function () {
                return $('#btnGuardar');
            },
            btnGuardarEditar: function () {
                return $('#btnGuardarEditar');
            },
            btnAdjuntarModal: function () {
                return $('#btnAdjuntarModal');
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
                },
            }

        };
        base.Event = {
            clickbtnImprimir: function () {
                myWindow = window.open('./reportebrecha?anio=' +
                        base.Control.txtAnio().val() +
                        '&service=' + base.Control.txtServicioAsociadoTopologia().val() +
                        '&indicador=' + base.Control.txtIndicador().val(), "SISTEMA DE BRECHAS INDICADORAS FAP", "width=1024,height=550");
                myWindow.focus();


            },
            clickAdjuntarModal: function () {
                base.Control.modalAdjuntos().modal('show');
                base.Control.spanAnioTitle().text(base.Control.txtAnio().val());
                base.Event.loadFileUpload();
            },
            clickCopiar: function (obj) {
                base.Function.LimpiarControlesModal();
                base.Ajax.getBrechaIndicador($(obj).data('id'));
                base.Control.modalNuevo().modal('show');
                base.Control.btnGuardarEditar().css('display', 'none');
                base.Control.btnGuardar().css('display', 'block');
                base.Control.titleModal().text(base.Parametros.TituloModal.copiar);
            },
            clickEditar: function (obj) {
                base.Function.LimpiarControlesModal();
                base.Ajax.getBrechaIndicador($(obj).data('id'));
                base.Control.modalNuevo().modal('show');
                base.Control.btnGuardar().css('display', 'none');
                base.Control.btnGuardarEditar().css('display', 'block');
                base.Control.titleModal().text(base.Parametros.TituloModal.editar);
            },
            clickEditarEstado: function (id) {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, Web.SIGPI.MensajeSistema.MensajeConfirmacionCambiarEstado, function (result) {
                    if (result) {
                        base.Ajax.setEstadoBrechaIndicador($(id).data('id'));
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
            loadSector: function () {
                base.Ajax.cargarParametroValor(base.Control.txtSector(), base.Parametros.TablaParametro.Sector);
            },
            clickGuardar: function () {
                BootstrapDialog.confirm(base.Parametros.Mensajes.TituloMensajeConfirmacion, base.Parametros.Mensajes.Confirmacion, function (result) {
                    if (result) {
                        var obj = {
                            idbrecindi: base.Parametros.codigoBrechaIndicador,
                            anio: base.Control.txtAnioNuevo().val(),
                            idsector: base.Control.txtSector().val(),
                            idfuncion: base.Control.cboFuncion().val(),
                            iddivfunci: base.Control.cboDivFuncion().val(),
                            idgrupofun: base.Control.cboGrupoFunc().val(),
                            tipologia: base.Control.txtTipologia().val(),
                            servtipolo: base.Control.txtServicioAsociadoTopologiaNuevo().val(),
                            indicbrech: base.Control.txtIndicadorNuevo().val(),
                            unimed: base.Control.txtUnidadMed().val(),
                            capprod: base.Control.txtCapPro().val()
                        };
                        console.log(obj);
                        base.Ajax.ajaxGuardar(obj);
                    }
                });
            },
            clickGuardarEditar: function () {
                BootstrapDialog.confirm(base.Parametros.Mensajes.TituloMensajeConfirmacion, base.Parametros.Mensajes.Confirmacion, function (result) {
                    if (result) {
                        var obj = {
                            idbrecindi: base.Parametros.codigoBrechaIndicador,
                            anio: base.Control.txtAnioNuevo().val(),
                            idsector: base.Control.txtSector().val(),
                            idfuncion: base.Control.cboFuncion().val(),
                            iddivfunci: base.Control.cboDivFuncion().val(),
                            idgrupofun: base.Control.cboGrupoFunc().val(),
                            tipologia: base.Control.txtTipologia().val(),
                            servtipolo: base.Control.txtServicioAsociadoTopologiaNuevo().val(),
                            indicbrech: base.Control.txtIndicadorNuevo().val(),
                            unimed: base.Control.txtUnidadMed().val(),
                            capprod: base.Control.txtCapPro().val()
                        };
                        console.log(obj);
                        base.Ajax.ajaxGuardarEditar(obj);
                    }
                });
            },
            clickBuscar: function () {
                base.Function.cargarBandeja();
            },
            clickNuevo: function () {
                base.Parametros.codigoBrechaIndicador = 0;
                base.Function.LimpiarControlesModal();
                base.Control.modalNuevo().modal('show');
                base.Control.btnGuardar().css('display', 'none');
                base.Control.btnGuardarEditar().css('display', 'block');
                base.Control.titleModal().text(base.Parametros.TituloModal.nuevo);
            },
            loadFuncion: function () {
                var param = {
                    value: 0
                }
                base.Ajax.getDataControlDesplegable('cargarFuncion', base.Control.cboFuncion(), param);
            },
            changeFuncion: function () {
                var param = {
                    value: base.Control.cboFuncion().val()
                }
                base.Control.cboGrupoFunc().empty();
                base.Control.cboGrupoFunc().append(new Option(base.Parametros.Seleccione.text, base.Parametros.Seleccione.value));
                base.Control.cboGrupoFunc().val(base.Parametros.Seleccione.value);
                base.Ajax.getDataControlDesplegable('cargarDivisionFuncion', base.Control.cboDivFuncion(), param);
            },
            changeDivFuncion: function () {
                var param = {
                    value: base.Control.cboDivFuncion().val()
                }
                base.Ajax.getDataControlDesplegable('cargarGrupoFuncional', base.Control.cboGrupoFunc(), param);
            },
            clickAdjuntar: function () {
                if (base.Function.validarCamposFileUpload()) {
                    BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, Web.SIGPI.MensajeSistema.MensajeConfirmacionAdjuntar, function (result) {
                        if (result) {
                            var obj = {
                                urldoc: base.Control.SeccionDocumentosAdjuntos.hdnFileURL().val(),
                                descdoc: base.Control.SeccionDocumentosAdjuntos.txtNamefile().val(),
                                nomdoc: base.Control.SeccionDocumentosAdjuntos.hdnFileName().val(),
                                idbrecindi: base.Control.txtAnio().val()
                            };
                            base.Ajax.ajaxSendFileUpload(obj);
                        }
                    });
                }
            },
            changeFileUpload: function () {

                var data = new FormData();
                $.each(base.Control.SeccionDocumentosAdjuntos.txtfile()[0].files, function (i, file) {
                    data.append('file-' + i, file);
                });
                base.Ajax.ajaxChangeFileUpload(data);
            },
            loadFileUpload: function () {
                var item = {
                    idbrecindi: base.Control.txtAnio().val(),
                    idproioarr: 0,
                    idproyepip: 0
                };
                base.Ajax.ajaxListFileUpload(item);
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
                        console.log(data);
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

                        if (response.success == true) {
                            response = response.data;
                            base.Control.SeccionDocumentosAdjuntos.hdnFileName().val(response.nomdoc);
                            base.Control.SeccionDocumentosAdjuntos.hdnFileURL().val(response.urldoc);
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
                        base.Function.cargarBandeja();
                        base.Event.loadFileUpload();
                    }
                });
            },
            getBrechaIndicador: function (id) {
                $.ajax({
                    "url": 'getBrechaIndicador',
                    "type": 'GET',
                    "data": {"id": id},
                    success: function (res) {
                        console.log(res);
                        base.Function.cargarDatosBrechasIndicador(res.data);
                    }
                });
            },
            setEstadoBrechaIndicador: function (id) {
                $.ajax({
                    "url": 'actualizarEstado',
                    "type": 'GET',
                    "data": {"id": id},
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Function.cargarBandeja();
                    }
                });
            },
            cargarParametroValor: function (control, idparametro) {
                $.ajax({
                    "url": 'cargarParametroValor',
                    "type": 'POST',
                    async: false,
                    "data": {"idparametro": idparametro},
                    success: function (res) {
                        console.log(res);
                        base.Function.cargarControlParametro(control, res.data, 'text');
                    }
                });
            },
            ajaxGuardar: function (brecha) {
                var item = {
                    brechaIndicador: brecha
                }
                $.ajax({
                    "url": 'registrar',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(item),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Control.modalNuevo().modal('hide');
                        base.Function.cargarBandeja();
                    }
                });
            },
            ajaxGuardarEditar: function (obj) {
                $.ajax({
                    "url": 'actualizar',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(obj),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Control.modalNuevo().modal('hide');
                        base.Function.cargarBandeja();
                    }
                });
            },
            getDataControlDesplegable: function (url, controlDestino, data) {

                $.ajax({
                    "url": url,
                    "type": 'POST',
                    async: false,
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(data),
                    success: function (res) {
                        console.log(res);
                        base.Function.cargarControlLista(controlDestino, res.data);
                        return res.data;
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
            LimpiarControlesModal: function () {
                base.Control.txtCodigoInterno().val(base.Parametros.codigoBrechaIndicador);
                base.Event.loadSector();
                base.Control.txtTipologia().val('');
                base.Control.cboFuncion().val(base.Parametros.Seleccione.value);
                base.Control.cboDivFuncion().empty();
                base.Control.cboDivFuncion().append(new Option(base.Parametros.Seleccione.text, base.Parametros.Seleccione.value));
                base.Control.cboDivFuncion().val(base.Parametros.Seleccione.value);
                base.Control.cboGrupoFunc().empty();
                base.Control.cboGrupoFunc().append(new Option(base.Parametros.Seleccione.text, base.Parametros.Seleccione.value));
                base.Control.cboGrupoFunc().val(base.Parametros.Seleccione.value);
                base.Control.txtServicioAsociadoTopologiaNuevo().val('');
                base.Control.txtIndicadorNuevo().val('');
                base.Control.txtUnidadMed().val('');
                base.Control.txtCapPro().val('');
            },
            cargarDatosBrechasIndicador: function (data) {
                base.Parametros.codigoBrechaIndicador = data.idbrecindi;
                base.Control.txtCodigoInterno().val(base.Parametros.codigoBrechaIndicador);
                base.Control.txtAnioNuevo().val(data.anio);
                base.Control.txtSector().val(data.descsector);
                base.Control.cboFuncion().val(data.idfuncion);
                base.Event.changeFuncion();
                base.Control.cboDivFuncion().val(data.iddivfunci);
                base.Event.changeDivFuncion();
                base.Control.cboGrupoFunc().val(data.idgrupofun);
                base.Control.txtTipologia().val(data.tipologia);
                base.Control.txtServicioAsociadoTopologiaNuevo().val(data.servtipolo);
                base.Control.txtIndicadorNuevo().val(data.indicbrech);
                base.Control.txtUnidadMed().val(data.unimed);
                base.Control.txtCapPro().val(data.capprod);
            },
            cargarControlParametro: function (control, data, type) {

                if (type == 'text') {
                    //$(control).val(data[0].valor);
                    $(control).empty();
                    $.each(data, function (index, item) {
                        control.append(new Option(item.valor, item.idparamval));
                    });
                } else {
                    $(control).empty();
                    control.append(new Option(base.Parametros.Seleccione.text, base.Parametros.Seleccione.value));
                    $.each(data, function (index, item) {
                        control.append(new Option(item.text, item.value));
                    });
                }
            },
            cargarControlListaSensitivo: function (control, data) {
                control.tokenInput(data, {
                    onAdd: callback
                });
            },
            cargarControlLista: function (control, data) {
                $(control).empty();
                control.append(new Option(base.Parametros.Seleccione.text, base.Parametros.Seleccione.value));
                $.each(data, function (index, item) {
                    control.append(new Option(item.text, item.value));
                });
            },
            cargarTablaAdjuntos: function (data) {
                base.Control.tablaDocsAdjuntos().DataTable({
                    paging: true,
                    searching: true,
                    "cache": false,
                    "lengthMenu": [5, 50],
                    destroy: true,
                    searching: false,
                            ordering: false,
                    "ajax": function (request, callback, settings) {
                        callback(data);
                    },
                    "columns": [
                        {"data": "iddocument", "title": "Codigo Documentos"},
                        {"data": "descdoc", "title": "Descripción Documento"},
                        {"data": "feccreacio", "title": "Fecha Creación"},
                        {
                            "data": "iddocument", "title": "Acción", "sType": "html", "mRender": function (data, type, full)
                            {
                                return '<a href="' + Web.SIGPI.URL.DownloadFile + full.nomdoc + '" target="_blank"><span class="fas fa-download"></span></a></div>'
                                        + '<span  class="fas fa-trash-alt" data-id="' + full.iddocument + '"></span></div>'
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
            cargarBandeja: function () {
                var obj = {
                    anio: base.Control.txtAnio().val(),
                    servtipolo: base.Control.txtServicioAsociadoTopologia().val(),
                    indicbrech: base.Control.txtIndicador().val(),
                    pageInfo: null
                };
                base.Control.tablaBrechasIndicadores().DataTable().clear();
                base.Control.tablaBrechasIndicadores().DataTable({
                    "bFilter": false,
                    bDestroy: true,
                    "ordering": false,
                    "cache": false,
                    "bServerSide": true,
                    "bProcessing": false,
                    "bPaginate": true,
                    "ajax": function (request, callback, settings) {
                        obj.pageInfo = this.fnPagingInfo();
                        console.log(obj);
                        console.log(this.fnPagingInfo());
                        $.ajax({
                            "url": 'buscarBrechaIndicador',
                            "type": 'POST',
                            contentType: "application/json",
                            "dataType": 'json',
                            "data": JSON.stringify(obj),
                            success: function (res) {
                                console.log(res);
                                var result = res.data;
                                callback({
                                    'data': result,
                                    "iTotalRecords": result.length > 0 ? result[0].pageInfo.iTotal : "0",
                                    "iDisplayLength": result.length > 0 ? result[0].pageInfo.iEnd : "0",
                                    "iTotalDisplayRecords": result.length > 0 ? result[0].pageInfo.iTotal : "0"
                                });
                            }
                        });
                    },
                    "columns": [
                        {"data": "idbrecindi", "title": "Codigo Interno"},
                        {"data": "descsector", "title": "Sector"},
                        {"data": "descfuncion", "title": "Funcion"},
                        {"data": "descdivfuncion", "title": "Division funcional"},
                        {"data": "descgrupofunc", "title": "Grupo funcional"},
                        {"data": "tipologia", "title": "Tipologia de Inversión"},
                        {"data": "servtipolo", "title": "Servicio Asociado a la Tipologia"},
                        {"data": "indicbrech", "title": "Indicador Brecha del servicio"},
                        {"data": "unimed", "title": "Unidad Medida"},
                        {"data": "capprod", "title": "Unidad Capacidad Productora"},
                        {
                            "data": "idbrecindi", "title": "Acción", "sType": "html", "mRender": function (data, type, full)
                            {
                                return '<span data-toggle="tooltip" data-placement="top" class="fas fa-edit" title="Editar Brecha Indicador" data-id="' + full.idbrecindi + '" data-toggle="modal" data-target="#mdlEditar"></span>' +
                                        '<span data-toggle="tooltip" data-placement="top" class="fas fa-trash-alt" title="Eliminar Brecha Indicador" data-id="' + full.idbrecindi + '"></span>' +
                                        '<span data-toggle="tooltip" data-placement="top" class="fas fa-copy" title="Copiar Brecha Indicador" data-id="' + full.idbrecindi + '"data-toggle="modal" data-target="#mdlCopiar"></span>'
                            }
                        }
                    ],
                    'fnDrawCallback': function () {
                        validarPermiso();
                        $('[data-toggle="tooltip"]').tooltip();
                        $('thead tr th.sorting_asc').removeClass('sorting_asc');
                        $('table').removeClass('dataTable');
                        $('table .fas').parent().addClass('accion');
                    }
                });
            }
        };
    };
} catch (ex) {
    alert(ex.message);
}


