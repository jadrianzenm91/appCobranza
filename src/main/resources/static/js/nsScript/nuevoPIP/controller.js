/// <summary>
/// Script de Controladora de la Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.nuevoPIP.Index.Controller');
    SIGPI.nuevoPIP.Index.Controller = function () {
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
                $('#btnAgregarTipoItem').attr('disabled', 'disabled');
                $('#btnEliminarTipoItem', base.Control.btnEliminarTipoItem()).attr('disabled', 'disabled');
                base.Control.btnAgregarProducto().attr('disabled', 'disabled');
                $('.container-fluid button[name=btnAgregarAccion]').attr('disabled', 'disabled');

            }
            if ($('tbody tr', base.Control.tblTipoItem()).length === 1) {
                $('button[name=btnEliminarTipoItem]').addClass('d-none');
            }
            $('.collapse').toggleClass('in');//apertura todos loas paneles
            base.Parametros.arrayTipoItem = new Array();
            base.Parametros.arrayInversion = new Array();
            base.Control.cboDepartamento().on('change', base.Event.changeUbigeo);
            base.Control.cboProvincia().on('change', base.Event.changeUbigeoProv);
            base.Control.cboFuncion().on('change', base.Event.changeFuncion);
            base.Control.cboDivFuncion().on('change', base.Event.changeDivFuncion);
            base.Control.cboGrupoFunc().on('change', base.Event.changeGrupFuncion);
            base.Control.cboServTipologia().on('change', base.Event.changeServTipologia);
            base.Control.cboIndiBrechaServicio().on('change', base.Event.changeIndiBrechaServicio);
            base.Control.cboUnidadMedida().on('change', base.Event.changeUnidadMedida);
            base.Control.cboTipologia().on('change', base.Event.changeCapacidadProduccion);
            base.Control.cboEntidad().on('change', base.Event.changeEntidad);
            base.Control.btnGuardar().on('click', base.Event.clickBtnGuardar);
            base.Control.btnGuardarObservacion().on('click', base.Event.clickbtnGuardarObservacion);
            base.Control.btnEnviar().on('click', base.Event.clickbtnEnviar);
            base.Control.btnAprobar().on('click', base.Event.clickbtnAprobar);
            base.Control.btnImprimir().on('click', base.Event.clickbtnImprimir);
            base.Control.btnAgregarTipoItem().on('click', base.Event.clickBtnAgregarTipoItem);
            base.Control.tblTipoItem().on('click', '[name=btnEliminarTipoItem]', function () {
                base.Event.clickEliminarFila($(this));
            });
            base.Control.btnOpenModalAdjuntar().on('click', base.Event.clickAdjuntarModal);
            base.Control.tablaDocsAdjuntos().on('click', '.fa-trash-alt', function () {
                base.Event.clickEditarEstadoFileUpload($(this));
            });
            base.Control.txtObjInterv().on('keyup', function () {
                base.Event.keyupObjInterv($(this).val());
            });
             base.Control.txtNomUniProd().on('keyup', function () {
                base.Event.keyupObjInterv();
            });
            base.Control.cboNaturaleza().on('change', base.Event.changeNaturaleza);
            
            base.Control.SeccionDocumentosAdjuntos.btnAdjuntar().on('click', base.Event.clickAdjuntar);

            base.Control.SeccionDocumentosAdjuntos.txtfile().on('change', function () {
                base.Event.changeFileUpload();
            });

            base.Control.tblProductos().on('click', '.fas', function () {
                base.Event.clickAgregarAcciones($(this));
            });
            base.Control.cboNombreUniEjecutora().on('change', base.Event.changeNombreUniEjecutora);

            base.Control.tblTipoItem().on('keyup', 'input[name=txtmontoitem]', function () {
                base.Function.totalizarMontoItem();
            });

            base.Function.totalizarMontoItem();
            validarPermiso();
        };

        base.Control = {
            hdnIdProyectoPIP: function () {
                return $('#hdnIdProyectoPIP');
            },
            hdnIdEstadoActual: function () {
                return $('#hdnIdEstadoActual');
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
            cboDepartamento: function () {
                return $('#cboDepartamento');
            },
            btnEliminarTipoItem: function () {
                return $('#btnEliminarTipoItem');
            },
            cboProvincia: function () {
                return $('#cboProvincia');
            },
            cboDistrito: function () {
                return $('#cboDistrito');
            },
            cboBrechaIndicador: function () {
                return $('#cboBrechaIndicador');
            },
            cboTipoItem: function () {
                return $('#cboTipoItem');
            },
            cboInversion: function () {
                return $('#cboInversion');
            },
            cboDocumentoTecnico: function () {
                return $('#cboDocumentoTecnico');
            },
            cboModalidadEjecucion: function () {
                return $('#cboModalidadEjecucion');
            },
            cboTipoFinanciamiento: function () {
                return $('#cboTipoFinanciamiento');
            },
            cboServTipologia: function () {
                return $('#cboServTipologia');
            },
            cboServTipologia1: function () {
                return $('#cboServTipologia1');
            },
            cboIndiBrechaServicio: function () {
                return $('#cboIndiBrechaServicio');
            },
            tblTipoItem: function () {
                return $('#tblTipoItem');
            },
            tblInversion: function () {
                return $('#tblInversion');
            },
            cboNaturaleza: function () {
                return $('#cboNaturaleza');
            },
            txtCostoRef: function () {
                return $('#txtCostoRef');
            },
            txtCostoRefInv: function () {
                return $('#txtCostoRefInv');
            },
            txtDescProducto: function () {
                return $('#txtDescProducto');
            },
            txtDescAccion: function () {
                return $('#txtDescAccion');
            },
            txtCostoAccion: function () {
                return $('#txtCostoAccion');
            },
            tblHipotesis: function () {
                return $('#tblHipotesis');
            },
            tblProductos: function () {
                return $('#tblProductos');
            },
            tblAcciones: function () {
                return $('#tblAcciones');
            },
            txtNombreProyecto: function () {
                return $('textarea[name=nomproyect]');
            },
            txtTipoItem: function () {
                return $('#txtTipoItem');
            },
            txtInversion: function () {
                return $('#txtInversion');
            },
            txtObservacion: function () {
                return $('#txtObservacion');
            },
            btnAgregarProducto: function () {
                return $('#btnAgregarProducto');
            },
            btnGuardar: function () {
                return $('[name=btnGuardar]');
            },
            btnGuardarObservacion: function () {
                return $('#btnGuardarObservacion');
            },
            btnEnviar: function () {
                return $('[name=btnEnviar]');
            },
            btnAprobar: function () {
                return $('[name=btnAprobar]');
            },
            btnImprimir: function () {
                return $('[name=btnImprimir]');
            },
            modalAcciones: function () {
                return $('#mdlAcciones');
            },
            lblProducto: function () {
                return $('#lblProducto');
            },
            btnOpenModalAdjuntar: function () {
                return $('[name=btnAdjuntarModal]');
            },
            tblTipoPIP: function () {
                return $('#tblTipoPIP');
            },
            tablaDocsAdjuntos: function () {
                return $('#tblDocsAdjuntos');
            },
            modalAdjuntos: function () {
                return $('#mdlAdjuntos');
            },
            modalObservar: function () {
                return $('#mdlObservar');
            },
            txtSectorCuatro: function () {
                return $('#txtSectorCuatro');
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
            },
            txtAnio: function () {
                return $('#txtAnio');
            },
            txtEspacioGeo: function () {
                return $('#txtEspacioGeo');
            },
            cboUnidadMedida: function () {
                return $('#cboUnidadMedida');
            },
            cboUnidadMedida1: function () {
                return $('#cboUnidadMedida1');
            },
            cboTipologia: function () {
                return $('#cboTipologia');
            },
            cboCapProduccion: function () {
                return $('#cboCapProduccion');
            },
            txtValorIndi: function () {
                return $('#txtValorIndi');
            },           
            txtCodunidpro: function () {
                return $('#txtCodunidpro');
            },
            txtValorContri: function () {
                return $('#txtValorContri');
            },
            txtTipoloproy: function () {
                return $('#txtTipoloproy');
            },
            txtSector: function () {
                return $('#txtSector');
            },
            txtEntidad: function () {
                return $('#txtEntidad');
            },
            txtNomUniFormuladora: function () {
                return $('#txtNomUniFormuladora');
            },
            txtRespUniformuladora: function () {
                return $('#txtRespUniformuladora');
            },
            txtSectorDos: function () {
                return $('#txtSectorDos');
            },
            txtEntidadDos: function () {
                return $('#txtEntidadDos');
            },
            cboNombreUniEjecutora: function () {
                return $('#cboNombreUniEjecutora');
            },
            cboRespUniEjecutora: function () {
                return $('#cboRespUniEjecutora');
            },
            txtSectorTres: function () {
                return $('#txtSectorTres');
            },
            txtUniEjecutora: function () {
                return $('#txtUniEjecutora');
            },
            txtNomUniProd: function () {
                return $('#txtNomUniProd');
            },
            btnAgregarTipoItem: function () {
                return $('#btnAgregarTipoItem');
            },
            txtDocutec: function () {
                return $('#txtDocutec');
            },
            txtValpreinv: function () {
                return $('#txtValpreinv');
            },
            txtServicio: function () {
                return $('#txtServicio');
            },
            txtUnidMedid: function () {
                return $('#txtUnidMedid');
            },
            tblServicioPIP: function () {
                return $('#tblServicioPIP');
            },
            txtObjInterv: function () {
                return $('#txtObjInterv');
            },
            idproyepip: function () {
                return $('#idproyepip');
            },
            cboEntidad: function () {
                return $('#cboEntidad');
            }
        };
        
        base.Parametros = {
            ObjetoInversion: '',
            codigoNuevoPIP: base.Control.hdnIdProyectoPIP().val(),
            arrayTipoItem: null,
            arrayItem: null,
//            arrayServicioPIP: null,
            arrayInversion: null,
            arrayDatosInversion: null,
            Seleccione: {
                text: "-- Seleccione --",
                value: "-1"
            },
            TablaParametro: {
                TipoFinanciamiento: Web.SIGPI.Parametro.TipoFinanciamiento,
                ModalidadEjecucion: Web.SIGPI.Parametro.ModalidadEjecucion,
                DocumentoTecnico: Web.SIGPI.Parametro.DocumentoTecnico
            }
        };
        
        base.Event = {
            changeObjetivo: function () {
                base.Event.keyupObjInterv(base.Control.txtNomUniProd());
            },
            changeNaturaleza: function () {
                base.Event.keyupObjInterv(base.Control.txtObjInterv().val());
            },
            keyupObjInterv: function (texto) {
                base.Parametros.ObjetoInversion = '';
                base.Parametros.ObjetoInversion += $('option:selected', base.Control.cboNaturaleza()).text() + ' - ';
                base.Parametros.ObjetoInversion += ' ' + base.Control.txtObjInterv().val() + ' - ' + base.Control.txtNomUniProd().val();
                base.Control.txtNombreProyecto().val(base.Parametros.ObjetoInversion);
            },
            clickbtnAprobar: function () {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, 'Está seguro de APROBAR el Proyecto de Inversión?', function (result) {
                    if (result) {
                        var item = {
                            idproyepip: base.Parametros.codigoNuevoPIP
                        };
                        base.Ajax.ajaxAprobarPIP(item);
                    }
                });
            },
            clickbtnEnviar: function () {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, 'Está seguro de ENVIAR el Proyecto de Inversión a revisión?', function (result) {
                    if (result) {
                        var item = base.Function.getDatosPIP();
                        base.Ajax.ajaxEnviarPIP(item);

                    }
                });
            },
            clickbtnImprimir: function () {
                if (base.Parametros.codigoNuevoPIP == 0) {
                    alerta('warning', '<br>Debe guardar la Inversión antes de Imprimir el documento.');
                    return false;
                } else {
                    myWindow = window.open('./readPIP?id=' + base.Parametros.codigoNuevoPIP, "SISTEMA DE GESTIÓN DE INVERSIONES FAP", "width=" + screen.width + ",height=" + screen.height);
                    myWindow.focus();
                    myWindow.print();
                }
            },
            clickAgregarAcciones: function (obj) {
                var numProducto = $(obj).attr('data-producto');
                var numRowsPan = $('tr[data-producto=' + numProducto + ']', base.Control.tblProductos()).length + 1;
                var trClone = $('tr[data-producto=' + numProducto + '] input[name=txtDescAccion]:last', base.Control.tblProductos()).closest('tr').clone();
                $('tr[data-producto=' + numProducto + '] textarea[name=txtDescProducto]', base.Control.tblProductos()).closest('td').attr('rowspan', numRowsPan);

                $('tr[data-producto=' + numProducto + '] input[name=txtDescAccion]:last', base.Control.tblProductos()).closest('tr').after(function () {
                    $('input[type=text]', $(trClone)).val('');
                    $('textarea', $(trClone)).val('');

                    return trClone;
                });
                $('input.number').number(true, 2);

            },
            clickBtnAgregarTipoItem: function () {
                var trClone = $('tbody tr:eq(0)', base.Control.tblTipoItem()).clone();
                var obj = $('tbody tr[data-clone=1]:last', base.Control.tblTipoItem()).length > 0 ?
                        $('tbody tr[data-clone=1]:last', base.Control.tblTipoItem()) :
                        $('tbody tr:last', base.Control.tblTipoItem());

                $(obj).after(function () {
                    $(trClone).removeClass('d-none');
                    $('button:eq(0)', trClone).removeClass('d-none');
                    $('input[name=txttipoitem]', trClone).val('');
                    $('input[name=txtmontoitem]', trClone).val('');
                    $(trClone).attr('data-clone', '0');
                    return trClone;
                });

                $('.number').number(true, 2);
                base.Function.totalizarMontoItem();
            },
            clickEliminarFila: function (obj) {
                $(obj).parent().parent().remove();
                if ($('tbody tr', base.Control.tblTipoItem()).length === 1) {
                    $('button[name=btnEliminarTipoItem]').addClass('d-none');
                } else {
                    $('button[name=btnEliminarTipoItem]').removeClass('d-none');
                }
                base.Function.totalizarMontoItem();

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
            clickBtnGuardar: function () {
                if (base.Function.validarCamposs()) {
                    BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, Web.SIGPI.MensajeSistema.Confirmacion, function (result) {
                        if (result) {
                            var item = base.Function.getDatosPIP();
                            base.Ajax.ajaxGuardar(item);
                        }
                    });
                }
            },
            clickEliminarTipoItem: function (obj) {
                //Aqui los registro nuevos se eliminan de la vista,
                //los registros de base de datos se ocultan.
                var tr = $(obj).closest('tr');
                (tr).remove();
            },
            changeUbigeo: function () {
                var param = {
                    value: base.Control.cboDepartamento().val()
                };
                $('option[value!=-1]', base.Control.cboDistrito()).remove();
                base.Ajax.getDataControlDesplegable('cargarUbigeoProv', base.Control.cboProvincia(), param, base.Event.changeUbigeoProv);
            },
            changeUbigeoProv: function () {
                var param = {
                    value: base.Control.cboProvincia().val()
                };
                base.Ajax.getDataControlDesplegable('cargarUbigeoDist', base.Control.cboDistrito(), param);
            },
            changeFuncion: function () {
                var param = {
                    value: base.Control.cboFuncion().val()
                };
                $('option[value!=-1]', base.Control.cboGrupoFunc()).remove();
                base.Ajax.getDataControlDesplegable('cargarDivisionFuncionPIP', base.Control.cboDivFuncion(), param, base.Event.changeDivFuncion);
            },
            changeDivFuncion: function () {
                var param = {
                    value: base.Control.cboDivFuncion().val()
                };
                base.Ajax.getDataControlDesplegable('cargarGrupoFuncionalPIP', base.Control.cboGrupoFunc(), param, base.Event.changeGrupFuncion);
            },
            // ----
            changeGrupFuncion: function () {
                var param = {
                    value: base.Control.cboGrupoFunc().val()
                };
                base.Ajax.getDataControlDesplegable('cargarServicioTipologiaPIP', base.Control.cboServTipologia(), param, base.Event.changeServTipologia);
                base.Ajax.getDataControlDesplegable('cargarServicioTipologiaPIP', base.Control.cboServTipologia1(), param);
            },
            changeServTipologia: function () {
                var param = {
                    value: base.Control.cboServTipologia().val()
                };
                base.Control.cboServTipologia1().val(base.Control.cboServTipologia().val());
                base.Ajax.getDataControlDesplegable('cargarIndicadorBrechaServicioPIP', base.Control.cboIndiBrechaServicio(), param, base.Event.changeIndiBrechaServicio);
            },
            changeIndiBrechaServicio: function () {
                var param = {
                    value: base.Control.cboIndiBrechaServicio().val()
                };
                base.Ajax.getDataControlDesplegable('cargarUnidadMedidaPIP', base.Control.cboUnidadMedida(), param, base.Event.changeUnidadMedida);
                base.Ajax.getDataControlDesplegable('cargarUnidadMedidaPIP', base.Control.cboUnidadMedida1(), param);
            },
            changeUnidadMedida: function () {
                var param = {
                    value: base.Control.cboUnidadMedida().val()
                };
                base.Control.cboUnidadMedida1().val(base.Control.cboUnidadMedida().val());
                base.Ajax.getDataControlDesplegable('cargarTipologiaPIP', base.Control.cboTipologia(), param, base.Event.changeCapacidadProduccion);
            },
            changeCapacidadProduccion: function () {
                var param = {
                    value: base.Control.cboTipologia().val()
                };
                base.Ajax.getDataControlDesplegable('capacidadProduccionPIP', base.Control.cboCapProduccion(), param);
            },
            changeEntidad: function () {
                var param = {
                    value: base.Control.cboEntidad().val()
                };
                base.Ajax.getDataControlDesplegable('lstEntidadUnidadE', base.Control.cboEntidad(), param);
            },
            // ---
            clickAdjuntarModal: function () {
                if (base.Parametros.codigoNuevoPIP == 0) {
                    alerta('warning', '<br>Debe guardar la Inversión antes de Adjuntar un documento.');
                    return false;
                }
                base.Control.modalAdjuntos().modal('show');
                base.Event.loadFileUpload();
            },
//            clickEliminarFila: function (obj) {
//                var index = $(obj).parent().parent().index() - 1;
//                $(obj).parent().parent().addClass('d-none');//se quita la fila de la tabla
//                base.Parametros.arrayTipoIOARR[index].estado = 0;
//            },
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
            loadFileUpload: function () {
                var item = {
                    idbrecindi: 0,
                    idproioarr: 0,
                    idproyepip: base.Parametros.codigoNuevoPIP
                };
                base.Ajax.ajaxListFileUpload(item);

            },
            changeNombreUniEjecutora: function () {
                var param = {
                    value: base.Control.cboNombreUniEjecutora().val()
                };
                base.Ajax.getDataControlDesplegable('cargarResponsableUEI', base.Control.cboRespUniEjecutora(), param);
            },
            changeFileUpload: function () {

                var data = new FormData();
                $.each(base.Control.SeccionDocumentosAdjuntos.txtfile()[0].files, function (i, file) {
                    data.append('file-' + i, file);
                });
                base.Ajax.ajaxChangeFileUpload(data);
            }

        };
        
        base.Ajax = {
            ajaxGuardarObservacion: function (obj) {

                $.ajax({
                    "url": 'insertObservacionPIP',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(obj),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Control.modalObservar().modal('hide');
                        base.Function.limpiarCampoObservacion();
                        window.location = './seguimientoPIP?id=' + data.data.idproyepip;
                        ;
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
            ajaxEnviarPIP: function (data) {
                $.ajax({
                    "url": 'enviarPIP',
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
            ajaxAprobarPIP: function (data) {
                $.ajax({
                    "url": 'aprobarP01PIP',
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
            ajaxGuardar: function (data) {
                console.log(data);
                $.ajax({
                    "url": 'setPIP',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(data),
                    success: function (response) {
                        debugger
                        console.log(response);
                        alerta(response.type, response.message);
                        window.location = './getPIP?id=' + response.data.idProyepip;
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
                        base.Function.cargarControlLista(controlDestino, res.data, callback);
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
            }
        };

        base.Function = {
            totalizarMontoItem: function () {
                var total = 0;
                $.each($('input[name=txtmontoitem]'), function (i, item) {
                    total += parseFloat($(item).val().length == 0 ? 0 : $(item).val());
                });
                $('#txtTotalItem').val(total);
            },
            getDatosPIP: function () {
                var itemPIP = {
                    idProyepip: base.Parametros.codigoNuevoPIP,
                    idbrecindi: base.Control.cboIndiBrechaServicio().val(),
                    idfuncion: base.Control.cboFuncion().val(),
                    iddivfunci: base.Control.cboDivFuncion().val(),
                    idgrupofun: base.Control.cboGrupoFunc().val(),
                    natinterve: base.Control.cboNaturaleza().val(),
                    idDepartamento: base.Control.cboDepartamento().val(),
                    idProvincia: base.Control.cboProvincia().val(),
                    idDistrito: base.Control.cboDistrito().val(),
                    nomproyect: base.Control.txtNombreProyecto().val(),
                    tipejecpro: base.Control.cboModalidadEjecucion().val(),
                    tipfinanpr: base.Control.cboTipoFinanciamiento().val(),
                    idsectresp: base.Control.txtSectorCuatro().val(),
                    servpublic: base.Control.cboServTipologia().val(),
                    espaciogeo: base.Control.txtEspacioGeo().val(),
                    unidadmed: base.Control.cboUnidadMedida().val(),
                    anio: base.Control.txtAnio().val(),
                    valorindi: base.Control.txtValorIndi().val(),
                    valorcontri: base.Control.txtValorContri().val(),
                    tipolopry: base.Control.cboTipologia().val(),
                    idsectoruf: base.Control.txtSector().val(),
                    identidauf: base.Control.txtEntidad().val(),
                    idnombreuf: base.Control.txtNomUniFormuladora().val(),
                    idresponuf: base.Control.txtRespUniformuladora().val(),
                    idsectoufi: base.Control.txtSectorDos().val(),
                    identidufi: base.Control.txtEntidadDos().val(),
                    idnombruei: base.Control.cboNombreUniEjecutora().val(),
                    idrespouei: base.Control.cboRespUniEjecutora().val(),
                    idsectouep: base.Control.txtSectorTres().val(),
                    identiduep: base.Control.cboEntidad().val(),
                    idnombruep: base.Control.txtUniEjecutora().val(),
                    nomuniprod: base.Control.txtNomUniProd().val(),
                    docutec: base.Control.cboDocumentoTecnico().val(),
                    valpreinv: base.Control.txtValpreinv().val(),
                    objinterv: base.Control.txtObjInterv().val(),
                    capproduc: base.Control.cboCapProduccion().val(),
                    codunidpro: base.Control.txtCodunidpro().val()

                };

                $.each($('tbody tr[data-clone=0]', base.Control.tblTipoItem()), function (i, item) {
                    var obj = {
                        idtipoitem: 0
                        , idProyepip: 0
                        , iditem: $(item).find('input[name=txttipoitem]').val()
                        , costoref: $(item).find('input[name=txtmontoitem]').val()
                        , estado: 1
                    };
                    base.Parametros.arrayTipoItem.push(obj);
                });


                $.each($('tbody tr', base.Control.tblInversion()), function (i, item) {
                    var obj = {
                        idinversion: 0
                        , idproyepip: 0
                        , idtipoinver: $(item).find('input[type=hidden]').val()
                        , costoref: $(item).find('input[type=text]').val()
                        , estado: 1
                    };
                    base.Parametros.arrayInversion.push(obj);
                });


                var item = {
                    proyectoPIP: itemPIP,
                    listTipoItem: base.Parametros.arrayTipoItem,
                    listInversion: base.Parametros.arrayInversion

                };

                return item;

            },
            limpiarCampoObservacion: function () {
                base.Control.txtObservacion().val('');
            },
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
            validarCamposs: function () {
                var cadena = '';
                if (base.Control.cboIndiBrechaServicio().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe Seleccionar Indicador de producto asociado a la brecha de servicios.';
                }
                if (base.Control.cboFuncion().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe Seleccionar una Funcion.';
                }
                if (base.Control.cboDivFuncion().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe Seleccionar una Division Función.';
                }
                if (base.Control.cboGrupoFunc().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe Seleccionar un Grupo Función.';
                }

                if (cadena.length > 0) {
                    alerta('warning', cadena);
                    return false;
                }
                return true;
            },
            validarCampos: function () {
                var cadena = '';
                if (base.Control.cboIndiBrechaServicio().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe Seleccionar Indicador de producto asociado a la brecha de servicios.';
                }
                if (base.Control.cboFuncion().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe Seleccionar una Funcion.';
                }
                if (base.Control.cboDivFuncion().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe Seleccionar una Division Función.';
                }
                if (base.Control.cboGrupoFunc().val() == base.Parametros.Seleccione.value) {
                    cadena += '<br>Debe Seleccionar un Grupo Función.';
                }

                if (cadena.length > 0) {
                    alerta('warning', cadena);
                    return false;
                }
                return true;
            },
            cargarControlListaSensitivo: function (control, data) {
                control.tokenInput(data, {
                    onAdd: callback
                });
            },
            cargarControlLista: function (control, data, callback) {
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
            cargarTablaAdjuntos: function (data) {
                base.Control.tablaDocsAdjuntos().DataTable({
                    paging: true,
                    searching: true,
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
                                        + '<span data-toggle="tooltip" data-placement="top" title="Eliminar archivo" class="fas fa-trash-alt" data-id="' + full.iddocument + '"></span></div>'
                            }
                        }
                    ],
                    'fnDrawCallback': function () {  validarPermiso();
                        $('thead tr th.sorting_asc').removeClass('sorting_asc');
                        $('table').removeClass('dataTable');
                        $('table .fas').parent().addClass('accion tres-botones');
                    }
                });
            }
        };
    };
} catch (ex) {
    alert(ex.message);
}


