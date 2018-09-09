const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { URI } = require('../config/mongoConnect');

mongoose.set('useCreateIndex', true);
mongoose.connect(URI, { useNewUrlParser: true },(error)=>{
    if(error){
        console.log(error);
    }
});
//colecciones como tablas 
//docs  filas
const user = {
    nombre:{
        type:String,
        required:true
    } ,
    apellido:{
        type:String,
        required:true
    },
    numeroControl:{
    type:Number,
    required:true
    },
    carrera:{
        type:String,
        required:true
    },
    semestre:{
        type:Number,
        required:true
        },
    correo:{ type: String,
              unique:true,
              required:[true, "Correo unico"]  },
    pass:{
        type:String,
        required:true
    },
    pago:{
    type:Boolean,
    default:false
    },
    nivel:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"usuario"
    }
}


const userSchema = new Schema(user);

const User = mongoose.model('User', userSchema);
                    //nombre de la coleccion
module.exports.User = User;
