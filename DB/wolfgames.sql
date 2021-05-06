-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 03-03-2021 a las 16:30:17
-- Versión del servidor: 10.3.27-MariaDB-0+deb10u1
-- Versión de PHP: 7.3.19-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `wolf_games`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gameGenre`
--

CREATE TABLE `gameGenre` (
  `genreID` int(11) NOT NULL,
  `genreName` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `gameGenre`
--

INSERT INTO `gameGenre` (`genreID`, `genreName`) VALUES
(1, 'action'),
(2, 'fantasy'),
(10, 'fighting'),
(12, 'FPS'),
(8, 'horror'),
(5, 'MMO'),
(6, 'platformers'),
(13, 'Roguelike'),
(4, 'RPG'),
(7, 'sandbox'),
(9, 'simulation'),
(11, 'survival');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games`
--

CREATE TABLE `games` (
  `gameCod` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `gameName` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `relDate` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `price` float(10,2) NOT NULL,
  `type` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `pgi` int(2) NOT NULL,
  `description` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `gameImg` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `views` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `games`
--

INSERT INTO `games` (`gameCod`, `gameName`, `relDate`, `price`, `type`, `pgi`, `description`, `gameImg`, `views`) VALUES
('CRA-004', 'Crash Bandicoot 4: Its About Time', '18/04/2021', 69.99, 'Game', 13, 'crashbandicoot4-desc', 'crashbandicoot4-cover.jpg', 123),
('DEC-001', 'Dead Cells', '12/12/2018', 44.99, 'Game', 16, 'deadcells-des', 'deadcells-cover.jpg', 4),
('GOT-001', 'Gothic', '10/10/1999', 44.99, 'Game', 16, 'gothic-des', 'gothic-cover.jpg', 2),
('GOT-002', 'Gothic 2', '09/04/2004', 49.99, 'Game', 16, 'gothic2-des', 'gothic2-cover.jpg', 2),
('GOT-003', 'Gothic 3', '10/10/1999', 44.99, 'Game', 16, 'gothic3-des', 'gothic3-cover.jpg', 5),
('HAL-005', 'HALO 5: Guardians', '03/09/2017', 69.99, 'Game', 16, 'halo5-des', 'halo5guardians-cover.jpg', 2),
('HOK-001', 'Hollow Knight', '09/04/2014', 49.99, 'Game', 16, 'hollowknight-des', 'hollowknight-cover.jpg', 2),
('THW-001', 'The Witcher', '05/03/2001', 59.99, 'Game', 16, 'thewitcher-des', 'thewitcher-cover.jpg', 2),
('THW-002', 'The Witcher 2: Assassins of Kings', '05/03/2006', 59.99, 'Game', 18, 'thewitcher2-des', 'thewitcher2-cover.jpg', 2),
('THW-003', 'The Witcher 3: Wild Hunt', '12/06/2014', 59.99, 'Game', 18, 'thewitcher3-des', 'thewitcher3-cover.jpg', 4),
('TLU-001', 'The Last of Us', '12/06/2010', 59.99, 'Game', 18, 'thelastofus-des', 'thelastofus-cover.jpg', 5),
('TLU-002', 'The Last of Us 2', '12/06/2010', 69.99, 'Game', 18, 'thelastofus2-des', 'thelastofus2-cover.jpg', 2),
('ZEB-001', 'Zelda: Breath of the Wild', '12/01/2018', 44.99, 'Game', 16, 'zeldabreathofthewild-des', 'zeldabreathofthewild-cover.jpg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games_gameGenre`
--

CREATE TABLE `games_gameGenre` (
  `ID` int(11) NOT NULL,
  `genreName` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `gameCod` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `games_gameGenre`
--

INSERT INTO `games_gameGenre` (`ID`, `genreName`, `gameCod`) VALUES
(4, 'action', 'CRA-004'),
(47, 'action', 'DEC-001'),
(46, 'action', 'HAL-005'),
(38, 'action', 'HOK-001'),
(35, 'action', 'THW-001'),
(36, 'action', 'THW-002'),
(1, 'action', 'THW-003'),
(2, 'action', 'TLU-001'),
(6, 'action', 'TLU-002'),
(44, 'action', 'ZEB-001'),
(10, 'fantasy', 'GOT-001'),
(11, 'fantasy', 'GOT-002'),
(12, 'fantasy', 'GOT-003'),
(43, 'fantasy', 'ZEB-001'),
(45, 'FPS', 'HAL-005'),
(15, 'horror', 'TLU-001'),
(16, 'horror', 'TLU-002'),
(3, 'platformers', 'CRA-004'),
(51, 'platformers', 'DEC-001'),
(39, 'platformers', 'HOK-001'),
(49, 'Roguelike', 'DEC-001'),
(48, 'RPG', 'DEC-001'),
(24, 'RPG', 'GOT-001'),
(25, 'RPG', 'GOT-002'),
(26, 'RPG', 'GOT-003'),
(40, 'RPG', 'HOK-001'),
(34, 'RPG', 'THW-001'),
(23, 'RPG', 'THW-002'),
(22, 'RPG', 'THW-003'),
(42, 'RPG', 'ZEB-001'),
(27, 'sandbox', 'GOT-001'),
(28, 'sandbox', 'GOT-002'),
(29, 'sandbox', 'GOT-003'),
(7, 'sandbox', 'THW-001'),
(8, 'sandbox', 'THW-002'),
(33, 'sandbox', 'THW-003'),
(5, 'sandbox', 'TLU-002'),
(41, 'sandbox', 'ZEB-001'),
(50, 'survival', 'DEC-001'),
(13, 'survival', 'TLU-001'),
(14, 'survival', 'TLU-002');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games_platforms`
--

CREATE TABLE `games_platforms` (
  `ID` int(11) NOT NULL,
  `platformCod` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `gameCod` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `games_platforms`
--

INSERT INTO `games_platforms` (`ID`, `platformCod`, `gameCod`) VALUES
(1, 'COMP001', 'CRA-004'),
(26, 'COMP001', 'DEC-001'),
(2, 'COMP001', 'GOT-001'),
(6, 'COMP001', 'GOT-002'),
(7, 'COMP001', 'GOT-003'),
(28, 'COMP001', 'HAL-005'),
(31, 'COMP001', 'HOK-001'),
(8, 'COMP001', 'THW-001'),
(9, 'COMP001', 'THW-002'),
(11, 'COMP001', 'THW-003'),
(3, 'PLAY001', 'CRA-004'),
(33, 'PLAY001', 'HOK-001'),
(12, 'PLAY001', 'THW-003'),
(15, 'PLAY001', 'TLU-001'),
(16, 'PLAY001', 'TLU-002'),
(4, 'SWIT001', 'CRA-004'),
(27, 'SWIT001', 'DEC-001'),
(30, 'SWIT001', 'HOK-001'),
(13, 'SWIT001', 'THW-003'),
(32, 'SWIT001', 'ZEB-001'),
(5, 'XBOX001', 'CRA-004'),
(29, 'XBOX001', 'HAL-005'),
(34, 'XBOX001', 'HOK-001'),
(10, 'XBOX001', 'THW-002'),
(14, 'XBOX001', 'THW-003');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platforms`
--

CREATE TABLE `platforms` (
  `platformCod` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `platformName` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `platformImg` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `platforms`
--

INSERT INTO `platforms` (`platformCod`, `platformName`, `platformImg`) VALUES
('COMP001', 'PC', 'comp001.jpg'),
('PLAY001', 'PlayStation 5', 'play001.jpg'),
('SWIT001', 'Switch', 'swit001.jpg'),
('XBOX001', 'XBOX Series X', 'xbox001.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shops`
--

CREATE TABLE `shops` (
  `shopCod` int(11) NOT NULL,
  `shopName` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `shopDesc` varchar(500) COLLATE utf8_spanish_ci NOT NULL,
  `shopLat` decimal(8,6) NOT NULL,
  `shopLon` decimal(9,6) NOT NULL,
  `shopImg` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `shopAddress` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `shopPost` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `shopCity` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `shopState` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `shopCountry` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `shops`
--

INSERT INTO `shops` (`shopCod`, `shopName`, `shopDesc`, `shopLat`, `shopLon`, `shopImg`, `shopAddress`, `shopPost`, `shopCity`, `shopState`, `shopCountry`) VALUES
(1, 'Ontinyent WolfGames', 'ONT-001', '38.824108', '-0.605237', 'ONT-001.jpg', 'Carrer del Pintor Josep Segrelles, 1', '46870', 'Ontinyent', 'Valencia', 'España'),
(2, 'Speed WolfGames', 'MAD-001-ES', '40.426247', '-3.716018', 'default.jpg', 'Calle de Preciados, 34', '28013', 'Madrid', 'Madrid', 'España'),
(3, 'Ferrel WolfGames', 'MAD-001-PT', '39.796225', '-7.559916', 'default.jpg', 'Antonio Pedro Antunes Catarino, Av. do Mar 97', '2520-061', 'Ferrel', 'Ferrel', 'Portugal'),
(4, 'SpiderMan WolfGames', 'NYK-001-USA', '40.782088', '-73.971361', 'default.jpg', '165 E 116th St', '10029', 'NY', 'New York', 'Estados Unidos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
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
  `img` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user`, `pass`, `name`, `dni`, `sex`, `birthdate`, `age`, `country`, `language`, `comment`, `hobby`, `img`) VALUES
('anca', 'User-123', 'angel', '48605110S', 'Hombre', '19/07/1993', 22, 'España', 'Español:', 'hola', 'Informatica:', 'slide-1.jpg'),
('ancoca', 'User-123', 'angel', '48605110S', 'Hombre', '19/07/1993', 22, 'España', 'Español:', 'hola', 'Informatica:', 'slide-1.jpg'),
('ancoca33', 'User-123', 'angel', '48605110S', 'Hombre', '19/07/1993', 22, 'España', 'Español:', 'hola', 'Informatica:', 'slide-1.jpg'),
('Antonio', 'User-123', 'usuario', '12345678Z', 'Hombre', '16/05/1980', 36, 'EspaÃ±a', 'Ingles:', 'Adios mundo', 'Informatica:Automovil:', 'slide-1.jpg'),
('antonioooo', 'User-123', 'usuario', '12345678Z', 'Hombre', '16/05/1980', 36, 'EspaÃ±a', 'Ingles:', 'Adios mundo', 'Informatica:Automovil:', 'slide-1.jpg'),
('daurgil', 'La1lal2la3lal4la5.', 'david', '87654321X', 'Mujer', '06/06/1990', 25, 'Francia', 'Ingles:', 'Hoal mundo', 'Informatica:', 'slide-1.jpg'),
('jesus', 'User-123', 'david', '87654321X', 'Hombre', '06/06/1990', 25, 'EspaÃ±a', 'EspaÃ±ol:Ingles:', 'Hoal mundo', 'Informatica:', 'slide-1.jpg'),
('jose', 'User-123', 'usuario', '12345678Z', 'Hombre', '16/05/1980', 36, 'EspaÃ±a', 'Ingles:', 'Adios mundo', 'Informatica:Automovil:', 'slide-1.jpg'),
('joselu', 'User-123', 'usuario', '12345678Z', 'Hombre', '16/05/1980', 36, 'EspaÃ±a', 'Ingles:', 'Adios mundo', 'Informatica:Automovil:', 'slide-1.jpg'),
('luis', 'User-123', 'usuario', '12345678Z', 'Hombre', '16/05/1980', 36, 'EspaÃ±a', 'Ingles:', 'Adios mundo', 'Informatica:Automovil:', 'slide-1.jpg'),
('Manuel', 'User-123', 'usuario', '12345678Z', 'Hombre', '16/05/1980', 36, 'EspaÃ±a', 'Ingles:', 'Adios mundo', 'Informatica:Automovil:', 'slide-1.jpg'),
('wolf', 'User-123', 'usuario', '12345678Z', 'Mujer', '16/05/1980', 36, 'Francia', 'Ingles:', 'Adios mundo', 'Informatica:Alimentacion:Automovil:', 'slide-2.jpg'),
('wolf2', 'User-123', 'usuario', '12345678Z', 'Hombre', '16/05/1980', 36, 'EspaÃ±a', 'Ingles:', 'Adios mundo', 'Informatica:Automovil:', 'slide-1.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `gameGenre`
--
ALTER TABLE `gameGenre`
  ADD PRIMARY KEY (`genreID`),
  ADD UNIQUE KEY `genreName` (`genreName`);

--
-- Indices de la tabla `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`gameCod`),
  ADD UNIQUE KEY `gameName` (`gameName`);

--
-- Indices de la tabla `games_gameGenre`
--
ALTER TABLE `games_gameGenre`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NONCLUSTERED` (`genreName`,`gameCod`),
  ADD KEY `gameCod` (`gameCod`);

--
-- Indices de la tabla `games_platforms`
--
ALTER TABLE `games_platforms`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NONCLUSTERED` (`platformCod`,`gameCod`),
  ADD KEY `gameCod` (`gameCod`);

--
-- Indices de la tabla `platforms`
--
ALTER TABLE `platforms`
  ADD PRIMARY KEY (`platformCod`);

--
-- Indices de la tabla `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`shopCod`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `gameGenre`
--
ALTER TABLE `gameGenre`
  MODIFY `genreID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `games_gameGenre`
--
ALTER TABLE `games_gameGenre`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `games_platforms`
--
ALTER TABLE `games_platforms`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `shops`
--
ALTER TABLE `shops`
  MODIFY `shopCod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `games_gameGenre`
--
ALTER TABLE `games_gameGenre`
  ADD CONSTRAINT `games_gameGenre_ibfk_1` FOREIGN KEY (`genreName`) REFERENCES `gameGenre` (`genreName`),
  ADD CONSTRAINT `games_gameGenre_ibfk_2` FOREIGN KEY (`gameCod`) REFERENCES `games` (`gameCod`);

--
-- Filtros para la tabla `games_platforms`
--
ALTER TABLE `games_platforms`
  ADD CONSTRAINT `games_platforms_ibfk_1` FOREIGN KEY (`platformCod`) REFERENCES `platforms` (`platformCod`),
  ADD CONSTRAINT `games_platforms_ibfk_2` FOREIGN KEY (`gameCod`) REFERENCES `games` (`gameCod`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
