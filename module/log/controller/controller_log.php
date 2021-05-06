<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/jquery_php/module/log/model/DAOlog.php");
    session_start();
    switch($_GET['op']){
        case 'login';
            try{
                $daolog = new DAOLog();
                $user = $_POST['user'];
                $pass = $_POST['pass'];
            	$rdo = $daolog->login($user, $pass);

            }catch (Exception $e){
                echo json_encode("error " + $e);
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $user=get_object_vars($rdo);
                echo json_encode($user);
                //echo json_encode("error");
                exit;
            }
            break;
        
        case 'register';
            try{
                $daolog = new DAOLog();
                $search = base64_decode($_GET['exists']);
            	$rdo = $daolog->exists_search($search);

            }catch (Exception $e){
                echo json_encode("error " + $e);
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $user=get_object_vars($rdo);
                echo json_encode($product);
                //echo json_encode("error");
                exit;
            }
            break;

        default;
            include("view/inc/error404.php");
            break;
    }