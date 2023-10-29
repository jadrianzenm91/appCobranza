//Spring-Secutiry: token, header
        
try {
    $.xAjaxPool = [];
    $.ajaxSetup({    
        cache: false,
        beforeSend: function (xhr, jqXAjax) {
            
            if(sessionStorage.getItem("user")){
                var hdnHostname = $("input[name='hdnHostname']").val();
                var hdnIp = $("input[name='hdnIp']").val();
                 var user = JSON.parse(sessionStorage.getItem("user"));
                 xhr.setRequestHeader("idusuario", user.idusuario); 
                  xhr.setRequestHeader("token", user.token); 
                  xhr.setRequestHeader("usuario", user.usuario); 
                  xhr.setRequestHeader("uuid", user.uuid); 
                  xhr.setRequestHeader("hdnHostname", hdnHostname); 
                  xhr.setRequestHeader("hdnIp", hdnIp); 
            }
            $.xAjaxPool.push(jqXAjax);
            $('.modal-preload').removeClass('d-none');
        },
        complete: function (jqXAjax) {
            var index = $.xAjaxPool.indexOf(jqXAjax);
            if (index > -1) {
                $.xAjaxPool.splice(index, 1);
            }
            $('.modal-preload').addClass('d-none');
            if ($.xAjaxPool.length == 0) {
                $('.modal-preload').addClass('d-none');

                //elimina el drop
                /*var controls = $("input[type=text], input[type=password], textarea");
                controls.bind("drop", function () {
                    return false;
                });
                controls = undefined;*/
                //fin del drop
            }

        },
        error: function (jqXAjax) {
            var index = $.xAjaxPool.indexOf(jqXAjax);
            if (index > -1) {
                $.xAjaxPool.splice(index, 1);
            }
           $('.modal-preload').addClass('d-none');
        }
    });
} catch (e) {
}