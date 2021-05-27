<?php
	$path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/angularjs_php/backend/model/connect.php");
	class DAOShop{

		function select_product($product){
			$sql = "SELECT * FROM games WHERE gameCod='$product'";
			$sqlUpdate = "UPDATE games
							SET views = views + 1
							WHERE gameCod='$product'";		
			$conexion = connect::con();
			mysqli_query($conexion, $sqlUpdate);
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            return $res;
		}

		function select_products( $genres, $platformCod, $search, $offset){			
			//-------------[STARTING QUERIES]--------------\\
			$sqlGames = "SELECT DISTINCT g.*
							FROM games g
							INNER JOIN  games_gameGenre gg ON gg.gameCod = g.gameCod";
			
			$sqlTotalG = "SELECT DISTINCT g.gameCod total
							FROM games g
							INNER JOIN  games_gameGenre gg ON gg.gameCod = g.gameCod";

			$sqlGenres = "SELECT g.genreName, COUNT(g.genreName) total
							FROM games_gameGenre g";

			$sqlPlatforms = "SELECT g.platformCod, COUNT(g.platformCod) total
							FROM games_platforms g";

			$sqlAllG = "SELECT * FROM gameGenre";
			$sqlAllP = "SELECT * FROM platforms";
			$sqlAdd = "";

			//-------------[ADDING TO QUERIES GENRES]--------------\\
			if (!is_null($genres)) {
				foreach ($genres as $i => $genre) {
					if ($i != 0) {
						$sqlAdd .= " AND ";
					} else {
						$sqlAdd .= " WHERE ";
					}
	
					$sqlAdd .= "EXISTS (
									SELECT *
									FROM games_gameGenre gg2
									WHERE gg2.gameCod = g.gameCod
									AND gg2.genreName = '$genre'
									)";
				}
			}

			//-------------[ADDING PLATFORM TO QUERIES]--------------\\
			if ($platformCod) {
				foreach ($platformCod as $i => $platform) {
					if ($i != 0 || !is_null($genres)) {
						$sqlAdd .= " AND ";
					} else {
						$sqlAdd .= " WHERE ";
					}
					$sqlAdd .= " EXISTS(
									SELECT *
									FROM games_platforms gp
									WHERE g.gameCod = gp.gameCod
									AND gp.platformCod='$platform' 
									)";
				}
			}

			//-------------[ADDING SUBQUERYS TO QUERIES]--------------\\
			if ($sqlAdd){
				$sqlGames .= $sqlAdd;
				$sqlGenres .= $sqlAdd;
				$sqlTotalG .= $sqlAdd;
				$sqlPlatforms .= $sqlAdd;
			}

			//-------------[ADDING SEARCH TO QUERIES]--------------\\
			if ($search) {
				if (!is_null($genres) || !is_null($platformCod)) {
					$sqlGames .= " AND";
					$sqlGenres .= " AND";
					$sqlTotalG .= " AND";
					$sqlPlatforms .= " AND";
				} else {
					$sqlGames .= " WHERE";
					$sqlGenres .= " WHERE";
					$sqlTotalG .= " WHERE";
					$sqlPlatforms .= " WHERE";
				}
				$sqlGames .= " g.gameName LIKE '%$search%'";
				$sqlTotalG .= " g.gameName LIKE '%$search%'";;
				$sqlGenres .= " EXISTS(
									SELECT *
									FROM games g1
									WHERE g1.gameCod = g.gameCod
									AND g1.gameName LIKE '%$search%' 
									)";
				$sqlPlatforms .= " EXISTS(
									SELECT *
									FROM games g1
									WHERE g1.gameCod = g.gameCod
									AND g1.gameName LIKE '%$search%' 
									)";
			}

			//-------------[ADDING OFFSET TO QUERIES]--------------\\
			$sqlGames .= " LIMIT 8 OFFSET $offset";
			
			//-------------[ADDING GROUP BY TO QUERIES]--------------\\
			$sqlGenres .= " GROUP BY g.genreName";
			$sqlPlatforms .= " GROUP BY g.platformCod";

			//-------------[STARTING CONEXION TO DO QUERIES]--------------\\
			$conexion = connect::con();
			$resT = mysqli_query($conexion, $sqlTotalG);
            $resG = mysqli_query($conexion, $sqlGames);
			$resGC = mysqli_query($conexion, $sqlGenres);
			$resPC = mysqli_query($conexion, $sqlPlatforms);
			$resAP = mysqli_query($conexion, $sqlAllP);
			$resAG = mysqli_query($conexion, $sqlAllG);
			$returnRes = array();
			$returnArray = array();
			$returnGenres = array();
			$returnPlatforms = array();
			$returnAllG = array();
			$returnAllP = array();
			$returnRes['total']= $resT->num_rows;

			if (mysqli_num_rows($resG) > 0) {
				while ($row = mysqli_fetch_assoc($resG)) {
					$returnArray[] = $row;
				}
				$returnRes['games'] = $returnArray;			
			}

			if (mysqli_num_rows($resGC) > 0) {
				while ($row2 = mysqli_fetch_assoc($resGC)) {
					$returnGenres[] = $row2;
				}
				$returnRes['genres'] = $returnGenres;
				
			}
			if (mysqli_num_rows($resPC) > 0) {
				while ($row3 = mysqli_fetch_assoc($resPC)) {
					$returnPlatforms[] = $row3;
				}
				$returnRes['platforms'] = $returnPlatforms;
				
			}

			if (mysqli_num_rows($resAG) > 0) {
				while ($row4 = mysqli_fetch_assoc($resAG)) {
					$returnAllG[] = $row4;
				}
				$returnRes['allGenres'] = $returnAllG;			
			}

			if (mysqli_num_rows($resAP) > 0) {
				while ($row5 = mysqli_fetch_assoc($resAP)) {
					$returnAllP[] = $row5;
				}
				$returnRes['allPlatforms'] = $returnAllP;			
			}
            connect::close($conexion);
            return $returnRes;

			
		}
	}