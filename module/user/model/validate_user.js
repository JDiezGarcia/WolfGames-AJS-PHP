function validate_usuario(texto){
    if (texto.length > 0){
        var reg=/^[a-zA-Z]*$/;
        return reg.test(texto);
    }
    return false;
}

function validate_password(texto){
    if (texto.length > 0){
        var reg = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        return reg.test(texto);
    }
    return false;
}

function validate_email(texto){
    if (texto.length > 0){
        var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;
        return reg.test(texto);
    }
    return false;
}

function validate_nombre(texto){
    if (texto.length > 0){
        var reg=/^[a-zA-Z]*$/;
        return reg.test(texto);
    }
    return false;
}


function validate_select(texto){
    var i;
    var ok=0;
    for(i=0; i<texto.length;i++){
        if(texto[i].checked){
            ok=1
        }
    }
 
    if(ok==1){
        return true;
    }
    if(ok==0){
        return false;
    }
}

function validate_text(texto){
    if (texto.length > 0){
        return true;
    }
    return false;
}


function validate(){

    var v_usuario=document.getElementById('usuario').value;
    var v_email=document.getElementById('email').value;
    var v_password=document.getElementById('pass').value;
    var v_nombre=document.getElementById('nombre').value;
    var v_dir=document.getElementById('dir').value;
    var v_postcode=document.getElementById('postcode').value;
    var v_city=document.getElementById('city').value;
    var v_sexo=document.getElementsByName('sexo');
    var v_fecha_nacimiento=document.getElementById('fecha').value;

    var r_usuario=validate_usuario(v_usuario);
    var r_email=validate_email(v_email);
    var r_password=validate_password(v_password);
    var r_nombre=validate_nombre(v_nombre);
    var r_dir=validate_text(v_dir);
    var r_postcode=validate_text(v_postcode);
    var r_city=validate_text(v_city);
    var r_sexo=validate_select(v_sexo);
    var r_fecha_nacimiento=validate_text(v_fecha_nacimiento);
    
    if(!r_usuario){
        document.getElementById('error_usuario').innerHTML = " * El usuario introducido no es valido";
        return 0;
    }
    document.getElementById('error_usuario').innerHTML = "";

    if(!r_email){
        document.getElementById('error_email').innerHTML = " * El email introducido no es valido";
        return 0;
    }
    document.getElementById('error_email').innerHTML = "";

    if(!r_password){
        document.getElementById('error_pass').innerHTML = " * La contraseña introducida no es valida";
        return 0;
    }
    document.getElementById('error_pass').innerHTML = "";

    if(!r_nombre){
        document.getElementById('error_nombre').innerHTML = " * El nombre introducido no es valido";
        return 0;;
    }
    document.getElementById('error_nombre').innerHTML = "";

    if(!r_dir){
        document.getElementById('error_dir').innerHTML = " * La direccion introducida no es valida";
        return 0;
    }
    document.getElementById('error_dir').innerHTML = "";

    if(!r_postcode){
        document.getElementById('error_postcode').innerHTML = " * El codigo postal introducido no es valido";
        return 0;
    }
    document.getElementById('error_postcode').innerHTML = "";

    if(!r_city){
        document.getElementById('error_city').innerHTML = " * La ciudad introducida no es valida";
        return 0;
    }
    document.getElementById('error_city').innerHTML = "";



    if(!r_sexo){
        document.getElementById('error_sexo').innerHTML = " * No has seleccionado ningun genero";
        return 0;
    }
    document.getElementById('error_sexo').innerHTML = "";

    if(!r_fecha_nacimiento){
        document.getElementById('error_fecha_nacimiento').innerHTML = " * No has introducido ninguna fecha";
        return 0;
    }
    document.getElementById('error_fecha_nacimiento').innerHTML = "";

    return 1;

}

function validate_create() {

    if (validate() == 1){
    document.alta_user.submit();
    document.alta_user.action="index.php?page=controller_user&op=create";
    }
    
}

function validate_update() {

    if (validate() == 1){
    document.update_user.submit();
    document.update_user.action="index.php?page=controller_user&op=update";
    }
    
}