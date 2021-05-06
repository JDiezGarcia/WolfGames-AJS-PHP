<?php
	class connect{
		public static function con(){
			$host = '127.0.0.1';  
    		$user = "javier";                     
    		$pass = "la1la2la3la4";                             
    		$db = "wolf_games";                      
    		$port = 3306;                           
    		
    		$conexion = mysqli_connect($host, $user, $pass, $db, $port)or die(mysql_error());
			return $conexion;
		}
		public static function close($conexion){
			mysqli_close($conexion);
		}
	}