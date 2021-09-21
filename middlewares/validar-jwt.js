const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { verificarUsuario } = require('../helpers/verificacion-mysql');
require('dotenv').config();verificarUsuario



const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    
    try {
        
        const {id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        
        
        // leer el usuario que corresponde al uid


        if( id == 0 || id == '0'){
            return next();
        }

        const usuario = await verificarUsuario( id );

        
        if (!usuario){
            return res.status(401).json({
                ok:false,
                msg:'token no valido'
            })
        }
        // verificar si el uid tiene estado esta en true
        if ( !usuario.usuario.estado){
            return res.status(401).json({
                ok:false,
                msg:'token no valido'
            })
        }
        req.usuario = usuario; 

        next();

    } catch (error) {

        return res.status(401).json({
            ok:false,
            msg:'El token no es el correcto'
        })
        
    }


}




module.exports = {
    validarJWT,
}