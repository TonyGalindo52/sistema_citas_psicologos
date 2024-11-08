/*const { Router } = require('express');
const {
    getServicios,
    getServicio,
    postServicio,
    putServicio,
    deleteServicio
} = require('../controller/serviciocontroller'); // Ajusta la ruta si es necesario

const router = Router();

// Ruta para obtener todos los servicios
router.get('/', getServicios);

// Ruta para obtener un servicio por su ID
router.get('/:id', getServicio);

// Ruta para crear un nuevo servicio
router.post('/', postServicio);

// Ruta para actualizar un servicio existente
router.put('/:id', putServicio);

// Ruta para eliminar un servicio
router.delete('/:id', deleteServicio);

module.exports = router;
*/
const { Router } = require("express");
const { getServicioVista } = require("../controller/serviciocontroller");

const router = Router();

// Ruta para obtener la lista de servicios
router.get("/lista", getServicioVista);

module.exports = router;
