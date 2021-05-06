<?php
function validate_usuario($texto){
    $reg = "/^[a-zA-Z]*$/";
    return preg_match($reg, $texto);
}

function validate_password($texto){
    $reg = "/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/";
    return preg_match($reg, $texto);
}

function validate_nombre($texto){
    $reg = "/^[a-zA-Z]*$/";
    return preg_match($reg, $texto);
}

function validate_email($texto){
    $reg = "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/";
    return preg_match($reg, $texto);
}

function validate_select($texto){
    if (!isset($texto) || empty($texto)) {
        return false;
    } else {
        return true;
    }
}

function validate_text($texto){
    if (empty($texto)) {
        return false;
    } else {
        return true;
    }
}

function validate(){
    $check = true;

    $v_usuario = $_POST['usuario'];
    $v_email = $_POST['email'];
    $v_password = $_POST['pass'];
    $v_nombre = $_POST['nombre'];
    $v_dir = $_POST['dir'];
    $v_postcode = $_POST['postcode'];
    $v_city = $_POST['city'];
    $v_country = $_POST['pais'];
    $v_sexo = $_POST['sexo'];
    $v_fecha_nacimiento = $_POST['fecha_nacimiento'];

    $r_usuario = validate_usuario($v_usuario);
    $r_email = validate_email($v_email);
    $r_password = validate_password($v_password);
    $r_nombre = validate_nombre($v_nombre);
    $r_dir = validate_text($v_dir);
    $r_postcode = validate_text($v_postcode);
    $r_city = validate_text($v_city);
    $r_country = validate_text($v_country);
    $r_sexo = validate_select($v_sexo);
    $r_fecha_nacimiento = validate_text($v_fecha_nacimiento);

    if (!$r_usuario) {
        
        $error_usuario = " * El usuario introducido no es valido";
        $check = false;
    } else {
        $error_usuario = "";
    }

    if (!$r_email) {
        $error_email = " * El email introducido no es valido";
        $check = false;
    } else {
        $error_email = "";
    }

    if (!$r_password) {
        $error_pass = " * La contraseña introducida no es valida";
        $check = false;
    } else {
        $error_pass = "";
    }

    if (!$r_nombre) {
        $error_nombre = " * El nombre introducido no es valido";
        $check = false;
    } else {
        $error_nombre = "";
    }

    if (!$r_dir) {
        $error_dir = " * No has introducido ninguna direccion";
        $check = false;
    } else {
        $error_dir = "";
    }

    if (!$r_country) {
        $error_pais = " * No has introducido ningun pais";
        $check = false;
    } else {
        $error_pais = "";
    }

    if (!$r_postcode) {
        
        $error_postcode = " * No has introducido ningun codigo postal";
        $check = false;
    } else {
        $error_postcode = "";
    }

    if (!$r_city) {
        $error_city = " * No has introducido ninguna ciudad";
        $check = false;
    } else {
        $error_city = "";
    }

    if (!$r_sexo) {
        $error_sexo = " * No has seleccionado ningun genero";
        $check = false;
    } else {
        $error_sexo = "";
    }

    if (!$r_fecha_nacimiento) {
        $error_fecha_nacimiento = " * No has introducido ninguna fecha";
        $check = false;
    } else {
        $error_fecha_nacimiento = "";
    }

    return $check;
}