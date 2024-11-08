/*const { response } = require("express");
const ServicioModel = require('../models/servicio');
const { QueryTypes } = require('sequelize');

// Obtener todos los servicios
const getServicios = async (req, resp = response) => {
    try {
        const servicios = await ServicioModel.sequelize.query(
            "SELECT * FROM servicio",
            { type: QueryTypes.SELECT }
        );
        resp.json(servicios);
    } catch (error) {
        console.error("Error al obtener servicios:", error);
        resp.status(500).json({ error: "Error al obtener la lista de servicios" });
    }
}

// Obtener un servicio por su ID
const getServicio = async (req, resp = response) => {
    const id = req.params.id;
    try {
        const servicio = await ServicioModel.findByPk(id);
        if (!servicio) {
            return resp.status(404).json({
                respuesta: false,
                resultado: "Servicio no encontrado"
            });
        }
        resp.json(servicio);
    } catch (error) {
        console.error("Error al obtener el servicio:", error);
        resp.status(500).json({ error: "Error al obtener el servicio" });
    }
}


// Crear un nuevo servicio
const postServicio = async (req, resp = response) => {
    const { body } = req;
    const servicioData = {
        Id_psicologo: body.Id_psicologo,
        Tratamiento: body.Tratamiento,
        Costo: body.Costo,
        Descripcion: body.Descripcion
    };

    try {
        const servicio = await ServicioModel.create(servicioData);
        resp.json(servicio);
    } catch (error) {
        console.error("Error al crear el servicio:", error);
        resp.status(500).json({ error: "Error al crear el servicio" });
    }
}

// Actualizar un servicio por su ID
const putServicio = async (req, resp = response) => {
    const id = req.params.id;
    const { body } = req;

    try {
        const updatedRows = await ServicioModel.update(
            {
                Tratamiento: body.Tratamiento,
                Costo: body.Costo,
                Descripcion: body.Descripcion
            },
            {
                where: { Id_servicio: id }
            }
        );

        if (updatedRows[0] === 0) {
            return resp.status(404).json({
                mensaje: "Servicio no encontrado"
            });
        }

        const updatedServicio = await ServicioModel.findByPk(id);
        resp.json(updatedServicio);
    } catch (error) {
        console.error("Error al actualizar el servicio:", error);
        resp.status(500).json({ error: "Error al actualizar el servicio" });
    }
}

// Eliminar un servicio por su ID
const deleteServicio = async (req, resp = response) => {
    const id = req.params.id;
    try {
        const servicio = await ServicioModel.findByPk(id);
        if (!servicio) {
            return resp.status(404).json({
                mensaje: "Servicio no encontrado"
            });
        }
        await servicio.destroy();
        resp.json({ mensaje: "Servicio eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el servicio:", error);
        resp.status(500).json({ error: "Error al eliminar el servicio" });
    }
}

// Exportar los métodos
module.exports = {
    getServicios,
    getServicio,
    postServicio,
    putServicio,
    deleteServicio
};*/
const { response } = require("express");
const ServicioModel = require('../models/servicio'); // Asegúrate de que este modelo esté correctamente definido
const { QueryTypes } = require('sequelize');

const getServicioVista = async (req, resp = response) => {
    try {
        // Realizas una consulta SQL directa con Sequelize
        const servicios = await ServicioModel.sequelize.query(
            `SELECT 
                s.Id_servicio AS Id_servicio,
                s.Tratamiento,
                s.Costo,
                s.Descripcion
            FROM 
                servicio AS s;`, // Usar alias en la tabla si es necesario
            { type: QueryTypes.SELECT }
        );

        // Respondes con los datos obtenidos
        resp.json(servicios);
    } catch (error) {
        console.error("Error al obtener servicios:", error);
        resp.status(500).json({ error: "Error al obtener la lista de servicios" });
    }
}

module.exports = {
    getServicioVista
};
