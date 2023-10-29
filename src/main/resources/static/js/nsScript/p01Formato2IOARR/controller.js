try {
    ns('SIGPI.p01Formato2IOARR.Index.Controller');
    SIGPI.p01Formato2IOARR.Index.Controller = function () {
        var base = this;
        base.Ini = function () {
            'use strict';
            $('[data-toggle="tooltip"]').tooltip();

            base.Control.tblTipoInverionB1().on('click', 'tbody td span#openModalB2B4', function () {
                base.Event.openModal();
            });

            base.Control.tblTipoInverionB1().on('click', 'tbody td span#saverow', function () {
                if (!base.Function.validarDuplicidadTipoInversionSeccionB(this)) {
                    base.Function.addrow(this);
                } else {
                    BootstrapDialog.alert('El Tipo de Inversion seleccionado ya existe!');
                }
            });

            base.Control.btnMayorUIT().on('click', function () {
                base.Function.seleccionarUIT(1);
            });
            base.Control.btnMenorUIT().on('click', function () {
                base.Function.seleccionarUIT(0);
            })

            base.Control.btnAdjuntar().on('click', function () {
                base.Function.abrirModal(base.Control.mdlAdjuntar());
            });
            base.Control.btnObservar().on('click', function () {
                base.Function.abrirModal(base.Control.mdlObservar());
            });

        };

        base.Parametros = {
        };

        base.Control = {
            tblTipoInverionB1: function () {
                return $('#tblTipoInverionB1');
            },
            modalDatosB2B4: function () {
                return $('#mdlDatosB2B4');
            },
            titlemdlDatosB2B4: function () {
                return $('#titlemdlDatosB2B4');
            },
            btnAdjuntar: function () {
                return $('#btnAdjuntar');
            },
            btnObservar: function () {
                return $('#btnObservar');
            },
            accordion: function () {
                return $('#accordion');
            },
            seccionA: function () {
                return $('#seccionA');
            },
            seccionB: function () {
                return $('#seccionB');
            },
            seccionC: function () {
                return $('#seccionC');
            },
            seccionD: function () {
                return $('#seccionD');
            },
            seccionE: function () {
                return $('#seccionE');
            },
            btnMayorUIT: function () {
                return $('#btnMayorUIT');
            },
            btnMenorUIT: function () {
                return $('#btnMenorUIT');
            },
            mdlAdjuntar: function () {
                return $('#mdlAdjuntar');
            },
            mdlObservar: function () {
                return $('#mdlObservar');
            }
        };

        base.Event = {
            openModal: function () {
                base.Control.modalDatosB2B4().modal('show');

            }
        };
        base.Ajax = {
        };
        base.Function = {
            
           abrirModal: function(obj){
                $(obj).modal('show');
           },
           seleccionarUIT: function (uit) {
            if(uit > 0){//mayor
                base.Control.btnMenorUIT().removeClass('btn-success');
                base.Control.btnMenorUIT().addClass('btn-default');
                base.Control.btnMayorUIT().removeClass('btn-default');
                base.Control.btnMayorUIT().addClass('btn-success');

                base.Control.seccionB().parent().removeClass('hide');
                base.Control.seccionC().parent().removeClass('hide');
                base.Control.seccionD().parent().removeClass('hide');
                base.Control.seccionE().parent().addClass('hide');

            }else {//menor
                base.Control.btnMayorUIT().removeClass('btn-success');
                base.Control.btnMayorUIT().addClass('btn-default');
                base.Control.btnMenorUIT().removeClass('btn-default');
                base.Control.btnMenorUIT().addClass('btn-success');

                base.Control.seccionB().parent().addClass('hide');
                base.Control.seccionC().parent().addClass('hide');
                base.Control.seccionD().parent().addClass('hide');
                base.Control.seccionE().parent().removeClass('hide');

            }
           },

           addrow: function (obj) {
           		$(obj).tooltip('destroy');
				$(obj).tooltip();

				var rowclone = $('#tblTipoInverionB1 tbody tr[data-clone=1]').clone(true);
				//var rowclone = $(base.Control.tblTipoInverionB1(),'tbody tr[data-clone=1]').clone(true);

				$(obj).parent().parent().attr('data-clone', '0');
				//$(obj).addClass('d-none');
				
				$(obj).parent().find('span#openModalB2B4').removeClass('d-none');
				$(obj).parent().find('.glyphicon-remove').removeClass('d-none');

				$('#tblTipoInverionB1 tbody').append(function(){
                    $(rowclone).find('span').tooltip();
					return rowclone;
				})
                //obtenemos el Tipo de IOARR
                base.Function.HabilitarPanelTipoInversionSeccionC(obj);
           },
           HabilitarPanelTipoInversionSeccionC: function(obj) {
                var tipoIOARR= $(obj).parent().parent().find('select').eq(0).val();

                switch(tipoIOARR){
                    case "1" : $('#seccionC1').parent().removeClass('hide'); break;
                    case "2" : $('#seccionC2').parent().removeClass('hide'); break;
                    case "3" : $('#seccionC3').parent().removeClass('hide'); break;
                    case "4" : $('#seccionC4').parent().removeClass('hide'); break;

                } 
           },

           validarDuplicidadTipoInversionSeccionB: function(obj){
                var tipoIOARR= $(obj).parent().parent().find('select[name=tipoInversion]').val();
                var existe = false;
                $.each($('tbody tr[data-clone=0] select[name=tipoInversion]', base.Control.tblTipoInverionB1()), function(i, item){

                    if(tipoIOARR == $(item).val()){
                        existe = true;//duplicado
                    }

                });
                 
                 return existe;//no duplicado
           }   
        };
    };
} catch (ex) {
    alert(ex.message);
}



