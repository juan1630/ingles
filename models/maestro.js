const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/ingles");

const teacher = {
    nombre:{
        type:String,
        require:true
    },
    apellido={
     type:String,
     require:true   
    },
    correo:{
        type:String,
        require:true
    }, 
    password={
        type:String,
        require:true
    }
}