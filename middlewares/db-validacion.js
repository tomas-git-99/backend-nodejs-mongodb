
const { verificarSala } = require("../helpers/verificacion-mysql");


const existeSalaID = async(req, res, next) => {

    try {
        
        const { idsala } = req.params;
        const token = req.header('x-token');
        const {  ok, msg } = await verificarSala(idsala, token);
    
        if (!ok) {
            return res.status(404).json({ 
                ok:false,
                msg
            })
        } 

        next();
    } catch (error) {
        res.status(500).json({ 
            ok:false,
            msg: error
        })
    }
    
}

module.exports = {
    existeSalaID
}