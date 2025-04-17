const pdfkit = require("pdfkit");
const fs = require("fs");

const generatePdf= (data)=> {

    const doc = new pdfkit();
    doc.pipe(fs.createWriteStream(`../documents/${data.policyNumber}.pdf`));

    doc.fillColor("Blue")
    .fontSize(20)
    .text("LM Insurance");

    doc.end();
}

const sendMail = () =>{

}

module.exports = {generatePdf,sendMail};