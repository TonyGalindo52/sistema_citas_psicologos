const { DataTypes } = require('sequelize');

const db = require('../database/conecta');

const psicologo = db.define('psicologo',{
    Id_psicologo:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    Contraseña:{
        type: DataTypes.STRING,
    },
    Fecha_contratacion: {
        type: DataTypes.DATE,
    }
}, {
    timestamps: false,
});

module.exports = psicologo;