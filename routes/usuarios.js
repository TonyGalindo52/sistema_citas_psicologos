const {Router} = require('express');
const {getUsuarios,
getUsuario,
postUsuario,
putUsuario,
deleteUsuario} = require('../controller/usuariocontroller');
const router = Router();

//aquí se van a colocar todas las rutas del proyecto

router.get('/', getUsuarios);
router.get('/:cve', getUsuario);
router.post('/',    postUsuario);
router.put('/:cve', putUsuario);
router.delete('/:cve', deleteUsuario);

module.exports = router;