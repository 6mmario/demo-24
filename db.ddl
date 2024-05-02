CREATE DATABASE GestionBancaria;
USE GestionBancaria;

-- Creación de la tabla Clientes
CREATE TABLE Cliente (
    clienteid INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(50),
    apellido NVARCHAR(50),
    numero_identificacion NVARCHAR(20) UNIQUE,
    fecha_nacimiento DATE,
    direccion NVARCHAR(255),
    correo_electronico NVARCHAR(100),
    telefono NVARCHAR(20)
);

-- Creación de la tabla SolicitudesPrestamo
CREATE TABLE Solicitud_prestamo (
    solicitudid INT PRIMARY KEY IDENTITY(1,1),
    clienteid INT,
    monto_solicitado DECIMAL(12, 2),
    plazo_deseado INT,
    estado NVARCHAR(15), -- Ejemplos: 'Aprobado', 'Rechazado', 'En proceso'
    detalles NVARCHAR(255),
    descripcion NVARCHAR(255),
    FOREIGN KEY (clienteid) REFERENCES Cliente(clienteid) ON DELETE CASCADE
);

-- Creación de la tabla PrestamosAprobados
CREATE TABLE Prestamo_aprobado (
    prestamoid INT PRIMARY KEY IDENTITY(1,1),
    solicitudid INT,
    fecha_aprobacion DATE,
    monto_aprobado DECIMAL(12, 2),
    plazo_meses INT,
    estado_pago NVARCHAR(15), -- Ejemplos: 'Pagado', 'Pendiente'
    FOREIGN KEY (solicitudid) REFERENCES Solicitud_prestamo(solicitudid) ON DELETE CASCADE
);

-- Creación de la tabla Pagos
CREATE TABLE Pago (
    pagoid INT PRIMARY KEY IDENTITY(1,1),
    prestamoid INT,
    fecha_pago DATE,
    monto_pagado DECIMAL(12, 2),
    numero_pago INT,
    estado NVARCHAR(15),
    FOREIGN KEY (prestamoid) REFERENCES Prestamo_aprobado(prestamoid) ON DELETE CASCADE
);
