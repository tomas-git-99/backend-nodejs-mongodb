const express = require('express');
const cors = require('cors');

const socketio = require('socket.io');
const http = require('http');

const { dbCOnnection } = require('../db/config');
const SocketClient = require('../socket/sockets');



require('dotenv').config();

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        // Http server
        this.server = http.createServer(this.app);
        // Configuraciones de sockets

        this.io = socketio(this.server, {
            cors:{
                origin:"",
            }
        });

        this.path ={
            crear:'/api/crear',
            mensaje:'/api/mensaje',
        }
        this.configurarSockets();

        this.conectarDB();

        this.middlewares();

        this.routers();
    }

    async conectarDB(){
        await dbCOnnection();
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.static('public'))
        this.app.use(express.json());

    }
    
    routers(){
    
        this.app.use(this.path.mensaje, require('../routers/mensaje'));
    }

    configurarSockets(){

        this.io.on('connection', (socketio) => SocketClient(socketio, this.io) );

       
    }


    run(){
        this.server.listen(this.port,  () => {
            console.log('conectado ' + this.port)
        })
    }


}




module.exports = Server;