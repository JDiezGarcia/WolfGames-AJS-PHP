<?php
	$path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/jquery_php/model/connect.php");
	class DAOUser{
		function insert_user($datos){
			$user=$datos["usuario"];
			$email=$datos["email"];
        	$passwd=$datos["pass"];
        	$name=$datos["nombre"];
        	$dir=$datos["dir"];
        	$sex=$datos["sexo"];
        	$birthdate=$datos["fecha_nacimiento"];
        	$city=$datos["city"];
			$country=$datos["pais"];
			$postcode=$datos["postcode"];

			$conexion = connect::con();
			$sql = $conexion->prepare("INSERT INTO `users` (`user`, `email`, `pass`, `name`, `dir`, `postcode`, `city`, `country`, `sex`, `birthdate`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
			mysqli_report(MYSQLI_REPORT_ALL);
			$sql->bind_param("ssssssssss", $user, $email, $passwd, $name, $dir, $postcode, $city, $country, $sex, $birthdate);
			$res = $sql ->execute();
			connect::close($conexion);
			return $res;
		}
		
		function select_all_user(){
			$sql = "SELECT * FROM users ORDER BY user ASC";
			
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            return $res;
		}
		
		function select_user($user){
			$sql = "SELECT * FROM users WHERE user='$user'";
			
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            return $res;
		}
		
		function update_user($datos){
			$user=$datos['usuario'];
			$email=$datos['email'];
        	$passwd=$datos['pass'];
        	$name=$datos['nombre'];
        	$dir=$datos['dir'];
			$postcode=$datos['postcode'];
			$city=$datos['city'];
        	$sex=$datos['sexo'];
        	$birthdate=$datos['fecha_nacimiento'];
        	$country=$datos['pais'];
        	
        	$sql = " UPDATE users SET pass='$passwd', name='$name', dir='$dir', sex='$sex', birthdate='$birthdate', city='$city',"
        		. " country='$country', postcode='$postcode', email='$email' WHERE user='$user'";
            
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
			return $res;
		}
		
		function delete_user($user){
			$sql = "DELETE FROM users WHERE user='$user'";
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            return $res;
		}
	}