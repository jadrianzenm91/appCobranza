
try {
    ns('SIGPI.IdeasInversion.Index.Controller');
    SIGPI.IdeasInversion.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';
            //base.Event.loadEstadosRegistro();
            base.Function.cargarBandeja();
            $('input[data-findenter=1]').on('keypress', function(e){
                if(e.which == 13) {
                    base.Event.clickBuscar();
                }
            });
            $('select').on('change', function(e){
                base.Event.clickBuscar();
            });
            base.Control.btnBuscar().on('click', base.Event.clickBuscar);
            base.Control.btnGuardarCodigo().on('click', function () {
                var obj = $('input[name=chkAprobacionPMI]');

                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, "Está seguro de guardar el estado (Aprobado) del PMI Institucional.", function (result) {
                    if (result) {
                        if ($(obj).attr('data-tipo') == 'IOARR') {
                            base.Event.clickAprobacionPMI_IOARR(obj);
                        } else {
                            base.Event.clickAprobacionPMI_PIP(obj);
                        }
                    }
                });
            });
            base.Control.tablaIdeasInversiones().on('click', 'input[name=chkAprobacionPMI]', function () {
                var obj = $(this);
                if($(obj).val() == Web.SIGPI.Parametro.AprobadoPMI){
                    $("#mdlRegistrar").modal('show');
                }
                else{
                    BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, "Está seguro de guardar el estado (Desaprobado) del PMI Institucional.", function (result) {
                        if (result) {
                            
                            if ($(obj).attr('data-tipo') == 'IOARR') {
                                base.Event.clickAprobacionPMI_IOARR(obj);
                            } else {
                                base.Event.clickAprobacionPMI_PIP(obj);
                            }
                        }else{
                            $('input[name=chkAprobacionPMI]').prop('checked', false);
                        }
                    });
                }
                
            });
            
            $('#mdlRegistrar').on('hidden.bs.modal', function (e) {
                $('input[name=chkAprobacionPMI]').prop('checked', false);
            });


        };
        base.Parametros = {
            Seleccione: {
                text: "TODOS",
                value: "-1"
            },
            TablaParametro: {
                EstadosRegistro: Web.SIGPI.Parametro.EstadosRegistro
            }

        };

        base.Control = {
            btnAdjuntar: function () {
                return $('#btnAdjuntar');
            },
            tablaIdeasInversiones: function () {
                return $('#tblIdeasInversiones');
            },
            cboEstadosRegistro: function () {
                return $('#cboEstadosRegistro');
            },
            btnGuardarCodigo: function () {
                return $('#btnGuardarCodigo');
            },
            txtCodUniMEF: function () {
                return $('#txtCodUniMEF');
            },
            mdlRegistrar: function () {
                return $('#mdlRegistrar');
            },
            cboUnidadServicio: function () {
                return $('#cboUnidadServicio');
            },
            txtAnio: function () {
                return $('#txtanio');
            },
            txtTipo: function () {
                return $('#txtTipo');
            },
            txtEstado_registro: function () {
                return $('#txtEstado_registro');
            },
            txtSigla: function () {
                return $('#txtSigla');
            },
            txtNombreproy: function () {
                return $('#txtNombreproy');
            },
            btnBuscar: function () {
                return $('#btnBuscar');
            },
            txtCodigo: function () {
                return $('#txtCodigo');
            },
        };

        base.Event = {
            clickAprobacionPMI_PIP: function (obj) {
                var item = {
                    id: $(obj).attr('data-id'),
                    estado: $(obj).val(),
                    codigo: base.Control.txtCodUniMEF().val().length == 0? 0 : base.Control.txtCodUniMEF().val()

                };
                base.Ajax.setAprobacionPMI_PIP(item);
            },
            clickAprobacionPMI_IOARR: function (obj) {

                var item = {
                    id: $(obj).attr('data-id'),
                    estado: $(obj).val(),
                    codigo: base.Control.txtCodUniMEF().val().length == 0? 0 : base.Control.txtCodUniMEF().val()
                };
                base.Ajax.setAprobacionPMI_IOARR(item);

            },
            clickBuscar: function () {
                base.Function.cargarBandeja();
            }

        };
        base.Ajax = {
            setAprobacionPMI_PIP: function (item) {
                $.ajax({
                    "url": 'updatePmiPIP',
                    "type": 'POST',
                    "data": {"id": item.id, "estado": item.estado, "codigo": item.codigo},
                    success: function (data) {
                        alerta(data.type, data.message);
                        base.Control.mdlRegistrar().modal('hide');
                        base.Function.cargarBandeja();
                        window.location = './seguimientoPIP?id=' + item.id;
                    }
                });
            },
            setAprobacionPMI_IOARR: function (item) {
                $.ajax({
                    "url": 'updatePmiIOARR',
                    "type": 'POST',
                    "data": {"id": item.id, "estado": item.estado, "codigo": item.codigo},
                    success: function (data) {
                        alerta(data.type, data.message);
                        base.Control.mdlRegistrar().modal('hide');
                        base.Function.cargarBandeja();
                        window.location = './seguimientoIOARR?id=' + item.id;
                    }
                });
            },
            getIdeasInversion: function (id) {
                $.ajax({
                    "url": 'getIdeasInversion',
                    "type": 'GET',
                    "data": {"id": id},
                    success: function (data) {
                        console.log(data);
                        base.Function.cargarDatosIdeasInversion(data);
                    }
                });
            }

        };
        base.Function = {
            cargarBandeja: function () {
                var obj = {
                    anio: base.Control.txtAnio().val(),
                    tipo: base.Control.txtTipo().val(),
                    estado_registro: base.Control.txtEstado_registro().val(),
                    sigla: base.Control.txtSigla().val(),
                    nombreproy: base.Control.txtNombreproy().val(),
                    idpip_ioarr: base.Control.txtCodigo().val(),
                    pageInfo: null
                };
                base.Control.tablaIdeasInversiones().DataTable().clear();
                base.Control.tablaIdeasInversiones().DataTable({
                      dom: 'Bfrtip',
                        buttons: [{
                            extend : 'excel',
                            text : 'Exportar Excel',
                             exportOptions : {
                                modifier : {
                                    page : 'all'      // 'all',     'current'
                                }
                            }
                        }],
                    "lengthMenu": [50,10],
                    "bFilter": false,
                    bDestroy: true,
                    "ordering": false,
                    "cache": false,
                    "bServerSide": true,
                    "bProcessing": false,
                    "bPaginate": true,
                    "ajax": function (request, callback, settings) {
                        obj.pageInfo = this.fnPagingInfo();
                        $.ajax({
                            "url": 'buscarIdeasInversion',
                            "type": 'POST',
                            contentType: "application/json",
                            "dataType": 'json',
                            "data": JSON.stringify(obj),
                            success: function (data) {
                                console.log(data);
                                var result = data.aaData;
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
                        {"data": "codunimef", "title": "Codigo de Idea"},
                        {"data": "nombreproy", "title": "Idea de Inversion"},
                        {"data": "tipo", "title": "Tipo de Inversion"},
                        {"data": "sigla", "title": "Unidad Prestadora de Servicio"},
                        {
                            "data": "cod_estado_registro", "title": "Proceso actual / Estado del proceso", "sType": "html", "mRender": function (data, type, full)
                            {
                                var str = '';
                                switch (full.cod_estado_registro) {
                                    case Web.SIGPI.Parametro.EnElaboracion:
                                        str = '<label class="badge badge-info">' + full.estado_registro + '</label>';
                                        break;
                                    case Web.SIGPI.Parametro.PendienteRevision:
                                        str = '<label class="badge badge-warning">' + full.estado_registro + '</label>';
                                        break;
                                    case Web.SIGPI.Parametro.Aprobado:
                                        str = '<label class="badge badge-success">' + full.estado_registro + '</label>';
                                        break;
                                    case Web.SIGPI.Parametro.ObservadoRechazado:
                                        str = '<label class="badge badge-danger">' + full.estado_registro + '</label>';
                                        break;
                                    case Web.SIGPI.Parametro.SinRegistros:
                                        str = '<label class="badge badge-info">' + full.estado_registro + '</label>';
                                        break;
                                }
                                return ('<label>'+full.proceso_actual+'</label><br>' + str);

                            }
                        },
                        {"data": "feccreacio", "title": "Fecha Creación"},
                        {
                            "data": "aprobacionPMI", "title": "PMI Institucional", "sType": "html", "mRender": function (data, type, full)
                            {
                                if (full.cod_proceso_actual == Web.SIGPI.Parametro.PMI_Institucional  &&
                                    full.aprobacionPMI == Web.SIGPI.Parametro.SinRevisionPMI ) {
                                    return '<div class="control-radio" style="TEXT-ALIGN: initial !important;">' +
                                            '<label>' +
                                            '<input type="radio" value="' + Web.SIGPI.Parametro.AprobadoPMI + '" data-id="' + full.id + '" data-tipo="' + full.tipo + '" name="chkAprobacionPMI" />' +
                                            'Aprobado<span class="checkmark"></span>' +
                                            '</label>' +
                                            '</div>' +
                                            '<div class="control-radio" style="TEXT-ALIGN: initial !important;">' +
                                            '<label>' +
                                            '<input type="radio" value="' + Web.SIGPI.Parametro.DesaprobadoPMI + '" data-id="' + full.id + '" data-tipo="' + full.tipo + '" name="chkAprobacionPMI" ' + (full.aprobacionPMI == 1 ? "checked" : "") + ' />' +
                                            'Desaprobado<span class="checkmark"></span>' +
                                            '</label>' +
                                            '</div>';
                                } else if (full.aprobacionPMI == Web.SIGPI.Parametro.DesaprobadoPMI) {
                                    return '<label class="badge badge-danger">Desaprobado</label>';
                                } else if (full.aprobacionPMI == Web.SIGPI.Parametro.AprobadoPMI) {
                                    return '<label class="badge badge-success">Aprobado</label>';
                                }else {
                                    return '<label class="badge badge-info">Pendiente de Revisión MEF</label>';
                                }
                            }
                        },
                        {
                            "data": "idpip_ioarr", "title": "Acción", "sType": "html", "mRender": function (data, type, full)
                            {
                                return (full.tipo == 'PIP' ? '<a data-toggle="tooltip" data-placement="top" title="Ver Seguimiento" href="./seguimientoPIP?id=' : 
                                                            '<a data-toggle="tooltip" data-placement="top" title="Ver Seguimiento" href="./seguimientoIOARR?id=') + 
                                        full.id + '"><span class="fas fa-chart-line" data-id="' + full.id + '"></span></a>'
                            }
                        }
                    ],
                    'fnDrawCallback': function () {  validarPermiso();
                        $('thead tr th.sorting_asc').removeClass('sorting_asc');
                        $('table .fas').closest('td').addClass('accion');
                        $('table').removeClass('dataTable');
                        $('[data-toggle="tooltip"]').tooltip(); 

                    }
                });
            }
        };

    };
} catch (ex) {
    alert(ex.message);
}


