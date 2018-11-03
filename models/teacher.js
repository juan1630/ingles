const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {URI} = require('../config/mongoConnect');

mongoose.set('useCreateIndex', true);
mongoose.connect(URI, { useNewUrlParser: true }, (error)=>{
    if(error) console.log(error)
})

const teacher= {
    nombre:{
        type:String,
        require:true
    },
    apellido :{
        type:String,
        require:true
    },
    correo:{ type: String,
        unique:true,
        required:[true, "Correo unico"]  },
    pass:{
        type:String,
        required:true
    },nivel:{
        type:Number,
        default:1
    },
    role:{
        type:String,
        default:"teacher"
    },
    description:{
        type:String
    },
    grupo:{
        type:Number
    }
}

const schemaTeacher = new Schema(teacher);
const Teacher = mongoose.model(schemaTeacher);
module.exports.Teacher = Teacher;