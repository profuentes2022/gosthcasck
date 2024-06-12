-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2024 a las 18:29:52
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `appghosthcask`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `EditarSesionConBitacora` (IN `p_id` INT, IN `p_nombre` VARCHAR(50), IN `p_correo` VARCHAR(100), IN `p_clave` VARCHAR(50), IN `p_rol` VARCHAR(50))   BEGIN

    UPDATE sesiones
    SET nombre = p_nombre,
        correo = p_correo,
        clave = p_clave,
        rol = p_rol
    WHERE id = p_id;
    

    INSERT INTO sesiones_bitacora (id_sesion, nombre, correo, accion, fecha)
    VALUES (p_id, p_nombre, p_correo, 'Editado', CURRENT_TIMESTAMP);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EliminarSesionConBitacora` (IN `p_id` INT)   BEGIN
    DECLARE v_nombre VARCHAR(50);
    DECLARE v_correo VARCHAR(100);


    SELECT nombre, correo INTO v_nombre, v_correo
    FROM sesiones
    WHERE id = p_id;

 
    IF v_nombre IS NOT NULL AND v_correo IS NOT NULL THEN

        INSERT INTO sesiones_bitacora (id_sesion, nombre, correo, accion, fecha)
        VALUES (p_id, v_nombre, v_correo, 'Eliminado', CURRENT_TIMESTAMP);
        
        -- Eliminar la sesión de la tabla sesiones
        DELETE FROM sesiones
        WHERE id = p_id;

    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarSesionConBitacora` (IN `p_nombre` VARCHAR(50), IN `p_correo` VARCHAR(100), IN `p_clave` VARCHAR(50), IN `p_rol` VARCHAR(50))   BEGIN

    INSERT INTO sesiones (nombre, correo, clave, rol)
    VALUES (p_nombre, p_correo, p_clave, p_rol);
    

    INSERT INTO sesiones_bitacora (id_sesion, nombre, correo, accion, fecha)
    VALUES (LAST_INSERT_ID(), p_nombre, p_correo, 'Insertado', CURRENT_TIMESTAMP);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones`
--

CREATE TABLE `sesiones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `clave` varchar(50) NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones_bitacora`
--

CREATE TABLE `sesiones_bitacora` (
  `id` int(11) NOT NULL,
  `id_sesion` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `accion` varchar(50) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `sesiones_bitacora`
--
ALTER TABLE `sesiones_bitacora`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sesiones_bitacora`
--
ALTER TABLE `sesiones_bitacora`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
