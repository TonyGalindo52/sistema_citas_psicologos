const { DataTypes } = require('sequelize');
const db = require('../database/conecta'); // Ajusta la ruta si es necesario

const Ubicacion = db.define('ubicacion', {
    Id_ubicacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Telefono: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    Estado: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Ciudad: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Calle: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Numero: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    Colonia: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Cp: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    tableName: 'ubicacion', // Asegúrate de que coincida con el nombre de tu tabla
    timestamps: false
});

module.exports = Ubicacion;
