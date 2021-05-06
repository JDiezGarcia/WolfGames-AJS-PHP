<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/jquery_php/module/user/model/DAOUser.php");
    //include($path . "module/user/model/DAOUser.php");
    switch($_GET['op']){
        case 'list';
            try{
                $daouser = new DAOUser();
            	$rdo = $daouser->select_all_user();
            }catch (Exception $e){
                $callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
            }
            
            if(!$rdo){
    			$callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
    		}else{
                include("module/user/view/list_user.php");
    		}
            break;
            
        case 'create';
            include("module/user/model/validate.php");
            
            $check = true; 
            if (isset($_POST) && !empty($_POST)){
                $check=validate();
                if ($check){
                    $_SESSION['user']=$_POST;
                    try{
                        $daouser = new DAOUser();
    		            $rdo = $daouser->insert_user($_POST);
                    }catch (mysqli_sql_exception $e){
                        if ($e->getCode() == 1062){
                            echo '<script language="javascript">alert("El usuario ya esta registrado en la base de datos")</script>';
                            $callback = 'index.php?page=controller_user&op=create';
                            die('<script>window.location.href="'.$callback .'";</script>');
                        }
                        else {
                            echo '<script language="javascript">alert("'.$e->getCode()." ".$e->getMessage().'")</script>';
                            $callback = 'index.php?page=503';
                            die('<script>window.location.href="'.$callback .'";</script>');
                        }
                    }
                    
		            if($rdo){
            			echo '<script language="javascript">alert("Registrado en la base de datos correctamente")</script>';
            			$callback = 'index.php?page=controller_user&op=list';
        			    die('<script>window.location.href="'.$callback .'";</script>');
            		}else{
                        echo '<script language="javascript">alert("El usuario ya esta registrado en la base de datos")</script>';
            			$callback = 'index.php?page=controller_user&op=create';
    			        die('<script>window.location.href="'.$callback .'";</script>');
            		}
                }
            }
            include("module/user/view/create_user.php");
            break;
            
        case 'update';
            include("module/user/model/validate.php");
            
            $check = true;
            
            if ($_POST && !empty($_POST)){
               $check=validate(); 
                if ($check){
                    $_SESSION['user']=$_POST;
                    try{
                        $daouser = new DAOUser();
    		            $rdo = $daouser->update_user($_POST);
                    }catch (Exception $e){
                        $callback = 'index.php?page=503';
        			    die('<script>window.location.href="'.$callback .'";</script>');
                    }
                    
		            if($rdo){
            			echo '<script language="javascript">alert("Actualizado en la base de datos correctamente")</script>';
            			$callback = 'index.php?page=controller_user&op=list';
        			    die('<script>window.location.href="'.$callback .'";</script>');
            		}else{
            			$callback = 'index.php?page=503';
    			        die('<script>window.location.href="'.$callback .'";</script>');
            		}
                }
            }
            
            try{
                $daouser = new DAOUser();
            	$rdo = $daouser->select_user($_GET['id']);
            	$user=get_object_vars($rdo);
            }catch (Exception $e){
                $callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
            }
            
            if(!$rdo){
    			$callback = 'index.php?page=503';
    			die('<script>window.location.href="'.$callback .'";</script>');
    		}else{
        	    include("module/user/view/update_user.php");
    		}
            break;
            
        case 'read-modal';
            try{
                $daouser = new DAOUser();
                $rdo = $daouser->select_user($_GET['modal']);
            }catch (Exception $e){
                echo json_encode("error");
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
            
        case 'delete-modal';
            
            try{
                $daouser = new DAOUser();
                $rdo = $daouser->delete_user($_GET['modal']);
            }catch (Exception $e){
                echo json_encode("error");
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
        default;
            include("view/inc/error404.php");
            break;
    }