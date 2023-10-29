/// <summary>
/// Script de Controladora de la Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('SIGPI.parametroValor.Index.Controller');
    SIGPI.parametroValor.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';
            
            base.Event.loadParametroValor();
            base.Control.btnAgregar().on('click', base.Event.clickbtnAgregar);
            base.Control.btnGuardar().on('click', base.Event.clickbtnGuardar);
            base.Control.cboParametro().on('change', base.Event.changeCboParametro);
            base.Control.tblParametroValor().on('click', 'input[type=checkbox]', function(){
                base.Event.clickEstado($(this).is(':checked'), $(this).attr('data-id'));
            });
            base.Control.tblParametroValor().on('click', '.fa-edit', function(){
                base.Event.clickbtnEditar($(this));
            });
        };
        base.Control = {
            cboParametro: function () {
                return $('#cboParametro');
            },
            btnAgregar: function () {
                return $('#btnAgregar');
            },
            btnGuardar: function () {
                return $('#btnGuardar');
            },
            tblParametroValor: function () {
                return $('#tblParametroValor');
            },
            mdlParametroValor: function () {
                return $('#mdlParametroValor');
            },
            lblParametro: function () {
                return $('#lblParametro');
            },
            txtParametroValor: function () {
                return $('input[name=txtParametroValor]');
            },
            hdnIdParametroValor: function () {
                return $('#hdnIdParametroValor');
            }
        };
         base.Parametros = {
            nuevoParametro: 'NUEVO VALOR PARAMETRO',
            editarParametro: 'EDITAR VALOR PARAMETRO',
        };
        base.Event = {
            changeCboParametro: function(){
                var item = {
                    idparame: base.Control.cboParametro().val()
                };
                base.Ajax.ajaxListParametroValor(item);
            },
            loadParametroValor: function () {

                var item = {
                    idparame: base.Control.cboParametro().val()
                };
                base.Ajax.ajaxListParametroValor(item);
            },
            clickEstado: function (estado, id) {
                 var item = {    idparamval: id,
                    estado: estado
                
                };
                base.Ajax.ajaxDelete(item);
            },
            clickbtnAgregar: function () {
                base.Control.mdlParametroValor().modal('show');
                $('.modal-title').text(base.Parametros.nuevoParametro);
                base.Control.lblParametro().text($("option:selected",base.Control.cboParametro()).text());
                base.Control.hdnIdParametroValor().val(0);
                base.Control.txtParametroValor().val('');
                
            },
             clickbtnEditar: function (obj) {
                base.Control.mdlParametroValor().modal('show');
                $('.modal-title').text(base.Parametros.editarParametro);
                base.Control.lblParametro().text($(obj).closest('tr').find('td:eq(1)').text())
                base.Control.txtParametroValor().val($(obj).closest('tr').find('td:eq(2)').text());
                base.Control.hdnIdParametroValor().val($(obj).attr('data-id'));
            },
            clickbtnGuardar: function () {
                BootstrapDialog.confirm(Web.SIGPI.MensajeSistema.TituloMensajeConfirmacion, Web.SIGPI.MensajeSistema.Confirmacion, function (result) {
                    if (result) {
                        var item = {
                            idparame: base.Control.cboParametro().val(),
                            idparamval: base.Control.hdnIdParametroValor().val(),
                            valor: base.Control.txtParametroValor().val()
                        };
                        base.Ajax.ajaxGuardar(item);
                    }
                });
            }
            
        };
        base.Ajax = {
            ajaxListParametroValor: function (item) {
                $.ajax({
                    url: 'listParametroValor',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(item),
                    success: function (response) {
                        console.log(response);
                        var data = {
                            data: response.data
                        };
                        base.Function.cargarTablaParametroValor(data);
                    }
                });
            },
            ajaxDelete: function (item) {
                $.ajax({
                    "url": 'deleteParametroValor',
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
             ajaxGuardar: function (item) {
                $.ajax({
                    "url": 'addParametroValor',
                    "type": 'POST',
                    contentType: "application/json",
                    "dataType": 'json',
                    "data": JSON.stringify(item),
                    success: function (data) {
                        console.log(data);
                        alerta(data.type, data.message);
                        base.Event.loadParametroValor();
                        base.Control.mdlParametroValor().modal('hide');
                    }
                });
            }
        };
        base.Function = {
            
            
            cargarTablaParametroValor: function (data) {

                base.Control.tblParametroValor().DataTable({
                    paging: true,
                    searching: false,
                    "cache": false,
                    destroy: true,
                    ordering: false,
                    "ajax": function (request, callback, settings) {
                        callback(data);
                    },
                    "columns": [
                        {"data": "idparamval", "title": "Codigo"},
                        {"data": "nomParam", "title": "Parametro"},
                        {"data": "valor", "title": "Valor del Parametro"},
                        {
                            "data": "idparamval", "title": "Estado", "sType": "html", "mRender": function (data, type, full)
                            {
                                return '<label class="switch"><input type="checkbox" data-id="' + full.idparamval + '"  '+(full.estado==true? "checked": "")+'><span class="slider round"></span></label>'
                            }
                        },
                        {
                            "data": "idparamval", "title": "Acción", "sType": "html", "mRender": function (data, type, full)
                            {
                                return '<div data-toggle="tooltip" data-placement="top"  title="Editar"><span class="fas fa-edit" data-id="' + full.idparamval + '"></span></div>'
                                
                            }
                        }
                        
                    ],
                    'fnDrawCallback': function () {  validarPermiso();
                        $('table .fas').parent().addClass('accion');
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


