const {Router} = require('express');
const {getPsicologos,
getPsicologo,
postPsicologo,
putPsicologo,
deletePsicologo} = require('../controller/psicologocontroller');
const router = Router();

//aquí se van a colocar todas las rutas del proyecto

router.get('/', getPsicologos);
router.get('/:cve', getPsicologo);
router.post('/',    postPsicologo);
router.put('/:cve', putPsicologo);
router.delete('/:cve', deletePsicologo);

module.exports = router;