const mongoose = require('mongoose');
require('dotenv').config();


const dbCOnnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify:false
        });

        console.log('Base de datos conectado');

    }catch(error){
        throw new Error('Error a la hota de iniciar la base de datos')
    }

}



module.exports = {
    dbCOnnection
} 