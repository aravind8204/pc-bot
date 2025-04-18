const pdfkit = require("pdfkit");
const fs = require("fs");
const emailjs = require("@emailjs/nodejs");

const generatePdf= (data)=> {

    const doc = new pdfkit();
    doc.pipe(fs.createWriteStream(`../documents/${data.policyNumber}.pdf`));

    doc.fillColor("Blue")
    .fontSize(20)
    .text("LM Insurance");

    doc.end();
}

const sendMail = async(data) =>{
    const content = {
        userEmail:data.email,
        userName:data.name,
        policyNumber:data.policyNumber,
        insuranceType:data.insuranceType,
        startDate:data.startDate,
        expiryDate:data.expiry,
        permium:data.premium
    }
    try{
        const response = await emailjs.send("service_dpsxrmu","template_yr3r9fq",content,"GzWI8GFdBI5n0kjHB");
        console.log("email sent",response);
    }
    catch(e){
        console.log(e);
    }
    
}

module.exports = {generatePdf,sendMail};