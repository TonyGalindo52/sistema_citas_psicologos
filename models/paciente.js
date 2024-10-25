const { DataTypes } = require('sequelize');

const db = require('../database/conecta');

const paciente = db.define('paciente',{
    Id_paciente:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    Ocupacion:{
        type: DataTypes.STRING,
    },
    Fecha_registro: {
        type: DataTypes.DATE,
    }
}, {
    timestamps: false,
});

module.exports = paciente;