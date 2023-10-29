/// <summary>
/// Script de Controladora de la Vista 
/// </summary>
/// <remarks>
/// </remarks> 
try {
    ns('SIGPI.nuevoIOARR.Index.Controller');
    SIGPI.nuevoIOARR.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';
            if (base.Control.hdnIdEstadoActual().val() == Web.SIGPI.Parametro.Aprobado ||
                    base.Control.hdnIdEstadoActual().val() == Web.SIGPI.Parametro.PendienteRevision)
            {
                $('.container-fluid input[type=text]').attr('disabled', 'disabled');
                $('.container-fluid input[type=number]').attr('disabled', 'disabled');
                $('.container-fluid select').attr('disabled', 'disabled');
                $('.container-fluid textarea').attr('disabled', 'disabled');
                $('#btnAgregarTipoIOARR').attr('disabled', 'disabled');
                // btnAgregarTipoIOARR
                $('.container-fluid input[type=radio]').attr('disabled', 'disabled');
            }
            if ($('tbody tr', base.Control.tblTipoIOARR()).length === 1) {
                $('button[name=btnEliminarTipoIOARR]').addClass('d-none');
            }
            //$('.collapse').toggleClass('in');
            base.Parametros.arrayTipoIOARR = new Array();
            base.Control.cboNombreUniEjecutora().on('change', base.Event.changeNombreUniEjecutora);
            base.Control.cboDepartamento().on('change', base.Event.changeUbigeo);
            base.Control.cboProvincia().on('change', base.Event.changeUbigeoProv);
            base.Control.cboFuncion().on('change', base.Event.changeFuncion);
            base.Control.cboDivFuncion().on('change', base.Event.changeDivFuncion);
            base.Control.cboGrupoFunc().on('change', base.Event.changeGrupFuncion);
            base.Control.cboServTipologia().on('change', base.Event.changeServTipologia);
            base.Control.cboEntidad().on('change', base.Event.changeEntidad);
            base.Control.btnGuardar().on('click', base.Event.clickBtnGuardar);
            base.Control.btnGuardarObservacion().on('click', base.Event.clickbtnGuardarObservacion);
            base.Control.btnImprimir().on('click', base.Event.clickbtnImprimir);
            base.Control.cboIndiBrechaServicio().on('change', base.Event.changeIndiBrechaServicio);
            base.Control.btnAgregarTipoIOARR().on('click', base.Event.clickBtnAgregarTipoIOARR);
            base.Control.btnEnviar().on('click', base.Event.clickbtnEnviar);
            base.Control.btnAprobar().on('click', base.Event.clickbtnAprobar);
            base.Control.txtNomUnidadProductora().on('keyup', function () {
                base.Event.keyupNomUnidadProductora();
            });
            base.Control.txtObjInterv().on('keyup', function () {
                base.Event.keyupNomUnidadProductora();
            });

            base.Control.btnOpenModalAdjuntar().on('click', base.Event.clickAdjuntarModal);
            base.Control.tablaDocsAdjuntos().on('click', '.fa-trash-alt', function () {
                base.Event.clickEditarEstadoFileUpload($(this));
            });
            base.Control.tblTipoIOARR().on('click', 'button[name=btnEliminarTipoIOARR]', function () {
                base.Event.clickEliminarFila($(this));
            });
            base.Control.tblTipoIOARR().on('change', 'select', function () {
                base.Event.changeTipoIOARR();
            });
            base.Control.SeccionDocumentosAdjuntos.btnAdjuntar().on('click', base.Event.clickAdjuntar);
            base.Control.SeccionDocumentosAdjuntos.txtfile().on('change', function () {
                base.Event.changeFileUpload();
            });
        };
        base.Control = {
            hdnIdEstadoActual: function () {
                return $('#hdnIdEstadoActual');
            },
            hdnIdProyectoIOARR: function () {
                return $('#hdnIdProyectoIOARR');
            },
            cboNombreUniEjecutora: function () {
                return $('#cboNombreUniEjecutora');
            },
            cboRespUniEjecutora: function () {
                return $('#cboRespUniEjecutora');
            },
            cboDepartamento: function () {
                return $('#cboDepartamento');
            },
            cboProvincia: function () {
                return $('#cboProvincia');
            },
            cboDistrito: function () {
                return $('#cboDistrito');
            },
            cboFuncion: function () {
                return $('#cboFuncion');
            },
            cboIndiBrechaServicio: function () {
                return $('#cboIndiBrechaServicio');
            },
            tablaDocsAdjuntos: function () {
                return $('#tblDocsAdjuntos');
            },
            cboDivFuncion: function () {
                return $('#cboDivFuncion');
            },
            cboGrupoFunc: function () {
                return $('#cboGrupoFunc');
            },
            cboServTipologia: function () {
                return $('#cboServTipologia');
            },
            txtSector: function () {
                return $('#txtSector');
            },
            txtSectorDos: function () {
                return $('#txtSectorDos');
            },
            txtSectorTres: function () {
                return $('#txtSectorTres');
            },
            txtSectorCuatro: function () {
                return $('#txtSectorCuatro');
            },
            txtNomUniFormuladora: function () {
                return $('#txtNomUniFormuladora');
            },
            txtEntidad: function () {
                return $('#txtEntidad');
            },
            txtEntidadDos: function () {
                return $('#txtEntidadDos');
            },
            cboEntidad: function () {
                return $('#cboEntidad');
            },
            txtUniEjecutora: function () {
                return $('#txtUniEjecutora');
            },
            txtRespUniformuladora: function () {
                return $('#txtRespUniformuladora');
            },
            cboTipoIOARR: function () {
                return $('#cboTipoIOARR');
            },
            cboUnidadMed: function () {
                return $('#cboUnidadMed');
            },
            txtMontoInversion: function () {
                return $('#txtMontoInversion');
            },
            btnGuardar: function () {
                return $('[name=btnGuardar]');
            },
            btnEnviar: function () {
                return $('[name=btnEnviar]');
            },
            btnAprobar: function () {
                return $('[name=btnAprobar]');
            },
            btnGuardarObservacion: function () {
                return $('#btnGuardarObservacion');
            },
            btnObservar: function () {
                return $('[name=btnObservar]');
            },
            txtNomUnidadProductora: function () {
                return $('#txtNomUnidadProductora');
            },
            txtCodunidpro: function () {
                return $('#txtCodunidpro');
            },
            btnAgregarTipoIOARR: function () {
                return $('button[name=btnAgregarTipoIOARR]');
            },
            tblTipoIOARR: function () {
                return $('#tblTipoIOARR');
            },
            btnOpenModalAdjuntar: function () {
                return $('[name=btnAdjuntarModal]');
            },
            modalAdjuntos: function () {
                return $('#mdlAdjuntos');
            },
            btnImprimir: function () {
                return $('[name=btnImprimir]');
            },
            txtNombreInversion: function () {
                return $('textarea[name=nombreInversion]');
            },
            txtAnio: function () {
                return $('#txtAnio');
            },
            txtEspacioGeo: function () {
                return $('#txtEspacioGeo');
            },
            txtValorIndicador: function () {
                return $('#txtValorIndicador');
            },
            txtValorContri: function () {
                return $('#txtValorContri');
            },
            txtObjInterv: function () {
                return $('#txtObjInterv');
            },
            cboModalidadEjecucion: function () {
                return $('#cboModalidadEjecucion');
            },
            cboTipoFinanciamiento: function () {
                return $('#cboTipoFinanciamiento');
            },
            txtObservacion: function () {
                return $('#txtObservacion');
            },
            usucreacio: function () {
                return $('#usucreacio');
            },
            idproioarr: function () {
                return $('#idproioarr');
            },
            modalObservar: function () {
                return $('#mdlObservar');
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
            NombreProyecto: '',
            ObjetoInversion: '',
            Seleccione: {
                text: "-- Seleccione --",
                value: "-1",
            },
            TablaParametro: {
                Sector: Web.SIGPI.Parametro.Sector,
                NomUniFormuladora: Web.SIGPI.Parametro.NomUniFormuladora,
                Entidad: Web.SIGPI.Parametro.Entidad,
                RespUniformuladora: Web.SIGPI.Parametro.RespUniformuladora
            },
            codigoNuevoIOARR: base.Control.hdnIdProyectoIOARR().val(),
            arrayTipoIOARR: null
        };
        base.Event = {
            clickbtnAprobar: function () {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, 'Está seguro de APROBAR la Inversión?', function (result) {
                    if (result) {
                        var item = {
                            idproioarr: base.Parametros.codigoNuevoIOARR
                        };
                        base.Ajax.ajaxAprobarIOARR(item);
                    }
                });
            },
            clickbtnEnviar: function () {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, 'Está seguro de ENVIAR la Inversión a revisión?', function (result) {
                    if (result) {
                        var item = base.Function.getDatosIOARR();
                        base.Ajax.ajaxEnviarIOARR(item);

                    }
                });
            },
            changeTipoIOARR: function () {
                base.Event.keyupNomUnidadProductora(base.Control.txtNomUnidadProductora().text());
            },
            changeNaturaleza: function () {
                base.Event.keyupNomUnidadProductora(base.Control.txtObjInterv().val());
            },
            keyupNomUnidadProductora: function () {
                base.Parametros.NombreProyecto = '';
                $.each($('tbody tr', base.Control.tblTipoIOARR()), function (index, item) {
                    if ($('td:eq(0) select', item).val() != base.Parametros.Seleccione.value) {
                        base.Parametros.NombreProyecto += $('td:eq(0) select option:selected', item).text() + ' - ';
                    }
                });

                base.Parametros.NombreProyecto += ' ' + base.Control.txtObjInterv().val() + ' - ' + base.Control.txtNomUnidadProductora().text();

                base.Control.txtNombreInversion().val(base.Parametros.NombreProyecto);
            },
            clickbtnImprimir: function () {
                if (base.Parametros.codigoNuevoIOARR == 0) {
                    alerta('warning', '<br>Debe guardar la Inversión antes de Imprimir el documento.');
                    return false;
                } else {
                    myWindow = window.open('./readIOARR?id=' + base.Parametros.codigoNuevoIOARR, "SISTEMA DE GESTIÓN DE INVERSIONES FAP", "width=" + screen.width + ",height=" + screen.height);
                    myWindow.focus();
                    myWindow.print();
                }
            },
            clickAdjuntarModal: function () {
                if (base.Parametros.codigoNuevoIOARR == 0) {
                    alerta('warning', '<br>Debe guardar la Inversión antes de Adjuntar un documento.');
                    return false;
                }
                base.Control.modalAdjuntos().modal('show');
                base.Event.loadFileUpload();
            },
            clickEliminarFila: function (obj) {
                $(obj).parent().parent().remove();
                base.Event.keyupNomUnidadProductora(base.Control.txtNomUnidadProductora().val());
                if ($('tbody tr', base.Control.tblTipoIOARR()).length === 1) {
                    $('button[name=btnEliminarTipoIOARR]').addClass('d-none');
                }
            },
            clickBtnAgregarTipoIOARR: function () {
                var trClone = $('tbody tr:eq(0)', base.Control.tblTipoIOARR()).clone();
                var idTipoIOARR = $('option:selected', base.Control.tblTipoIOARR()).val();
                base.Control.tblTipoIOARR().append(function () {
                    $(trClone).removeClass('d-none');
                    $('button:eq(0)', trClone).removeClass('d-none');
                    $(trClone).attr('data-clone', '0');
                    $('select', trClone).val(idTipoIOARR);
                    return trClone;
                });
                $('.number').number(true, 2);
                base.Function.limpiarCamposTipoInversion();
                if ($('tbody tr', base.Control.tblTipoIOARR()).length > 0) {
                    $('button[name=btnEliminarTipoIOARR]').removeClass('d-none');
                }
            },
            clickEditarEstadoFileUpload: function (id) {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, Web.SIGPI.MensajeSistema.MensajeConfirmacionCambiarEstado, function (result) {
                    if (result) {
                        base.Ajax.ajaxDeleteFileUpload($(id).data('id'));
                    }
                });
            },
            clickBtnGuardar: function () {
                if (base.Function.validarCampos()) {
                    BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, Web.SIGPI.MensajeSistema.Confirmacion, function (result) {
                        if (result) {
                            var item = base.Function.getDatosIOARR();
                            base.Ajax.setNuevoIOARR(item);
                        }
                    });
                }
            },
            clickAdjuntar: function () {
                if (base.Function.validarCamposFileUpload()) {
                    BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, Web.SIGPI.MensajeSistema.MensajeConfirmacionAdjuntar, function (result) {
                        if (result) {
                            var obj = {
                                urldoc: base.Control.SeccionDocumentosAdjuntos.hdnFileURL().val(),
                                descdoc: base.Control.SeccionDocumentosAdjuntos.txtNamefile().val(),
                                nomdoc: base.Control.SeccionDocumentosAdjuntos.hdnFileName().val(),
                                idproioarr: base.Parametros.codigoNuevoIOARR
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
                            idproioarr: base.Parametros.codigoNuevoIOARR
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
            changeUbigeo: function () {
                var param = {
                    value: base.Control.cboDepartamento().val()
                };
                $('option', base.Control.cboDistrito()).remove();
                base.Ajax.getDataControlDesplegable('cargarUbigeoProvIOARR', base.Control.cboProvincia(), param, base.Event.changeUbigeoProv);
            },
            changeUbigeoProv: function () {
                var param = {
                    value: base.Control.cboProvincia().val()
                };
                base.Ajax.getDataControlDesplegable('cargarUbigeoDistIOARR', base.Control.cboDistrito(), param);
            },
            changeFuncion: function () {
                var param = {
                    value: base.Control.cboFuncion().val()
                };
                base.Ajax.getDataControlDesplegable('cargarDivisionFuncionIOARR', base.Control.cboDivFuncion(), param, base.Event.changeDivFuncion);
            },
            changeDivFuncion: function () {
                var param = {
                    value: base.Control.cboDivFuncion().val()
                };
                base.Ajax.getDataControlDesplegable('cargarGrupoFuncionalIOARR', base.Control.cboGrupoFunc(), param, base.Event.changeGrupFuncion);
            },
//            -----
            changeGrupFuncion: function () {
                var param = {
                    value: base.Control.cboGrupoFunc().val()
                };
                base.Ajax.getDataControlDesplegable('cargarServicioTipologiaIOARR', base.Control.cboServTipologia(), param, base.Event.changeServTipologia);
            },
            changeServTipologia: function () {
                var param = {
                    value: base.Control.cboServTipologia().val()
                };
                base.Ajax.getDataControlDesplegable('cargarIndicadorBrechaServicioIOARR', base.Control.cboIndiBrechaServicio(), param, base.Event.changeIndiBrechaServicio);
            },
            changeIndiBrechaServicio: function () {
                var param = {
                    value: base.Control.cboIndiBrechaServicio().val()
                };
                base.Ajax.getDataControlDesplegable('cargarUnidadMedidaIOARR', base.Control.cboUnidadMed(), param);
            },
            changeUnidadMedida: function () {
                var param = {
                    value: base.Control.cboUnidadMed().val()
                };
                base.Ajax.getDataControlDesplegable('cargarTipologiaPIP', base.Control.cboTipologia(), param);
            },
            //------
            changeNombreUniEjecutora: function () {
                var param = {
                    value: base.Control.cboNombreUniEjecutora().val()
                };
                base.Ajax.getDataControlDesplegable('cargarResponsableUEI', base.Control.cboRespUniEjecutora(), param);
            },
            changeEntidad: function () {
                var param = {
                    value: base.Control.cboEntidad().val()
                };
                base.Ajax.getDataControlDesplegable('lstEntidadUnidadE', base.Control.cboEntidad(), param);
            },
            loadFileUpload: function () {

                var item = {
                    idbrecindi: 0,
                    idproioarr: base.Parametros.codigoNuevoIOARR,
                    idproyepip: 0
                };
                base.Ajax.ajaxListFileUpload(item);
            }
        };
        base.Ajax = {
            ajaxAprobarIOARR: function (data)
            {
                $.ajax({
                    "url": 'aprobarP01IOARR',
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
            ajaxEnviarIOARR: function (data) {
                $.ajax({
                    "url": 'enviarIOARR',
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
                        base.Event.loadFileUpload();
                    }
                });
            },
            setNuevoIOARR: function (data) {
                console.log(data);
                $.ajax({
                    "url": 'saveIOARR',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(data),
                    success: function (response) {
                        console.log(response);
                        alerta(response.type, response.message);
                        window.location = './getIOARR?id=' + response.data.idProyectoIOARR;
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
            },
            ajaxGuardarObservacion: function (obj) {

                $.ajax({
                    "url": 'insertObservacion',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(obj),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Control.modalObservar().modal('hide');
                        base.Function.limpiarCampoObservacion();
                        window.location = './seguimientoIOARR?id=' + data.data.idproioarr;

                    }
                });
            }
        };
        base.Function = {
            getDatosIOARR: function () {
                var item1 = {
                    idProIOARR: base.Parametros.codigoNuevoIOARR
                    , idResponsableUF: base.Control.txtRespUniformuladora().val()
                    , idSectorUF: base.Control.txtSector().val()
                    , idNombreUF: base.Control.txtNomUniFormuladora().val()
                    , idEntidadUF: base.Control.txtEntidad().val()
                    , idSectorUFI: base.Control.txtSectorDos().val()
                    , idEntidadUFI: base.Control.txtEntidadDos().val()
                    , idNombreUEI: base.Control.cboNombreUniEjecutora().val()
                    , idResponsableUEI: base.Control.cboRespUniEjecutora().val()
                    , idSectorUEP: base.Control.txtSectorTres().val()
                    , idEntidadUEP: base.Control.cboEntidad().val()
                    , idNombreUEP: base.Control.txtUniEjecutora().val()
                    , idFuncion: base.Control.cboFuncion().val()
                    , idDivFuncion: base.Control.cboDivFuncion().val()
                    , idGrupoFuncion: base.Control.cboGrupoFunc().val()
                    , idSectorResponsable: base.Control.txtSectorCuatro().val()
                    , servicioPulico: base.Control.cboServTipologia().val()
                    , idBrechaIndicador: base.Control.cboIndiBrechaServicio().val()
                    , unidadProductora: base.Control.txtNomUnidadProductora().text()
                    , codUnidadProductora: base.Control.txtCodunidpro().val()
                    , idDepartamento: base.Control.cboDepartamento().val()
                    , idProvincia: base.Control.cboProvincia().val()
                    , idDistrito: base.Control.cboDistrito().val()
                    , financiaTotalParcial: document.querySelector('input[name="pregunta8"]:checked').value
                    , modalidadEjecucion: base.Control.cboModalidadEjecucion().val()
                    , fuenteFinanciamiento: base.Control.cboTipoFinanciamiento().val()
                    , nombreInversion: base.Control.txtNombreInversion().val()
                    , espaciogeo: base.Control.txtEspacioGeo().val()
                    , unidadmed: base.Control.cboUnidadMed().val()
                    , anio: base.Control.txtAnio().val()
                    , valorindicador: base.Control.txtValorIndicador().val()
                    , valorcontri: base.Control.txtValorContri().val()
                    , objinterv: base.Control.txtObjInterv().val()
                };
                $.each($('tbody tr', base.Control.tblTipoIOARR()), function (i, item) {
                    var obj = {
                        idProyTipoIOARR: 0
                        , idProyIOARR: 0
                        , idTipoIOARR: $(item).find('select').val()
                        , montoInversion: $(item).find('input[type=text]').val()
                        , estado: 1
                    };
                    base.Parametros.arrayTipoIOARR.push(obj);
                });
                var item = {
                    proyectoIOARR: item1,
                    listProyectoTipoIOARR: base.Parametros.arrayTipoIOARR
                };
                return item;
            },
            limpiarCamposTipoInversion: function () {
                $(base.Control.cboTipoIOARR(), base.Control.tblTipoIOARR()).val(base.Parametros.Seleccione.value);
                $(base.Control.txtMontoInversion(), base.Control.tblTipoIOARR()).val('');
            },
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
            validarCampos: function () {
                var cadena = '';
                if (base.Control.cboFuncion().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe seleccionar una Función';
                }
                if (base.Control.cboDivFuncion().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe seleccionar una División Funcional';
                }
                if (base.Control.cboGrupoFunc().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe seleccionar un Grupo Funcional';
                }
                if (base.Control.cboIndiBrechaServicio().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe seleccionar un Indicador asociado a la Brecha de Servicios';
                }
                if (base.Control.cboProvincia().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe seleccionar una Provincia';
                }
                if (base.Control.cboDistrito().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe seleccionar un Distrito';
                }
                if (base.Control.cboDepartamento().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe seleccionar un Departamento';
                }
                $.each($('tr', base.Control.tblTipoIOARR()), function (i, item) {
                    if ($('select', item).val() == base.Parametros.Seleccione.value) {
                        cadena += '<br>Debe agregar un Tipo IOARR';
                    }
                });
                if (!$('input[name="pregunta8"]').is(':checked')) {
                    cadena += '<br>Debe responder la Pregunta';
                }


                if (cadena.length > 0) {
                    alerta('warning', cadena);
                    return false;
                }
                return true;
            },
            cargarControlDesplegable: function (control, data, callback) {
                $(control).empty();
                if (data.length > 1) {
                    control.append(new Option(base.Parametros.Seleccione.text, base.Parametros.Seleccione.value));
                }
                $.each(data, function (index, item) {
                    control.append(new Option(item.text, item.value));
                });
                if (callback !== undefined) {
                    callback();
                }
            },
            cargarTablaAdjuntos: function (data) {

                base.Control.tablaDocsAdjuntos().DataTable({
                    paging: true,
                    "cache": false,
                    "lengthMenu": [5, 50],
                    destroy: true,
                    searching: false,
                    ordering: false,
                    "ajax": function (request, callback, settings) {
                        callback(data);
                    },
                    "columns": [
                        {"data": "iddocument", "title": "Codigo Documento"},
                        {"data": "descdoc", "title": "Descripción Documento"},
                        {"data": "feccreacio", "title": "Fecha Creación"},
                        {
                            "data": "iddocumento", "title": "Acción", "sType": "html", "mRender": function (data, type, full)
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
                    }
                });
            }

        };
    };
} catch (ex) {
    alert(ex.message);
}



