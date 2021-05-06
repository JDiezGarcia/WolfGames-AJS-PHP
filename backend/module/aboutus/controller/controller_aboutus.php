<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/jquery_php/module/aboutus/model/DAOaboutus.php");
    //include($path . "module/user/model/DAOhome.php");
    session_start();
    switch($_GET['op']){
        case 'maps';
            try{
                $daoaboutus = new DAOAboutus();
            	$rdo = $daoaboutus->geomap_shops();

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