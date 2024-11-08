const { DataTypes } = require('sequelize');
const db = require('../database/conecta'); // Ajusta la ruta si es necesario

const Servicio = db.define('Servicio', {
    Id_servicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Id_psicologo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Tratamiento: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Costo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'servicio', // Asegúrate de que coincida con el nombre de tu tabla
    timestamps: false
});

module.exports = Servicio;
