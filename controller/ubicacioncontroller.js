const { response } = require("express");
const UbicacionModel = require('../models/ubicacion');

// Obtener todas las ubicaciones
const getUbicaciones = async (req, resp = response) => {
    try {
        const ubicaciones = await UbicacionModel.findAll();
        resp.json(ubicaciones);
    } catch (error) {
        console.error("Error al obtener ubicaciones:", error);
        resp.status(500).json({ error: "Error al obtener las ubicaciones" });
    }
};

// Obtener una ubicación específica por ID
const getUbicacion = async (req, resp = response) => {
    const { id } = req.params;
    try {
        const ubicacion = await UbicacionModel.findByPk(id);
        if (!ubicacion) {
            return resp.status(404).json({ mensaje: "Ubicación no encontrada" });
        }
        resp.json(ubicacion);
    } catch (error) {
        console.error("Error al obtener la ubicación:", error);
        resp.status(500).json({ error: "Error al obtener la ubicación" });
    }
};

// Crear una nueva ubicación
const postUbicacion = async (req, resp = response) => {
    const { Telefono, Estado, Ciudad, Calle, Numero, Colonia, Cp } = req.body;
    try {
        const nuevaUbicacion = await UbicacionModel.create({
            Telefono,
            Estado,
            Ciudad,
            Calle,
            Numero,
            Colonia,
            Cp
        });
        resp.json(nuevaUbicacion);
    } catch (error) {
        console.error("Error al crear la ubicación:", error);
        resp.status(500).json({ error: "Error al crear la ubicación" });
    }
};

// Actualizar una ubicación existente
const putUbicacion = async (req, resp = response) => {
    const { id } = req.params;
    const { Telefono, Estado, Ciudad, Calle, Numero, Colonia, Cp } = req.body;

    try {
        const ubicacion = await UbicacionModel.findByPk(id);
        if (!ubicacion) {
            return resp.status(404).json({ mensaje: "Ubicación no encontrada" });
        }

        await ubicacion.update({
            Telefono,
            Estado,
            Ciudad,
            Calle,
            Numero,
            Colonia,
            Cp
        });

        resp.json(ubicacion);
    } catch (error) {
        console.error("Error al actualizar la ubicación:", error);
        resp.status(500).json({ error: "Error al actualizar la ubicación" });
    }
};

// Eliminar una ubicación (eliminación física)
const deleteUbicacion = async (req, resp = response) => {
    const { id } = req.params;
    try {
        const ubicacion = await UbicacionModel.findByPk(id);
        if (!ubicacion) {
            return resp.status(404).json({ mensaje: "Ubicación no encontrada" });
        }

        await ubicacion.destroy(); // Eliminación física
        resp.json({ mensaje: "Ubicación eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la ubicación:", error);
        resp.status(500).json({ error: "Error al eliminar la ubicación" });
    }
};

module.exports = {
    getUbicaciones,
    getUbicacion,
    postUbicacion,
    putUbicacion,
    deleteUbicacion
};
