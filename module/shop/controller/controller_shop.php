<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/jquery_php/module/shop/model/DAOshop.php");
    //include($path . "module/user/model/DAOhome.php");
    session_start();
    switch($_GET['op']){
        //PRINT ALL PRODUCTS
        case 'all-products';
            try{
                $daoshop = new DAOShop();
            	$rdo = $daoshop->select_all_products($_POST['offset']);

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
        
        case 'search-products':
            try{
                $daoshop = new DAOShop();
            	$rdo = $daoshop->select_searched_products($_GET['search'], $_POST['offset']);

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

        case 'filtered-products';
            try{
                $daoshop = new DAOShop();
                $filters = $_GET['filters'];
                if ($filters == "[]") {
                    $filters = null;
                } else {
                    $filters = json_decode($_GET['filters']);
                }
            	$rdo = $daoshop->filtered_products($filters, $_GET['platform'], $_GET['search'], $_POST['offset']);
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

        case 'platform-products';
        try{
            $daoshop = new DAOShop();
            $rdo = $daoshop->select_all_plat_produc($_GET['platform-cod'],$_POST['offset']);

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
        
        case 'show-product';
        try{
            $daoshop = new DAOShop();
            $rdo = $daoshop->select_product($_GET['product-id']);

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