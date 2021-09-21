/* PATH:http://localhost:8010/api/usuario/registro */

const { Router } = require("express");
const { check } = require("express-validator");
const { mensajes, listaDeMensajes, pruebas, mensajeEnVisto} = require("../controllers/mensaje");
const { verificarSala } = require("../helpers/verificacion-mysql");
const { existeSalaID } = require("../middlewares/db-validacion");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();

//mandar mensaje
router.post('/:idsala', [
    validarJWT, 
    check('mensaje', 'El mensaje tiene que tener un caracter como minimo').not().isEmpty(),
    validarCampos,
],mensajes) 

//lista de todos los mensaje de una sala
router.get('/:id',[
    validarJWT,
    validarCampos,
] ,listaDeMensajes) 

router.post('/msg/leer', [
    
    validarJWT
], mensajeEnVisto)

//esta ruta solo para pruebas
router.get('/pruebas/:id', pruebas) 


module.exports = router;