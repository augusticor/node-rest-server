'use strict';

const local_port = 3000;

// ==========================
// Se configura el puerto para que funcione correctamente ya sea trabajando en local o en producción

process.env.PORT = process.env.PORT || local_port;
