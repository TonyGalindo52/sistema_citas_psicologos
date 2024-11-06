const { Router } = require('express');
const { 
    getEspecialidad, 
    getEspecialidades, 
    postEspecialidad, 
    putEspecialidad, 
    deleteEspecialidad 
} = require('../controller/especialidadcontroller');

const router = Router();

// Obtener todas las especialidades
router.get('/', getEspecialidades);

// Obtener una especialidad específica por su ID
router.get('/:cve', getEspecialidad);

// Crear una nueva especialidad
router.post('/', postEspecialidad);

// Actualizar una especialidad existente
router.put('/:cve', putEspecialidad);

// Eliminar (lógicamente o físicamente) una especialidad
router.delete('/:cve', deleteEspecialidad);

module.exports = router;
