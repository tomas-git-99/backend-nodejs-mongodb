const jwt = require ('jsonwebtoken');
require('dotenv').config();

const generarJWT = ( uid = '') => {

    return new Promise ((resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if ( err ) {
                console.log( err );
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        })
    })


}

const generadorJWTmensaje = ( uid = '', tiempo) => {

    return new Promise ((resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: tiempo
        }, (err, token) => {
            if ( err ) {
                console.log( err );
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        })
    })


}


module.exports = {
    generarJWT,
    generadorJWTmensaje
}