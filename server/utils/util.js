const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

// Function to generate PDF
function createPolicyPdf(data, filename) {
  const doc = new PDFDocument();
    const filepath = path.join(__dirname,'documents',filename);
  const stream = fs.createWriteStream(filepath)

  doc.pipe(stream);

  // Example content — you can customize this
  doc.fontSize(20).text('Insurance Policy Document', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Policy Number: ${data.policyNumber}`);
  doc.text(`Name: ${data.name}`);
  doc.text(`Email: ₹${data.email}`);
  doc.text(`Insurance Type: ${data.insuranceType}`);
  doc.text(`Start Date: ${data.startDate}`);
  doc.text(`Expiry Date: ${data.expiryDate}`);

  doc.end();

  return `/pdfs/${filename}`;
}

module.exports={createPolicyPdf}