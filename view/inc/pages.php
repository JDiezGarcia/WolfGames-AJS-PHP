<?php
	if(!isset($_GET['page'])){
		include("module/home/view/home.html");	
	}else {
		switch($_GET['page']){
			case "home":
				include("module/home/view/".$_GET['page'].".html");
				break;
			case "controller_user":
				include("module/user/controller/".$_GET['page'].".php");
				break;
			case "shop":
				include("module/shop/view/".$_GET['page'].".html");
				break;
			case "services":
				include("module/services/".$_GET['page'].".html");
				break;
			case "aboutus":
				include("module/aboutus/view/".$_GET['page'].".html");
				break;
			case "contactus":
				include("module/contact/".$_GET['page'].".html");
				break;
			case "404":
				include("view/inc/error".$_GET['page'].".php");
				break;
			case "503":
				include("view/inc/error".$_GET['page'].".php");
				break;
			default:
				include("module/home/view/home.html");
				break;
		}
	}
?>