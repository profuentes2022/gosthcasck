const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();

// funcion para limkear

server.use(express.json());
server.use(cors({
    origin: '*',
    methods: 'HEAD,GET,PUT,DELETE,POST,PATCH',
}));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const configdba = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Ghost',
};

const poolmysql = mysql.createPool(configdba);



server.post("/sesiones", (req, res) => {
    let id = req.body.id;
    let nombre = req.body.nombre;
    let correo = req.body.correo;
    let clave = req.body.clave;
    let rol = req.body.rol;

    const sql = `INSERT INTO sesiones (id, nombre, correo, clave, rol) VALUES ('${id}', '${nombre}', '${correo}', '${clave}', '${rol}')`;

    poolmysql.query(sql, function (err, result) {
        if (err) {
            console.error("Error al insertar sesión:", err);
            return res.status(500).send("Error interno del servidor");
        }
        res.status(201).send("Sesión insertada correctamente");
    });
});




//servidor usado 4000

server.listen(4000, () => {
    console.log('Servidor en línea en el puerto 4000');
});
