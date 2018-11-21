
const fs = require('fs');
const pdfKit = require('pdfkit');
const PDF = require('../models/pdfs');


 const generatePdf = (data)=>{

    if(data.id == undefined){
        return false;
    }
    const doc = new pdfKit();
    doc.pipe(fs.createWriteStream(`./pdf/${data.id}.pdf`));

    doc.text(`Se otorga el presente RECONOCIMIENTO al alumno: ${data.nombre}`,{width:410,aling:"center"});
    doc.end();

    let datos = {
        title:data.id
    }
    const pdf = new PDF(datos)
    pdf.save((error)=>{
       if(error){
           console.log(error)
       }
    })

}

module.exports = {
    generatePdf
}