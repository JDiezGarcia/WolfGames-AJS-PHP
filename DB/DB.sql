---- PROYECT DATABASE ----

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

create database "PROYECT NAME";
use "PROYECT NAME";


---- Users ----
CREATE TABLE IF NOT EXISTS `users` (
  `user` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `pass` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `dni` varchar(9) COLLATE utf8_spanish_ci NOT NULL,
  `sex` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `birthdate` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `age` int(2) NOT NULL,
  `country` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `language` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `comment` varchar(500) COLLATE utf8_spanish_ci NOT NULL,
  `hobby` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

---- Data ----

INSERT INTO `users` (`user`, `pass`, `name`, `dni`, `sex`, `birthdate`, `age`, `country`, `language`, `comment`, `hobby`) VALUES
('ancoca', 'User-123', 'angel', '48292627X', 'Hombre', '19/07/1993', 22, 'Francia', 'Ingles:Frances:', 'Welcome to this page', 'Informatica:Alimentacion:Automovil:'),
('daurgil', 'User-123', 'david', '87654321X', 'Hombre', '06/06/1990', 25, 'EspaÃ±a', 'EspaÃ±ol:Ingles:', 'Hoal mundo', 'Informatica:'),
('usuario', 'User-123', 'usuario', '12345678Z', 'Hombre', '16/05/1980', 36, 'EspaÃ±a', 'Ingles:', 'Adios mundo', 'Informatica:Automovil:');


---- Products ----
CREATE TABLE IF NOT EXISTS `games` (
  `gameCod` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `gameName` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `relDate` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `price` float(10,2) NOT NULL,
  `type` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `pgi` int(2) NOT NULL,
  `description` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `imgPC` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `imgPlay` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `imgXbox` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `imgSwitch` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `views` int(20) NOT NULL,
  PRIMARY KEY (`gameCod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

---- Data ----

INSERT INTO `games` (`gameCod`, `gameName`, `relDate`, `price`, `type`, `pgi`, `description`, `gameImg`, `views`) VALUES
('GOT-001', 'Gothic', '10/10/1999', 44.99, 'Game', 16, 'gothic-des', 'gothic-cover.jpg',  0),
('GOT-002', 'Gothic 2', '09/04/2004', 49.99,'Game', 16, 'gothic2-des', 'gothic2-cover.jpg', 0),
('GOT-003', 'Gothic 3', '10/10/1999', 44.99,'Game', 16, 'gothic3-des', 'gothic3-cover.jpg', 0),
('THW-001', 'The Witcher', '05/03/2001', 59.99,'Game', 16, 'thewitcher-des', 'thewitcher-cover.jpg', 0),
('THW-002', 'The Witcher 2: Assassins of Kings', '05/03/2006', 59.99,'Game', 18, 'thewitcher2-des', 'thewitcher2-cover', 0),
('THW-003', 'The Witcher 3: Wild Hunt', '12/06/2014', 59.99,'Game', 18, 'thewitcher3-des', 'thewitcher3-cover.jpg', 0),
('TLU-001', 'The Last of Us', '12/06/2010', 59.99,'Game', 18, 'thelastofus-des', 'thelastofus-cover.jpg', 0),
('TLU-002', 'The Last of Us 2', '12/06/2010', 69.99,'Game', 18, 'thelastofus2-des','thelastofus2-cover.jpg', 0),
('CRA-004', 'Crash Bandicoot 4: Its About Time', '18/04/2021', 69.99,'Game', 13, 'crashbandicoot4-desc', 'crashbandicoot4-cover.jpg', 0),
('HAL-005', 'HALO 5: Guardians', '03/09/2017', 69.99, 'Game', 16, 'halo5-des', 'halo5guardians-cover.jpg', 0),
('HOK-001', 'Hollow Knight', '09/04/2014', 49.99,'Game', 16, 'hollowknight-des', 'hollowknight.jpg', 0),
('DEC-001', 'Dead Cells', '12/12/2018', 44.99,'Game', 16, 'deadcells-des', 'deadcells-cover.jpg', 0)

---- Categories -----

CREATE TABLE IF NOT EXISTS `platforms` (
  `platformCod` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `platformName` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `platformImg` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`platformCod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci

---- Data ----

INSERT INTO `platforms` (`platformCod`, `platformName`, `platformImg`) VALUES
('PLAY001', 'PlayStation 5', 'play001.jpg'),
('XBOX001', 'XBOX Series X', 'xbox001.jpg'),
('COMP001', 'PC', 'comp001.jpg');

---- Subcategories ----

CREATE TABLE IF NOT EXISTS `gameGenre` (
  `genreID` int NOT NULL AUTO_INCREMENT,
  `genreName` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`genreID`),
  UNIQUE (`genreName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci

---- Data ----

INSERT INTO `gameGenre` (`genreID`, `genreName`) VALUES
('', 'action'),

---- Relation Between Product and Subcategories ----

CREATE TABLE IF NOT EXISTS `games_gameGenre` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `genreName` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `gameCod` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`ID`),
  FOREIGN KEY(genreName) REFERENCES gameGenre(genreName),
  FOREIGN KEY(gameCod) REFERENCES games(gameCod),    
  CONSTRAINT ID UNIQUE NONCLUSTERED
(
    genreName, gameCod
)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci

---- Data ---- 
INSERT INTO `games_gameGenre` (`genreName`, `gameCod`) VALUES
('', '')

---- Relation Between Product and Platforms ----

CREATE TABLE IF NOT EXISTS `games_platforms` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `platformCod` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `gameCod` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`ID`),
  FOREIGN KEY(platformCod) REFERENCES platforms(platformCod),
  FOREIGN KEY(gameCod) REFERENCES games(gameCod)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci

---- Data ---- 
INSERT INTO `games_platforms` (`platformCod`, `gameCod`) VALUES
('', '')

---- Shops ----

CREATE TABLE IF NOT EXISTS `shops` (
  `shopCod` int NOT NULL AUTO_INCREMENT,
  `shopName` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `shopDesc` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `shopLat` decimal(8,6) NOT NULL,
  `shopLon` decimal(9,6) NOT NULL,
  `shopImg` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `shopAddress` varchar(500) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`shopCod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci

---- Data ----
INSERT INTO `shops` (`shopName`,`shopDesc`,`shopLat`,`shopLon`, `shopImg`, `shopAddress`, `shopPost`,`shopCity`, `shopState`, `shopCountry`) VALUES
('Speed WolfGames', 'MAD-001-ES', 40.4262474, -3.7160175, 'default.jpg', 'Calle de Preciados, 34','28013','Madrid','Madrid','España'),
('Ferrel WolfGames', 'MAD-001-PT', 39.7962246, -7.559916, 'default.jpg', 'Antonio Pedro Antunes Catarino, Av. do Mar 97','2520-061','Ferrel','Ferrel','Portugal'),
('SpiderMan WolfGames', 'NYK-001-USA', 40.7820881, -73.971361, 'default.jpg', '165 E 116th St','10029','NY','New York','Estados Unidos')