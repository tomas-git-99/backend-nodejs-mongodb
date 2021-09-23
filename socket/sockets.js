const { Socket } = require("socket.io")
const { validarJWT } = require("../middlewares/validar-jwt")
const jwt = require ('jsonwebtoken');
const { Mensaje } = require("../models");
const { verificarSala, ulitmoMensaje, listaSalas, buscador } = require("../helpers/verificacion-mysql");



const SocketClient = async( socket = new Socket(), io ) =>{

    socket.on('enviar-mensaje', async({ idSala, mensaje, token }) => {

      

        const { id } =  jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        
        const dato =  await verificarSala(idSala, token);
        

        if(dato.ok == false) {
            socket.emit('salir-sala', dato);
            
        }
        const { sala:{id:idSalas, creado_por_ID, invitado_ID} } = dato;

        
   
        
        
        const datos = {
            
            idSalaSQL: idSalas,
            de: id,
            para: invitado_ID == id? creado_por_ID : invitado_ID,
            mensaje:mensaje,
            
        }
        
        
        const mensajes = new Mensaje(datos);
        
    

        await mensajes.save();

        await ulitmoMensaje(idSala, mensaje);

        const salas = await listaSalas(token);

        socket.broadcast.emit('recibir-mensaje', mensajes);


        //actualizar lista de conctactos para que se mueva de arriba para abajo
        socket.emit('contactos', salas);


        
    })

    socket.on("buscar", async({id, valor}) => {

        const resultado = await buscador(id, valor);
    

        socket.emit("resultados", resultado);

    })
    
    socket.on("marcar-visto", async(id)=> {

        const mensajes = await Mensaje.find( {idSalaSQL:id} )

        mensajes.map( e => {
            e.estado = false;
            e.save();
        })

    
    })

    
}

















module.exports = SocketClient