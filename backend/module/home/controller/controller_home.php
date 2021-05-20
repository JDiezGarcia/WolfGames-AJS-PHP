<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/angularjs_php/backend/module/home/model/DAOhome.php");
    //include($path . "module/user/model/DAOhome.php");
    session_start();
    switch($_GET['op']){
        case 'carousel';
            try{
                $daohome = new DAOHome();
            	$rdo = $daohome->select_all_games($_GET['offset']);
            }catch (Exception $e){
                echo json_encode("error " + $e);
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                echo json_encode($rdo);
                //echo json_encode("error");
                exit;
            }
            break;
            
        case 'platformsImg';
        try{
            $daohome = new DAOHome();
            $rdo = $daohome->select_all_platforms();

        }catch (Exception $e){
            echo json_encode("error " + $e);
            exit;
        }
        if(!$rdo){
            echo json_encode("error");
            exit;
        }else{
            echo json_encode($rdo);
            //echo json_encode("error");
            exit;
        }
        break;
        
        default;
            include("/jquery_php/view/inc/error404.php");
            break;
    }