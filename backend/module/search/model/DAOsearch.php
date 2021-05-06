<?php
	$path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/jquery_php/model/connect.php");
	class DAOSearch{

		function query_search($query){
			$sql = "SELECT * FROM games WHERE gameName LIKE '%$query%'";

			$returnArray = array();
			$returnRes = array();
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$returnArray[] = $row;
				}		
				$returnRes['games'] = $returnArray;
			}
            connect::close($conexion);
            return $returnRes;
		}

		function exists_search($search){
			$sql = "SELECT COUNT(g.gameCod) total FROM games g WHERE g.gameName LIKE '%$search%'";	
			$conexion = connect::con();
			$resP = mysqli_query($conexion, $sql)->fetch_object();	
            connect::close($conexion);
            return $resP;
		}

	}
