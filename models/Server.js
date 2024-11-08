const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/conecta');
const path = require('path');

class Server {
    constructor() {
        this.app = express();
        this.port = 8001;
        this.dbConnection();
        this.middleware();

        // Configuración de rutas
        this.app.use('/cita', require('../routes/citas'));
        this.app.use('/psicologo', require('../routes/psicologos'));
        this.app.use('/usuario', require('../routes/usuarios'));
        this.app.use('/paciente', require('../routes/pacientes'));
        this.app.use('/ubicacion', require('../routes/ubicacion')); 
        this.app.use('/especialidad', require('../routes/especialidades'));// Nueva ruta para ubicaciones
        this.app.use('/servicio', require('../routes/servicios'));
    }

    async dbConnection() {
        try {
            await dbConnection.authenticate();
            console.log("Base de datos conectada");
        } catch (error) {
            console.log(error);
        }
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());

        // Servir archivos estáticos
        this.app.use(express.static(path.join(__dirname, '../public')));

        // Ruta para enviar `psicologo.html`
        this.app.get('/views/psicologo.html', (req, res) => {
            res.sendFile(path.join(__dirname, '../views/psicologo.html'));
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Escuchando en puerto', this.port);
        });
    }
}

module.exports = Server;
