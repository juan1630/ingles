
const fs = require('fs');
const pdfKit = require('pdfkit');
const PDF = require('../models/pdfs');


 const generatePdf = (data)=>{

    const doc = new pdfKit();
    doc.pipe(fs.createWriteStream(`Routes/pdf/${data.id}.pdf`));

    doc.text(`Se otorga el presente RECONOCIMIENTO al alumno: ${data.nombre}`), {aling:"center"};
    doc.end();

    let datos = {
        title:data.id
    }
    const pdf = new PDF(datos)
    pdf.save((error)=>{
        console.log(error)
    })

}

module.exports = {
    generatePdf
}