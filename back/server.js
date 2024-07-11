const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const server = express();
const httpServer = http.createServer(server);
const io = socketIo(httpServer);


// Middleware y configuración
server.use(express.static(path.join(__dirname, 'front')));
server.use(express.json());
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const configdba = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ghost',
};

const poolmysql = mysql.createPool(configdba);

// Rutas para linkear
server.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'chat.html'));
});

server.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'admin.html'));
});

server.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'landing.html'));
});

server.get("/sesiones", (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'regis.html'));
});

// Endpoint para registrar sesiones
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
            console.error("Error al insertar sesión:", err);
            return res.status(500).send("Error interno del servidor");
        }
        res.status(201).send("Usuario insertado correctamente");
    });
});

// Endpoint para actualizar sesiones
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
            console.error("Error al actualizar sesión:", err);
            return res.status(500).send("ID no encontrada");
        }
        res.status(200).send("Sesión actualizada correctamente");
    });
});

// Endpoint para eliminar sesiones
server.delete("/sesiones/:id", (req, res) => {
    let id = req.params.id;

    const sql = `DELETE FROM sesiones WHERE id = '${id}'`;

    poolmysql.query(sql, function (err, result) {
        if (err) {
            console.error("Error al eliminar sesión:", err);
            return res.status(500).send("Registro no encontrado");
        }
        res.status(200).send("Sesión eliminada correctamente");
    });
});

// Endpoint para gestionar usuarios
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
            console.error("Error al insertar usuario:", err);
            return res.status(500).send("Error del servidor");
        }
        res.status(201).send("Usuario insertado correctamente");
    });
});

server.put("/usuarios/:usuario", (req, res) => {
    let usuario = req.params.usuario;
    let correo = req.body.correo;
    let clave = req.body.clave;

    const sql = `UPDATE usuarios SET correo='${correo}', clave='${clave}' WHERE id='${usuario}'`;

    poolmysql.query(sql, function (err, result) {
        if (err) {
            console.error("Error al actualizar usuario:", err);
            return res.status(500).send("ID no encontrada");
        }
        res.status(200).send("Usuario actualizado correctamente");
    });
});

server.delete("/usuarios/:usuario", (req, res) => {
    let usuario = req.params.usuario;

    const sql = `DELETE FROM usuarios WHERE id ='${usuario}'`;

    poolmysql.query(sql, function (err, result) {
        if (err) {
            console.error("Error al eliminar usuario:", err);
            return res.status(500).send("Usuario no encontrado");
        }
        res.status(200).send("Usuario eliminado correctamente");
    });
});

//us

server.get("/us", (req,res)=> {
    const idCasco = req.query.idCasco;
    const sql = `SELECT nombre FROM usuarios WHERE id_casco ='${idCasco}'`;
    console.log(sql);
    poolmysql.query(sql, function(err,result){
    if(err)throw console.log(err);
        res.json(result);

    })
})




// Configuración de Socket.io
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('sendMessage', (messageData) => {
        const { id_casco, message } = messageData;
        const formattedMessage = `Usuario: ${id_casco} Mensaje: ${message}`;
        
        io.emit('messageToClient', formattedMessage);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.post('/admin', (req, res) => {
    if (isOn) {
        console.log('Enviar "a" al Arduino');
        isOn = false;
        res.send('Apagar (a) enviado');
    } else {
        console.log('Enviar "e" al Arduino');
        isOn = true;
        res.send('Encender (e) enviado');
    }
});

// Servidor escuchando en el puerto 4000
httpServer.listen(4000, () => {
    console.log('Servidor en línea en el puerto 4000');
});
