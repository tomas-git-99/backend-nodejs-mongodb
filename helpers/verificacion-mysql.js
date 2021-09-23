const { default: fetch } = require("node-fetch")

require('dotenv').config();

const verificarSala = async (id, token) =>{


    try {
        const dato = await fetch(`http://localhost:5050/api/sala/${id}`,{
             method:'GET',
             body: JSON.stringify(),
             headers: {'Content-Type': 'application/json','x-token': token}},
            
        )
        .then(response => response.json())

        .catch(err => {return err})



        return dato;
    } catch (error) {
        throw new Error(error)
    }
}

const datosDeLaSala = () => {
    
    const datos = {"titulo":"2 sala","tiempo": 5}
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTYyODc2NTI2MSwiZXhwIjoxNjI4Nzc5NjYxfQ.X1tgZrGsf3HHQggzcI4CV3JW-NSBzCFPr6jo-Homhls'
        fetch('http://localhost:5050/api/sala', {
        method:'POST', 
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json', 'x-token': token}}
    )
              .then(response => response.json())
              .then(json => res.json(json))
              .catch(err => console.log(err))

}

const verificarUsuario = async (id) => {

    try {
        const dato = await fetch(`${process.env.DATAMYSQL}auth/${id}`,{
            method:'GET', 
            body: JSON.stringify(),
            headers: { 'Content-Type': 'application/json'}
        })
                           .then(response => response.json())
                           .catch(err => {return err})

        return dato;

    } catch (error) {
        throw new Error(error)
    }
}


const ulitmoMensaje = async (idSala, mensaje) => {



    try {
        const datos = { 
            ultimo_msg:mensaje
        }
        
        const dato = await fetch(`${process.env.DATAMYSQL}sala/mensaje/ulitmo/${idSala}`,{
        method:'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(datos),
        })
        .then(response => response.json())
        .catch(err => {return err})

        return dato;

    } catch (error) {
        
    }
}
const listaSalas = async (token) => {



    try {

        const dato = await fetch(`${process.env.DATAMYSQL}sala/lista/full`,{
        method:'GET',
        headers: { 'Content-Type': 'application/json', 'x-token': token},
        body: JSON.stringify(),
        })
        .then(response => response.json())
        .catch(err => {return err})

        return dato;

    } catch (error) {
        
    }
}


const buscador = async ( id, valor ) =>{

    try {

        const dato = await fetch(`${process.env.DATAMYSQL}sala/buscar/${id}?titulo=${valor}`,{
            method:'GET',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(),
            })
            .then(response => response.json())
            .catch(err => {return err})
    
            return dato;
    
        
    } catch (error) {
        
    }
}



module.exports = {
    verificarSala,
    verificarUsuario,
    ulitmoMensaje,
    listaSalas,
    buscador
}