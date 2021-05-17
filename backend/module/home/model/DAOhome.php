<?php
	$path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/angularjs_php/backend/model/connect.php");
	class DAOHome{

		function select_all_games($offset){
			$sqlGames = "SELECT * FROM games ORDER BY views DESC LIMIT 12 OFFSET $offset";
			$sqlTotal = "SELECT COUNT(g.gameCod) total FROM games g";
			
			$returnGames = array();
			$returnRes = array();
			
			$conexion = connect::con();
			$resG = mysqli_query($conexion, $sqlGames);
			$resT = mysqli_query($conexion, $sqlTotal);
			$returnArray = array();

			if (mysqli_num_rows($resG) > 0) {
				while ($row = mysqli_fetch_assoc($resG)) {
					$returnGames[] = $row;
				}
				$returnRes['games'] = $returnGames;
			}
			$returnRes['total']= mysqli_fetch_assoc($resT);

            connect::close($conexion);
            return $returnRes;
		}
		
		function select_all_platforms(){
			$sql = "SELECT * FROM platforms";
			
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