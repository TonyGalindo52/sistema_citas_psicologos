const { DataTypes } = require('sequelize');
const sequelize = require('../database/conecta'); // Asegúrate de que este archivo apunta correctamente a tu conexión

const Especialidad = sequelize.define('Especialidad', {
    Id_especialidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'especialidad',
    timestamps: false
});

module.exports = Especialidad;
