<?php
	$path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/jquery_php/model/connect.php");
	class DAOShop{

		function select_all_products($offset){
			$sql = "SELECT * FROM games ORDER BY relDate DESC LIMIT 8 OFFSET $offset";	
			$sqlFilters = "SELECT gg.genreName, COUNT(gg.genreName) total
							FROM gameGenre gg
							INNER JOIN games_gameGenre ggg ON ggg.genreName = gg.genreName
							WHERE EXISTS (
									SELECT * 
									FROM games g
									WHERE g.gameCod = ggg.gameCod
									ORDER BY g.relDate DESC
							)
							GROUP BY ggg.genreName";
			$sqlPlatforms = "SELECT * FROM platforms";
			$sqlTotal = "SELECT DISTINCT g.gameCod total FROM games g";

			$conexion = connect::con();
			$resT = mysqli_query($conexion, $sqlTotal);
			$resP = mysqli_query($conexion, $sql);
			$resF = mysqli_query($conexion, $sqlFilters);
			$resPl = mysqli_query($conexion, $sqlPlatforms);
			$returnRes = array();
			$returnArray = array();
			$returnFilters = array();
			$returnPlatforms = array();
			$returnRes['total']= $resT->num_rows;
			if (mysqli_num_rows($resP) > 0) {
				while ($row = mysqli_fetch_assoc($resP)) {
					$returnArray[] = $row;
				}
				$returnRes['games'] = $returnArray;			
			}
			if (mysqli_num_rows($resF) > 0) {
				while ($row2 = mysqli_fetch_assoc($resF)) {
					$returnFilters[] = $row2;
				}
				$returnRes['filters'] = $returnFilters;
			}
			if (mysqli_num_rows($resPl) > 0) {
				while ($row3 = mysqli_fetch_assoc($resPl)) {
					$returnPlatforms[] = $row3;
				}
				$returnRes['platforms'] = $returnPlatforms;
			}
			
            connect::close($conexion);
            return $returnRes;
		}
		function select_searched_products($search, $offset){
			$sql = "SELECT * FROM games g WHERE g.gameName LIKE '%$search%' ORDER BY relDate DESC LIMIT 8 OFFSET $offset";	
			$sqlFilters = "SELECT gg.genreName, COUNT(gg.genreName) total
							FROM gameGenre gg
							INNER JOIN games_gameGenre ggg ON ggg.genreName = gg.genreName
							WHERE EXISTS (
									SELECT * 
									FROM games g
									WHERE g.gameCod = ggg.gameCod
									AND g.gameName LIKE '%$search%'
									ORDER BY g.relDate DESC
							)
							GROUP BY ggg.genreName";
			$sqlPlatforms = "SELECT * FROM platforms";
			$sqlTotal = "SELECT DISTINCT g.gameCod total FROM games g WHERE g.gameName LIKE '%$search%' ORDER BY relDate DESC";

			$conexion = connect::con();
			$resT = mysqli_query($conexion, $sqlTotal);
			$resP = mysqli_query($conexion, $sql);
			$resF = mysqli_query($conexion, $sqlFilters);
			$resPl = mysqli_query($conexion, $sqlPlatforms);
			$returnRes = array();
			$returnArray = array();
			$returnFilters = array();
			$returnPlatforms = array();
			$returnRes['total']= $resT->num_rows;
			if (mysqli_num_rows($resP) > 0) {
				while ($row = mysqli_fetch_assoc($resP)) {
					$returnArray[] = $row;
				}
				$returnRes['games'] = $returnArray;			
			}
			if (mysqli_num_rows($resF) > 0) {
				while ($row2 = mysqli_fetch_assoc($resF)) {
					$returnFilters[] = $row2;
				}
				$returnRes['filters'] = $returnFilters;
			}
			if (mysqli_num_rows($resPl) > 0) {
				while ($row3 = mysqli_fetch_assoc($resPl)) {
					$returnPlatforms[] = $row3;
				}
				$returnRes['platforms'] = $returnPlatforms;
			}
            connect::close($conexion);
            return $returnRes;
		}
		function select_all_plat_produc($platformCod, $offset){
			$sql = "SELECT * 
					FROM games g
					WHERE EXISTS(
						SELECT *
						FROM games_platforms gp
						WHERE g.gameCod = gp.gameCod
						AND gp.platformCod='$platformCod' 
						)
					ORDER BY g.relDate DESC
					LIMIT 8 OFFSET $offset";

			$sqlTotal = "SELECT DISTINCT g.gameCod total
					FROM games g
					WHERE EXISTS(
					SELECT *
					FROM games_platforms gp
					WHERE g.gameCod = gp.gameCod
					AND gp.platformCod='$platformCod' 
					)
					ORDER BY g.relDate DESC";
			//https://stackoverflow.com/questions/907806/passing-an-array-to-a-query-using-a-where-clause
			//For not injection
			$sqlFilters = "SELECT gg.genreName, COUNT(gg.genreName) total
							FROM gameGenre gg
							INNER JOIN games_gameGenre ggg ON ggg.genreName = gg.genreName
							WHERE EXISTS (
									SELECT * 
									FROM games g
									WHERE g.gameCod = ggg.gameCod
									AND EXISTS(
										SELECT *
										FROM games_platforms gp
										WHERE g.gameCod = gp.gameCod
										AND gp.platformCod='$platformCod' 
										)
									ORDER BY g.relDate DESC
								)
							GROUP BY gg.genreName";
			$sqlPlatforms = "SELECT * FROM platforms";

			$conexion = connect::con();
			$resT = mysqli_query($conexion, $sqlTotal);
			$resP = mysqli_query($conexion, $sql);
			$resF = mysqli_query($conexion, $sqlFilters);
			$resPl = mysqli_query($conexion, $sqlPlatforms);
			$returnRes = array();
			$returnArray = array();
			$returnFilters = array();
			$returnPlatforms = array();
			$returnRes['total']= $resT->num_rows;
			if (mysqli_num_rows($resP) > 0) {
				while ($row = mysqli_fetch_assoc($resP)) {
					$returnArray[] = $row;
				}
				$returnRes['games'] = $returnArray;			
			}
			if (mysqli_num_rows($resF) > 0) {
				while ($row2 = mysqli_fetch_assoc($resF)) {
					$returnFilters[] = $row2;
				}
				$returnRes['filters'] = $returnFilters;
				
			}
			if (mysqli_num_rows($resPl) > 0) {
				while ($row3 = mysqli_fetch_assoc($resPl)) {
					$returnPlatforms[] = $row3;
				}
				$returnRes['platforms'] = $returnPlatforms;
			}
			
            connect::close($conexion);
            return $returnRes;
		}

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

		function filtered_products( $filters, $platformCod, $search, $offset){			
			$sqlGames = "SELECT DISTINCT g.*
							FROM games g
							INNER JOIN  games_gameGenre gg ON gg.gameCod = g.gameCod";
			
			$sqlTotal = "SELECT DISTINCT g.gameCod total
						FROM games g
						INNER JOIN  games_gameGenre gg ON gg.gameCod = g.gameCod";


			if (!is_null($filters)) {
				foreach ($filters as $i => $filter) {
					if ($i != 0) {
						$sqlGames .= " AND ";
						$sqlTotal .= " AND ";
					} else {
						$sqlGames .= " WHERE ";
						$sqlTotal .= " WHERE ";
					}
	
					$sqlGames .= "EXISTS (
						SELECT *
						FROM games_gameGenre gg2
						WHERE gg2.gameCod = g.gameCod
						AND gg2.genreName = '$filter'
						)";

					$sqlTotal .= "EXISTS (
						SELECT *
						FROM games_gameGenre gg2
						WHERE gg2.gameCod = g.gameCod
						AND gg2.genreName = '$filter'
						)";
	
				}
			}
			
			if ($platformCod) {
				if (!is_null($filters)) {
					$sqlGames .= " AND";
					$sqlTotal .= " AND";
				} else {
					$sqlGames .= " WHERE";
					$sqlTotal .= " WHERE";
				}

				$sqlGames .= " EXISTS(
					SELECT *
					FROM games_platforms gp
					WHERE g.gameCod = gp.gameCod
					AND gp.platformCod='$platformCod' 
					)";

				$sqlTotal .= " EXISTS(
					SELECT *
					FROM games_platforms gp
					WHERE g.gameCod = gp.gameCod
					AND gp.platformCod='$platformCod' 
					)";
			}

			if ($search) {
				if (!is_null($filters) || !is_null($platformCod)) {
					$sqlGames .= " AND";
					$sqlTotal .= " AND";
				} else {
					$sqlGames .= " WHERE";
					$sqlTotal .= " WHERE";
				}

				$sqlGames .= " g.gameName LIKE '%$search%'";
				$sqlTotal .= " g.gameName LIKE '%$search%'";
			}
			
			$sqlFilters = "SELECT g.genreName, COUNT(g.genreName) total
							FROM games_gameGenre g
							WHERE ";

			foreach ($filters as $i => $filter) {
				if ($i != 0) {
					$sqlFilters .= "AND ";
				}

				$sqlFilters .= "EXISTS(
								SELECT gg.genreName
								FROM games_gameGenre gg
								WHERE gg.gameCod = g.gameCod
								AND gg.genreName = '$filter'
								)";
			}
			
			if ($platformCod) {
				$sqlFilters .= " AND EXISTS(
					SELECT *
					FROM games_platforms gp
					WHERE g.gameCod = gp.gameCod
					AND gp.platformCod='$platformCod' 
					)";
			}

			if ($search) {
				$sqlFilters .= " AND EXISTS(
					SELECT *
					FROM games g1
					WHERE g1.gameCod = g.gameCod
					AND g1.gameName LIKE '%$search%' 
					)";
			}

			$sqlFilters .= " GROUP BY g.genreName";
			$sqlGames .= " LIMIT 8 OFFSET $offset";
			$conexion = connect::con();
			$resT = mysqli_query($conexion, $sqlTotal);
            $resP = mysqli_query($conexion, $sqlGames);
			$resF = mysqli_query($conexion, $sqlFilters);
			$returnRes = array();
			$returnArray = array();
			$returnFilters = array();
			$returnRes['total']= $resT->num_rows;

			if (mysqli_num_rows($resP) > 0) {
				while ($row = mysqli_fetch_assoc($resP)) {
					$returnArray[] = $row;
				}
				$returnRes['games'] = $returnArray;			
			}
			if (mysqli_num_rows($resF) > 0) {
				while ($row2 = mysqli_fetch_assoc($resF)) {
					$returnFilters[] = $row2;
				}
				$returnRes['filters'] = $returnFilters;
				
			}
            connect::close($conexion);
            return $returnRes;
		}
	}
