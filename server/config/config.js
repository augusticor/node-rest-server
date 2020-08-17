'use strict';

const local_port = 3000;

// ==========================
// Se configura el puerto para que funcione correctamente ya sea trabajando en local o en producción

process.env.PORT = process.env.PORT || local_port;

// =========================
// ENTORNO
// =========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =========================
// BASE DE DATOS
// =========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
	urlDB = 'mongodb://localhost:27017/cafe';
} else {
	urlDB = 'mongodb+srv://root:fzFQd7GaWJbfjSF6@cluster0.r8cab.mongodb.net/cafe';
}

process.env.URL_DB = urlDB;
