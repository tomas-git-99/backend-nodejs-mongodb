const { Mensaje } = require("../models");
const jwt = require ('jsonwebtoken');
const { default: fetch } = require("node-fetch");
const { verificarSala, verificarUsuario } = require("../helpers/verificacion-mysql");
const { findOne } = require("../models/mensaje");
require('dotenv').config();verificarUsuario



const mensajes = async(req, res) => {

    try {

        const {  mensaje:mensaje_persona} = req.body;

        const { idsala } = req.params;

        const token = req.header('x-token')

        const dato = await verificarSala(idsala, token)

        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        
        const { sala:{id:idSala, creado_por_ID, invitado_ID} } = dato;




        const datos = {
            
            idSalaSQL: idSala,
            de: id,
            para: invitado_ID == id? creado_por_ID : invitado_ID,
            mensaje:mensaje_persona,
            
        }
        
        //guardando en la base de datos el mensaje

        const mensaje = new Mensaje(datos);


        
        await mensaje.save()
          res.json({        
            mensaje
            })

        
    } catch (error) {
        return res.status(500).json({ 
            ok:false,
            error,
        })
    }

}

const listaDeMensajes = async(req, res) => {

    try {
        const { id } = req.params;
        //con esto muestro toda el historia de la sala de chat en ese momento
        const mensajes = await Mensaje.find({idSalaSQL:id});
        
        res.json({
            ok: true,
            mensajes
        })
    } catch (error) {
        return res.status(500).json({ 
            ok:false,
            msg: error,
        })
    }
}

const pruebas = async (req, res) => {

   

    try {
        const { id } = req.params;
        /* const mensajes = await Mensaje.find({idSalaSQL:id}); */



        /* const mensajes = await Mensaje.find({idSalaSQL:[105, 106], estado:false}); */
        const mensajes = await Mensaje.find( {idSalaSQL:[151,155], estado:true}).select('estado').select('idSalaSQL').select('de').select('para');



 

        res.json({
            ok: true,
            mensajes

            
        })
    } catch (error) {

        return res.status(500).json({ 
            ok:false,
            msg: error,
        })
    }

    
 
}


const mensajeEnVisto = async (req, res) => {

    const listaMensajes  = req.body;

    const mensajes = await Mensaje.find( {idSalaSQL:listaMensajes.lista, estado:true}).select('estado').select('idSalaSQL').select('de').select('para');

    res.json({
        ok:true,
        mensajes
    })

}


const marcarVisto = async (req, res) => {

    const { id } = req.params;

    const mensajes = await Mensaje.find( {idSalaSQL:id} )

    mensajes.map( e => {
        e.estado = false;
        e.save();
    })


    res.json({
        ok: true,
    })
}


module.exports = {
    mensajes,
    listaDeMensajes,
    pruebas,
    mensajeEnVisto,
    marcarVisto
    
}


