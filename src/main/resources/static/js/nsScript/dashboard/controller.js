/// <summary>
/// Script de Controladora de la Vista 
/// </summary>
/// <remarks>
/// </remarks>
try {
    ns('COBRA.dashboard.Index.Controller');
    COBRA.dashboard.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';
            base.Event.loadSemanas();
            base.Event.loadDatosPorSemana();
            base.Control.cboSemana().on('change', base.Event.loadDatosPorSemana);
            base.Control.btnRefresh().on('click', base.Event.loadDatosPorSemana);
        };

        base.Parametros = {
            fechainicio: '',
            fechafin: ''
        };

        base.Control = {
            tblDeudaSemana: function(){
              return $('#tblDeudaSemana');
            },
            lblDeudaTotal: function(){ return $('[name="lblDeudaTotal"]');},
            lblDeudaSaldo: function(){ return $('[name="lblDeudaSaldo"]');},
            lblPagoTotal: function(){ return $('[name="lblPagoTotal"]');},
            lblVariacion: function(){ return $('[name="lblVariacion"]');},
            btnRefresh:function(){ return $('#btnRefresh');},
            cboSemana: function () {
                return $('#cboSemana');
            },
            lblDeudaVencida: function () {
                return $('[name=lblDeudaVencida]');
            },
            lblSemanaVencida: function () {
                return $('[name=lblSemanaVencida]');
            },
            lblPorcDeuda: function () {
                return $('[name=lblPorcDeuda]');
            },
            lblPagoSemana: function () {
                return $('[name=lblPagoSemana]');
            },
            lblPorcReducDeuda: function () {
                return $('[name=lblPorcReducDeuda]');
            }
        };

        base.Event = {
            loadSemanas: function(){
                base.Ajax.getListaSemanas();
            },
            loadDatosPorSemana: function () {
                var fechaini = base.Control.cboSemana().val().split(' AL ')[0];
                var fechafin = base.Control.cboSemana().val().split(' AL ')[1];
                base.Parametros.fechainicio = fechaini;
                base.Parametros.fechafin = fechafin;
                base.Ajax.getDatos(fechaini);
            }
        	            
        };
        base.Ajax = {
            getDatos: function (semana) {
                $.ajax({
                    "url": urlApiCobranza('dashboard/consulta/'+semana),
                    "type": 'GET',
                    async: false,
                    success: function (res) {
                        if(res.success){
                            base.Function.mostrarDatosEncabezado(res.data.encabezado);
                            base.Function.mostrarDatosDetalle(res.data.detalleDeudaSemana);
                        }else{
                            alerta(res.type, res.message)
                        }
                        
                    }
                });
            },
            getListaSemanas: function () {
                $.ajax({
                    "url": urlApiCobranza('dashboard/listaSemana'),
                    "type": 'GET',
                    async: false,
                    success: function (res) {
                        base.Function.mostrarListaSemana(res.data);
                    }
                });
            }
            
        };
        base.Function = {
           setNumberDecimal: function(){
               $('.number').number(true,2);
           },
           mostrarListaSemana:function(data){
               var x = document.getElementById("cboSemana");
               $.each(data, function(i, obj){
                    var option = document.createElement("option");
                    option.text = obj;
                    option.value = obj;
                    x.add(option);
               });
           },
           mostrarDatosEncabezado: function(data){
                    base.Control.lblDeudaVencida().text(data.deudaVencida);
                    base.Control.lblSemanaVencida().text(data.deudaSemana);
                    base.Control.lblPorcDeuda().text(data.porcDeuda);
                    base.Control.lblPagoSemana().text(data.pagoSemana);
                    base.Control.lblPorcReducDeuda().text(data.porcDeudaReducido);
                    
                    base.Function.setNumberDecimal();
               },
           mostrarDatosDetalle: function(data){
               base.Control.tblDeudaSemana().DataTable({
                    "bFilter": false,
                    bDestroy: true,
                    "ordering": false,
                    "cache": false,
                    "bProcessing": false,
                    "bPaginate": false,
                    'data': data,
                    "columns": [
                        {
                            "data": "fecha", "title": "Vencido", "sType": "html", "mRender": function (data, type, full)
                            {
                                return '<label class="fecha">'+full.fecha+'</label>';
                            }
                        },
                        {
                            "data": "deuda", "title": base.Parametros.fechainicio, "sType": "html", "mRender": function (data, type, full)
                            {
                                return '<label class="number">'+full.deudaTotal+'</label>';
                            }
                        },
                        {
                            "data": "deudaSaldo", "title": base.Parametros.fechafin, "sType": "html", "mRender": function (data, type, full)
                            {
                                return '<label class="number">'+full.deudaSaldo+'</label>';
                            }
                        },{
                            "data": "pagoTotal", "title": "Gestión de Cobro", "sType": "html", "mRender": function (data, type, full)
                            {
                                return '<label class="number">'+full.pagoTotal+'</label>';
                            }
                        },
                        {
                            "data": "variacion", "title": "VAR %", "sType": "html", "mRender": function (data, type, full)
                            {
                                return '<label class="number">'+full.variacion+'</label>';
                            }
                        }
                        
                    ],
                    'fnDrawCallback': function () {
                        $('.number').number(true,2);
                        $('.number').parent().addClass('text-right');
                        $('.fecha').parent().addClass('text-center');
                        base.Function.calcularTotalesDeudaSemana(data);
                    }
                });
           },
           calcularTotalesDeudaSemana: function(data){
               var totalDeuda=0;
               var totalDeudaSaldo=0;
               var totalPago=0;
               
               $.each(data, function(i, obj){
                   totalDeuda +=obj.deudaTotal;
                   totalDeudaSaldo +=obj.deudaSaldo;
                   totalPago += obj.pagoTotal;
               });
             base.Control.lblDeudaTotal().text(totalDeuda);  
             base.Control.lblDeudaSaldo().text(totalDeudaSaldo);  
             base.Control.lblPagoTotal().text(totalPago);  
             base.Control.lblVariacion().text(parseFloat((1-(totalDeudaSaldo/totalDeuda))*100).toFixed(2));  
             
             base.Function.setNumberDecimal();
           },
           getCostoTotalIdeas : {
               setLabel: function(data){
                   var totalCostoIOARR = 0;
                   base.Control.lblCostoPIP().text(0);
                   $.each(data, function(i, item){
                      if(i == 0){
                          base.Control.lblCostoPIP().text(parseFloat(item.costo));
                      }else{
                         totalCostoIOARR += parseFloat(item.costo);
                      }
                   });
                    base.Control.lblCostoIOARR().text(totalCostoIOARR);
                    base.Function.setNumberDecimal();
               },
               setDataArray: function(data){
                   var arrayData = new Array();
                   var arrayLabel = new Array();
                   
                   $.each(data, function(i, item){               
                       arrayData.push(parseFloat(item.costo));
                   });
                  
                   $.each(data, function(i, item){
                       arrayLabel.push(item.tipo);
                   });
                   
                   base.Function.getCostoTotalIdeas.setChartPie(arrayData, arrayLabel);
               },
               setChartPie: function(data, labels){
                   
                   var ctx = document.getElementsByClassName("chartBar");
                    var myBarChart = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                      labels: labels,
                      datasets: [{
                        label: "Costo de Inversion",
                        backgroundColor: "#4e73df",
                        hoverBackgroundColor: "#2e59d9",
                        borderColor: "#4e73df",
                        data: data
                      }]
                    },
                    options: {
                      maintainAspectRatio: false,
                      layout: {
                        padding: {
                          left: 10,
                          right: 25,
                          top: 25,
                          bottom: 0
                        }
                      },
                      scales: {
                        xAxes: [{
                         
                          gridLines: {
                            display: false,
                            drawBorder: false
                          },
                          ticks: {
                            //maxTicksLimit: 6
                            
                            beginAtZero:true,
                            callback: function(value, index, values) {
                              return 'S/ ' + number_format(value);
                            }
                          },
                          //maxBarThickness: 25,
                          
                        }],
                        yAxes: [{
                          ticks: {
                            //min: 0,
                            //max: 15000,
                            //maxTicksLimit: 10,
                            padding: 10,
                            // Include a dollar sign in the ticks
                            
                          },
                          gridLines: {
                            color: "rgb(234, 236, 244)",
                            zeroLineColor: "rgb(234, 236, 244)",
                            drawBorder: false,
                            borderDash: [2],
                            zeroLineBorderDash: [2]
                          }
                        }],
                      },
                      legend: {
                        display: false
                      },
                      tooltips: {
                        titleMarginBottom: 10,
                        titleFontColor: '#6e707e',
                        titleFontSize: 14,
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                        callbacks: {
                          label: function(tooltipItem, chart) {
                            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                            return datasetLabel + ': S/ ' + number_format(tooltipItem.xLabel);
                          }
                        }
                      }
                    }
                  });

                
                }
           },
           getCantidadTotalIdeas : {
               setLabel: function(data){
                   base.Control.lblCantPIP().text(0);
                   base.Control.lblCantIOARR().text(0);
                   $.each(data, function(i, item){
                      if(item.tipo == 'PIP'){
                          base.Control.lblCantPIP().text(item.total);
                      }else{
                          base.Control.lblCantIOARR().text(item.total);
                      }
                   });
               },
               setDataArray: function(data){
                   var arrayData = new Array();
                   var arrayLabel = new Array();
                   $.each(data, function(i, item){
                       arrayData.push(item.total);
                   });
                   $.each(data, function(i, item){
                       arrayLabel.push(item.tipo);
                   });
                   base.Function.getCantidadTotalIdeas.setChartPie(arrayData, arrayLabel);
               },
               setChartPie: function(data, labels){
                var ctx = document.getElementById("myPieChart");
                var myPieChart = new Chart(ctx, {
                  type: 'doughnut',
                  data: {
                    labels: labels,
                    datasets: [{
                      data: data,
                      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                      hoverBorderColor: "rgba(234, 236, 244, 1)",
                    }],
                  },
                  options: {
                    maintainAspectRatio: false,
                    tooltips: {
                      backgroundColor: "rgb(255,255,255)",
                      bodyFontColor: "#858796",
                      borderColor: '#dddfeb',
                      borderWidth: 1,
                      xPadding: 15,
                      yPadding: 15,
                      displayColors: false,
                      caretPadding: 10,
                    },
                    legend: {
                      display: true
                    },
                    cutoutPercentage: 80,
                  },
                });
           }
           },
           getTotalFuenteFinanciamiento: {
                setCategories: function(data){
                    var arrayCategories = new Array();
                    var arrayDataRecurso_ordinario = new Array();
                    var arrayDataDonacion_transferencia = new Array();
                    var arrayDataRecurso_direc_recaudado = new Array();
                    var arrayDataRecurso_operacion = new Array();
                    var arrayDataRecurso_determinado = new Array();
                    
                    $.each(data, function(i, obj){
                        arrayCategories.push(obj.tipo);
                        arrayDataRecurso_ordinario.push(obj.recurso_ordinario);
                        arrayDataDonacion_transferencia.push(obj.donacion_transferencia);
                        arrayDataRecurso_direc_recaudado.push(obj.recurso_direc_recaudado);
                        arrayDataRecurso_operacion.push(obj.recurso_operacion);
                        arrayDataRecurso_determinado.push(obj.recurso_determinado);
                    });
                    var objSerie = {
                        arrayDataRecurso_ordinario: arrayDataRecurso_ordinario,
                        arrayDataDonacion_transferencia: arrayDataDonacion_transferencia,
                        arrayDataRecurso_direc_recaudado: arrayDataRecurso_direc_recaudado,
                        arrayDataRecurso_operacion: arrayDataRecurso_operacion,
                        arrayDataRecurso_determinado: arrayDataRecurso_determinado
                    }
                    base.Function.getTotalFuenteFinanciamiento.setChart(arrayCategories, objSerie);
                },
                setChart: function(arrayCategories, objSerie){
                        var anio = base.Control.txtAnio().val();
                        Highcharts.chart('chartBarFuenteFinanciero', {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Costos totales de Fuentes de Financiamiento del ' + anio
                            },
                            subtitle: {
                                text: 'Fuente: Sistema de Gestion de Inversiones FAP - SIGIN'
                            },
                            xAxis: {
                                categories: arrayCategories,
                                title: {
                                    text: null
                                }
                            },
                            yAxis: {
                                crosshair: true,
                                min: 0,
                                title: {
                                    text: 'Total (soles)'
                                },
                                labels: {
                                    overflow: 'justify'
                                }
                            },
                            tooltip: {
                               pointFormat: '{series.name}: <b>S/. {point.y: .2f}</b>' 
                            },
                            plotOptions: {
                                bar: {
                                    dataLabels: {
                                        enabled: true
                                    }
                                }
                            },
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom',
                                floating: false,
                                borderWidth: 1,
                                backgroundColor:
                                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                                shadow: true
                            },
                           
                            series: [{
                                name: 'DONACION Y TRANSFERENCIA',
                                data: objSerie.arrayDataDonacion_transferencia
                            }, {
                                name: 'RECURSOS DETERMINADOS',
                                data: objSerie.arrayDataRecurso_determinado
                            }, {
                                name: 'RECURSOS DE OPERACIONES OFICIALES DE CREDITO',
                                data: objSerie.arrayDataRecurso_operacion
                            }, {
                                name: 'RECURSO ORDINARIO',
                                data: objSerie.arrayDataRecurso_ordinario
                            }, {
                                name: 'RECURSO DIRECTAMENTE RECAUDADOS',
                                data: objSerie.arrayDataRecurso_direc_recaudado
                            }]
                        });
               }
           }
        };
           
    };
} catch (ex) {
    alert(ex.message);
}


