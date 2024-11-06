const { Router } = require('express');
const {
    getUbicaciones,
    getUbicacion,
    postUbicacion,
    putUbicacion,
    deleteUbicacion
} = require('../controller/ubicacioncontroller'); // Asegúrate de que esta ruta sea correcta

const router = Router();

// Rutas para Ubicacion
router.get('/', getUbicaciones);           // Obtener todas las ubicaciones
router.get('/:id', getUbicacion);          // Obtener una ubicación específica por ID
router.post('/', postUbicacion);           // Crear una nueva ubicación
router.put('/:id', putUbicacion);          // Actualizar una ubicación existente por ID
router.delete('/:id', deleteUbicacion);    // Eliminar una ubicación por ID

module.exports = router;
