/// <summary>
/// Script de Controladora de la Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('COBRA.detalleCliente.Index.Controller');
    COBRA.detalleCliente.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';
            base.Ajax.cargarDatosCliente();
            //base.Ajax.cargarDatosPagos();
        };

        base.Parametros = {
            
        };

        base.Control = {
            lblCuenta: function () { return $('[name=lblCuenta]');},
            lblRUC: function () { return $('[name=lblRUC]');},
            lblRazonsocial: function () { return $('[name=lblRazonsocial]');},
            lblRepresentante: function () { return $('[name=lblRepresentante]');},
            lblDpto: function () { return $('[name=lblDpto');},
            lblProv: function () { return $('[name=lblProv');},
            lblDist: function () { return $('[name=lblDist');},
            lblDireccion: function () { return $('[name=lblDireccion');},
            tblFactura: function () { return $('#tblFactura');},
            tblCobrador: function () { return $('#tblCobrador');},
            tblPagos: function () { return $('#tblPagos');}
        };

        base.Event = {
            
        	            
        };
        base.Ajax = {
            cargarDatosCliente: function () {
                $.ajax({
                    url: urlApiCobranza('cliente/uuid/d6e85e0e-6594-11ee-bec2-3024a97de4c9'),
                    "type": 'GET',
                    success: function (data) {
                        console.log(data);
                        base.Function.mostrarDatosCliente(data);
                        base.Function.cargarDatosCobrador(data.cobrador);
                        base.Function.cargarDatosFactura(data.facturas);
                        base.Function.cargarDatosPagos(data.pagos);
                    }
                });
            }
        };
        base.Function = {
            mostrarDatosCliente: function (data) {
                base.Control.lblRUC().text(data.ruc);
                base.Control.lblRazonsocial().text(data.razonsocial);
                base.Control.lblCuenta().text(data.cuenta);
                base.Control.lblRepresentante().text(data.nombres+' '+data.apellidos);
                base.Control.lblDireccion().text(data.direccion);
            },
           cargarDatosCobrador: function (data) {
               var arrayData = new Array();
               arrayData.push(data);
                base.Control.tblCobrador().DataTable({
                    "bFilter": false,
                    bDestroy: true,
                    "ordering": false,
                    "cache": false,
                    "bProcessing": false,
                    "bPaginate": true,
                    'data': arrayData,
                    "columns": [
                        {"data": "codigo", "title": "Codigo"},
                        {"data": "apellidos", "title": "Apellidos"},
                        {"data": "dni", "title": "DNI"},
                        {"data": "feccreacio", "title": "F. Asignación"},
                        {
                            "data": "uuid", "title": "Acción", "sType": "html", "mRender": function (data, type, full)
                            {
                                var cad = '<td class="accion">'
                                +'<a id="btnEliminar"  title="Eliminar Cobrador"><i class="fas fa-trash"></i></a>'
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
            },
           cargarDatosFactura: function (data) {
               
                base.Control.tblFactura().DataTable({
                    "bFilter": true,
                    bDestroy: true,
                    "ordering": false,
                    "cache": false,
                    "bProcessing": false,
                    "bPaginate": true,
                    'data': data,
                    "columns": [
                        {"data": "numerofac", "title": "Nro Factura"},
                        {"data": "fechacre", "title": "Fecha Creacion"},
                        {"data": "fechavenc", "title": "Fecha Venc."},
                        {
                            "data": "total", "title": "Total", "sType": "html", "mRender": function (data, type, full)
                            {
                                return '<label class="number">'+full.total+'</label>';
                            }
                        },
                        {
                            "data": "saldo", "title": "Saldo", "sType": "html", "mRender": function (data, type, full)
                            {
                                return '<label class="number">'+full.saldo+'</label>';
                            }
                        },
                        {"data": "demora", "title": "Demora"},
                        {
                            "data": "estatus", "title": "Estatus", "sType": "html", "mRender": function (data, type, full)
                            {
                                var cad = '';
                                if(full.estatus === 'Vencido'){
                                    cad = '<span class="badge badge-danger">Vencido</span>';
                                }else if (full.estatus === 'Por Vencer'){
                                    cad = '<span class="badge badge-warning">Por Vencer</span>';
                                }else{
                                    cad = '<span class="badge badge-success">Pagado</span>';
                                }
                    
                                return cad;
                            }
                        },
                        {
                            "data": "uuidFactura", "title": "Acción", "sType": "html", "mRender": function (data, type, full)
                            {
                                var cad = '<a title="Editar" name="btnEditar" data-uuid="'+full.uuidFactura+'"><i class="fas fa-edit"></i></a>';                    
                                return cad;
                            }
                        }
                    ],
                    'fnDrawCallback': function () {
                        $('.number').number(true,2);
                        $('.number').parent().addClass('text-right');
                        $('table .fas').closest('td').addClass('accion');
                    }
                });
            },
           cargarDatosPagos: function (data) {
               
                base.Control.tblPagos().DataTable({
                    "bFilter": true,
                    bDestroy: true,
                    "ordering": false,
                    "cache": false,
                    "bProcessing": false,
                    "bPaginate": true,
                    'data': data,
                    "columns": [
                       {"data": "fechacre", "title": "Fecha Cobranza"}, 
                       {"data": "codcobrador", "title": "Cod. Cobrador"},
                        {"data": "numerofac", "title": "N° Factura"},
                        {
                            "data": "totalpago", "title": "Monto Pago", "sType": "html", "mRender": function (data, type, full)
                            {
                                return '<label class="number">'+full.totalpago+'</label>';
                            }
                        },
                        {"data": "formapago", "title": "Forma Pago"},
                        {"data": "banco", "title": "Banco"},
                        {"data": "numoperacion", "title": "N° Operación"},
                        {"data": "observacion", "title": "Observación"},
                        {
                            "data": "uuidpago", "title": "Acción", "sType": "html", "mRender": function (data, type, full)
                            {
                                var cad = '<a title="Editar" name="btnEditar" data-uuid="'+full.uuidpago+'"><i class="fas fa-edit"></i></a>';                    
                                return cad;
                            }
                        }
                    ],
                    'fnDrawCallback': function () {
                        $('.number').number(true,2);
                        $('.number').parent().addClass('text-right');
                        $('table .fas').closest('td').addClass('accion');
                    }
                });
            }
        };
           
    };
} catch (ex) {
    alert(ex.message);
}


