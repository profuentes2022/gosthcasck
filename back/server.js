const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();

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

server.get("/sesiones", (req, res) => {
    const sql = "SELECT * FROM sesiones";

    poolmysql.query(sql, (err, rows) => {
        if (err) {
            console.error("Error al obtener sesiones:", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        res.status(200).json(rows);
    });
});


server.post("/sesiones", (req, res) => {
    const { id, nombre, correo, clave, rol } = req.body;
    const sql = "INSERT INTO sesiones (id, nombre, correo, clave, rol) VALUES (?, ?, ?, ?, ?)";
    const values = [id, nombre, correo, clave, rol];
    
    poolmysql.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error al insertar datos:", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        res.status(201).json({ message: "Datos insertados correctamente" });
    });
});

server.put("/sesiones/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, correo, clave, rol } = req.body;
    const sql = "UPDATE sesiones SET nombre = ?, correo = ?, clave = ?, rol = ? WHERE id = ?";
    const values = [nombre, correo, clave, rol, id];
    
    poolmysql.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error al actualizar sesión:", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No se encontró ninguna sesión para actualizar" });
        }
        res.status(200).json({ message: "Sesión actualizada correctamente" });
    });
});


server.delete("/sesiones/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM sesiones WHERE id = ?";
    
    poolmysql.query(sql, id, (err, result) => {
        if (err) {
            console.error("Error al eliminar datos:", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No se encontró ningún registro para eliminar" });
        }
        res.status(200).json({ message: "Registro eliminado correctamente" });
    });
});



//servidor usado 8000

server.listen(4000, () => {
    console.log('Servidor en línea en el puerto 4000');
});
