function modalRead(){
    $('.user-read-button').click(function () {
        var id = this.getAttribute('id');
    
        $.ajax({
            url: '/jquery_php/module/user/controller/controller_user.php?op=read-modal&modal=' + id,
            type: 'POST',
            dataType: 'JSON',
        }).done(function(jsonUser) {
            $('<div></div>').attr('id', 'Div1').appendTo('#user-modal');
            $('#Div1').html(function() {
                var content = "";
                console.log(jsonUser);
                for (row in jsonUser) {
                    content += '<br><span data-tr="'+row+'"></span>: <span id="' + row + '">' + jsonUser[row] + '</span>';
                }// end_for
                //////
                console.log(content);
                return content;
                });
                //////
                $('#user-modal').dialog({
                    autoOpen: false,
                    title: 'Datos de Usuario',
                    width: 850,
                    height: 500,
                    resizable: "false",
                    modal: "true",
                    buttons: {
                        Ok: function () {
                            $(this).dialog("close");
                        }
                    },
                    show: {
                        effect: "blind",
                        duration: 1000
                    },
                    hide: {
                        effect: "explode",
                        duration: 1000
                    }
                });
                $('#user-modal').dialog('open');
                loadLang();
        }).fail(function() {
            window.location.href = 'index.php?page=error503';
        });
    });      
}


function modalDelete(){
    $('.user-delete-button').click(function () {
        var id = this.getAttribute('id');
        console.log(id);
        $("#user2").html(id);
        $('<div></div>').attr('id', 'Div1').appendTo('#user-modal');
        $('#Div1').html(function() {
        var content = "";
        content = '<br><span data-tr="message-delete"></span>: <span id="' + id + '">' + id + '</span>';
        return content;
        })
        $("#user-modal").dialog({
            autoOpen: false,
            title: 'Confirmar Eliminacion de Usuario',
            width: 850,
            height: 500,
            resizable: false,
            modal: true,
            buttons: {
                "Accept": function() {
                    $.ajax({
                        url: '/jquery_php/module/user/controller/controller_user.php?op=delete-modal&modal=' + id,
                        type: 'DELETE',
                        dataType: 'JSON',
                        success: function (json, status) {
                            if(json === 'error') {
                                window.location.href='index.php?page=503';
                            }
                        }
                    });
                    $( this ).dialog( "close" );
                    window.location.reload();
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            }
        })
        loadLang();
        $('#user-modal').dialog('open');   
    });
}


$(document).ready(function () {
    modalRead();
    modalDelete();
});