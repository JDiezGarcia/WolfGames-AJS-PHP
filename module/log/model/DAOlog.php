<?php
	$path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/jquery_php/model/connect.php");
	class DAOLog{

		function login($user, $pass){
			$sql = "SELECT user, img FROM users WHERE user = '$user' OR email = '$user' AND pass = '$pass'";
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            return $res;
		}

	}
