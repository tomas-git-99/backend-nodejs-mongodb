const { Schema, model } = require('mongoose');



const MensajeSchema = Schema({
    // id de sala
     
    idSalaSQL:{
        type: Number,
        required: true,
    },
    de:{
        type: Number,
        required: true,
    },
    para:{
        type: Number,
        default: 0,
        required: true,
    },
    mensaje:{
        type:String,
        required: true,
    },
    estado:{
        type:Boolean,
        default:true,
        required: true,
    }

},{
    timestamps:true
} );


MensajeSchema.method('toJSON', function() {
    const {__v,_id, ...object} = this.toObject();
    return object;
})

module.exports = model('Mensaje', MensajeSchema);