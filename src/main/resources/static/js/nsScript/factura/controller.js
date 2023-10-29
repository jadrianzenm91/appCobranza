/// <summary>
/// Script de Controladora de la Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('COBRA.Factura.Index.Controller');
    COBRA.Factura.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';
            base.Function.cargarBandeja('2023-05-08');
            
            
        };

        base.Parametros = {
            
        };

        base.Control = {
            tblFactura: function () {
                return $('#tblFactura');
            }
        };

        base.Event = {
            
        	            
        };
        base.Ajax = {

        };
        base.Function = {
           cargarBandeja: function (semana) {
               
                base.Control.tblFactura().DataTable({
                    "bFilter": true,
                    bDestroy: true,
                    "ordering": false,
                    "cache": false,
                    "bProcessing": false,
                    "bPaginate": true,
                    "ajax": function (request, callback, settings) {
                        console.log(this.fnPagingInfo());
                        $.ajax({
                            "url": urlApiCobranza('factura/listar/'+semana),
                            "type": 'GET',
                            success: function (res) {
                                console.log(res);
                                callback({
                                    'data': res
                                });
                            }
                        });
                    },
                    "columns": [
                        {"data": "cuenta", "title": "Codigo"},
                        {"data": "razonsocial", "title": "Razon Social"},
                        {"data": "fechacre", "title": "Fecha Creacion"},
                        {"data": "numerofac", "title": "Nro Factura"},
                        {"data": "fechavenc", "title": "Fecha Venc."},
                        {"data": "total", "title": "Total"},
                        {"data": "saldo", "title": "Saldo"},
                        {"data": "demora", "title": "Demora"},
                        
                        {
                            "data": "estatus", "title": "Estatus", "sType": "html", "mRender": function (data, type, full)
                            {
                                var cad = '';
                                if(full.estatus === 'Vencido'){
                                    cad = '<span class="badge badge-danger">Vencido</span>';
                                }else{
                                    cad = '<span class="badge badge-light">Por Vencer</span>';
                                }
                                
                    
                                return cad;
                            }
                        },
                        {"data": "cobrador", "title": "Cobrador"},
                        {"data": "codcobrador", "title": "Cod. Cobrador"},
                        //class="badge badge-primary"
                        {
                            "data": "uuidFactura", "title": "Acción", "sType": "html", "mRender": function (data, type, full)
                            {
                                var cad = '<td class="accion">'
                                +'<a title="Ver Detalle"  name="btnVerDetalle" data-uuid="'+full.uuidFactura+'"><i class="fas fa-newspaper"></i></a>'
                            +'</td>';
                    
                                return cad;
                            }
                        }
                    ],
                    'fnDrawCallback': function () {
                        
                       $('table thead tr th.sorting_disabled').removeClass('sorting_asc');
                        $('table .fas').parent().parent().addClass('accion');
                    }
                });
            }
        };
           
    };
} catch (ex) {
    alert(ex.message);
}


