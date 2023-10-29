/// <summary>
/// Script de Controladora de la Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('COBRA.Cliente.Index.Controller');
    COBRA.Cliente.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';
            base.Function.cargarBandeja();
            
            
        };

        base.Parametros = {
            
        };

        base.Control = {
            tblCliente: function () {
                return $('#tblCliente');
            }
        };

        base.Event = {
            
        	            
        };
        base.Ajax = {

        };
        base.Function = {
           cargarBandeja: function () {
               
                base.Control.tblCliente().DataTable({
                    "bFilter": false,
                    bDestroy: true,
                    "ordering": false,
                    "cache": false,
                    "bProcessing": false,
                    "bPaginate": true,
                    "ajax": function (request, callback, settings) {
                        console.log(this.fnPagingInfo());
                        $.ajax({
                            "url": urlApiCobranza('cliente'),
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
                        {"data": "ruc", "title": "RUC"},
                        {"data": "razonsocial", "title": "Razon Social"},
                        {
                            "data": "nombres", "title": "Cliente", "sType": "html", "mRender": function (data, type, full)
                            {
                                return full.nombres + ''+ full.apellidos;
                            }
                        },
                        {"data": "iddepartamento", "title": "Departamento"},
                        {"data": "idprovincia", "title": "Provincia"},
                        {"data": "iddistrito", "title": "Distrito"},
                        {"data": "direccion", "title": "Dirección"},
                        {"data": "cobrador", "title": "Cobrador"},
                        {
                            "data": "idintegrante", "title": "Acción", "sType": "html", "mRender": function (data, type, full)
                            {
                                var cad = '<td class="accion">'
                                +'<a id="btnEditar"  title="Editar Cliente"><i class="fas fa-edit"></i></a>'
                                +'<a title="Ver Detalle"  href="/cliente/detalleCliente/'+full.uuid+'"><i class="fas fa-newspaper"></i></a>'
                                +'<a title="Asignar Cobrador" data-toggle="modal" data-target="#mdlAsignar"><i class="fas fa-user"></i></a>'
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


