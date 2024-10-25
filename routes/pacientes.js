
const {Router} = require('express');
const {getPacientes,
getPaciente,
postPaciente,
putPaciente,
deletePaciente} = require('../controller/pacientecontroller');
const router = Router();

//aquí se van a colocar todas las rutas del proyecto

router.get('/', getPacientes);
router.get('/:cve', getPaciente);
router.post('/',    postPaciente);
router.put('/:cve', putPaciente);
router.delete('/:cve', deletePaciente);

module.exports = router;