<?php
	$path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/model/connect.php");
	class DAOAboutus{
		
		function geomap_shops(){
			$sql = "SELECT * FROM shops";
			
			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			
			$returnArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$returnArray[] = $row;
				}
			}
            connect::close($conexion);
            return $returnArray;
		}
	}
