
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const server = express();

// función para linkear
server.use(express.static(path.join(__dirname, 'front')));

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

server.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'admin.html'));
});

server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'landing.html'));
});
server.get("/sesiones", (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'regis.html'));
});

server.post("/sesiones", (req, res) => {
    let id = req.body.id;
    let nombre = req.body.nombre;
    let correo = req.body.correo;
    let clave = req.body.clave;
    let rol = req.body.rol;
    let id_casco = req.body.id_casco;

    const sql = `INSERT INTO sesiones (id, nombre, correo, clave, rol, id_casco) VALUES ('${id}', '${nombre}', '${correo}', '${clave}', '${rol}', '${id_casco}')`;

    poolmysql.query(sql, function (err, result) {
        if (err) {
            console.error("error al insertar sesión:", err);
            return res.status(500).send("Error interno del servidor");
        }
        res.status(201).send("usuario insertado correcto");
    });
});

server.put("/sesiones/:id", (req, res) => {
    let id = req.params.id;
    let nombre = req.body.nombre;
    let correo = req.body.correo;
    let clave = req.body.clave;
    let rol = req.body.rol;  
    let id_casco = req.body.id_casco;  

    const sql = `UPDATE sesiones SET nombre='${nombre}', correo='${correo}', clave='${clave}', rol='${rol}', id_casco='${id_casco}' WHERE id='${id}'`;

    poolmysql.query(sql, function (err, result) {
        if (err) {
            console.error("error al actualizar sesión:", err);
            return res.status(500).send("id no encontrada");
        }
        res.status(200).send("Sesión actualizada correctamente");
    });
});

server.delete("/sesiones/:id", (req, res) => {
    let id = req.params.id;

    const sql = `DELETE FROM sesiones WHERE id = '${id}'`;

    poolmysql.query(sql, function (err, result) {
        if (err) {
            console.error("error al eliminar sesion:", err);
            return res.status(500).send("registro no encontrado");
        }
        res.status(200).send("Sesión eliminada correctamente");
    });
});

server.get("/usuarios", (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'login.html'));
});

server.post("/usuarios", (req, res) => {
    let usuario = req.body.usuario;
    let correo = req.body.correo;
    let clave = req.body.clave;

    const sql = `INSERT INTO usuarios (usuario, correo, clave) VALUES ('${usuario}', '${correo}', '${clave}')`;

    poolmysql.query(sql, function (err, result) {
        if (err) {
            console.error("Error al iniciar sesion:", err);
            return res.status(500).send("Error del servidor");
        }
        res.status(201).send("Seccion iniciada correctamente");
    });
});

server.put("/usuarios/:usuario", (req, res) => {
    let usuario = req.params.usuario;
    let correo = req.body.correo;
    let clave = req.body.clave;

    const sql = `UPDATE usuarios SET correo='${correo}', clave='${clave}' WHERE id='${usuario}'`;

    poolmysql.query(sql, function (err, result) {
        if (err) {
            console.error("error al actualizar usuario:", err);
            return res.status(500).send("id no encontrada");
        }
        res.status(200).send("Usuario actualizado correctamente");
    });
});

server.delete("/usuarios/:usuario", (req, res) => {
    let id = req.params.id;

    const sql = `DELETE FROM usuarios WHERE id = '${usuario}'`;

    poolmysql.query(sql, function (err, result) {
        if (err) {
            console.error("error al eliminar usuario:", err);
            return res.status(500).send("usuario no encontrado");
        }
        res.status(200).send("Usuario eliminado correctamente");
    });
});




// servidor usado 4000
server.listen(4000, () => {
    console.log('Servidor en línea en el puerto 4000');
});
