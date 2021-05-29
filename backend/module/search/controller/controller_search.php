<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/jquery_php/module/search/model/DAOsearch.php");
    //include($path . "module/user/model/DAOhome.php");
    session_start();
    switch($_GET['op']){
        case 'search-bar';
            try{
                $daosearch = new DAOSearch();
                $query = base64_decode($_GET['query']);
            	$rdo = $daosearch->query_search($query);

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