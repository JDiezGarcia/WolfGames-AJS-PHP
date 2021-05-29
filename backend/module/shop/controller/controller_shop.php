<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/angularjs_php/backend/module/shop/model/DAOshop.php");
    //include($path . "module/user/model/DAOhome.php");
    session_start();
    switch($_GET['op']){
        //PRINT PRODUCTS
        case 'products';
            try{
                $daoshop = new DAOShop();
                $filters = json_decode($_GET['filters'] ?? '{}', true);
                $query = base64_decode($_GET['search']);
            	$rdo = $daoshop->select_products($filters['genres'], $filters['platforms'], $query , $_GET['offset']);
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
        
        //PRINT DETAILS
        case 'details';
        try{
            $daoshop = new DAOShop();
            $rdo = $daoshop->select_product($_GET['gameCod']);

        }catch (Exception $e){
            echo json_encode("error " + $e);
            exit;
        }
        if(!$rdo){
            echo json_encode("error");
            exit;
        }else{
            $product=get_object_vars($rdo);
            echo json_encode($product);
            //echo json_encode("error");
            exit;
        }
        break;

        default;
            include("/jquery_php/view/inc/error404.php");
            break;
    }