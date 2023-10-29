var hdnIdEstadoActual = $('#hdnIdEstadoActual').val();
var idAuthority = $('[name=hdnidperfil]').val();

function validarPermiso(){//para las tablas con SQL - AJAX
    if(Web.SIGPI.Parametro.Aprobado != undefined){
        if (hdnIdEstadoActual == Web.SIGPI.Parametro.Aprobado ||
            hdnIdEstadoActual == Web.SIGPI.Parametro.PendienteRevision)
        {
            $('.container-fluid input[type=text]').attr('disabled', 'disabled');
            $('.container-fluid select').attr('disabled', 'disabled');
            debugger
            $('table .fa-trash-alt').remove();//boton eliminar   
            $('table .fa-edit').remove();//boton editar
        }    
    }
    if(idAuthority == 2)//UNIDAD FAP
    {
        $('#tblIdeasInversiones.control-radio').remove();
    }
}
