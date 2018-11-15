const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { URI } = require('../config/mongoConnect');

mongoose.set('useCreateIndex', true);
mongoose.connect(URI, { useNewUrlParser: true },(error)=>{
    if(error){
        console.log(error);
    }
});

const pdf ={
   title:{  type:String, required:true},
   user:{ type:Schema.ObjectId, ref:"User" }
    
}
const PDF = mongoose.model("Pdf",pdf);
module.exports = PDF;