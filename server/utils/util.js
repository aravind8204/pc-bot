const PDFDocument = require('pdfkit');
const { put } = require('@vercel/blob');
const { PassThrough } = require('stream');
const moment = require('moment');

// Function to generate styled PDF and upload to Vercel Blob
async function createPolicyPdf(data, filename) {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const stream = new PassThrough();
      const chunks = [];

      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', async () => {
        const pdfBuffer = Buffer.concat(chunks);

        try {
          const { url } = await put(filename, pdfBuffer, {
            access: 'public',
            token: "vercel_blob_rw_NBIkKdTRfIMnsXeg_h1Xl4FWOwkj1qvOHk4733deKPaJn7j",
            allowOverwrite: true
          });

          resolve(url);
        } catch (uploadErr) {
          reject(uploadErr);
        }
      });

      doc.pipe(stream);

      // Header
      doc
        .fontSize(22)
        .fillColor('#007ACC')
        .text('INSURANCE POLICY DOCUMENT', { align: 'center' })
        .moveDown(0.5);

      doc
        .fontSize(12)
        .fillColor('black')
        .text(`Generated on: ${moment().format('MMMM Do YYYY, h:mm A')}`, {
          align: 'center',
        })
        .moveDown(1.5);

      // Section: Policy Details
      doc
        .fontSize(16)
        .fillColor('#333')
        .text('📄 Policy Details', { underline: true })
        .moveDown(0.5);

      doc.fontSize(12).fillColor('black');
      doc.text(`Policy Number: ${data.policyNumber}`);
      doc.text(`Insurance Type: ${data.insuranceType}`);
      if (data.insuranceType === "Vehicle Insurance") {
        doc.text(`Deductible Amount: ${data.deductible}`);
      } else {
        doc.text(`Coverage Amount: ${data.coverageAmount}`);
      }
      doc.text(`Start Date: ${moment(data.startDate).format('LL')}`);
      doc.text(`Expiry Date: ${moment(data.expiryDate).format('LL')}`);
      doc.moveDown(1);

      // Section: Insured Person
      doc
        .fontSize(16)
        .fillColor('#333')
        .text('👤 Insured Person', { underline: true })
        .moveDown(0.5);

      doc.fontSize(12).fillColor('black');
      doc.text(`Full Name: ${data.name}`);
      doc.text(`Email: ${data.email}`);
      if (data.mobile) doc.text(`Phone: ${data.mobile}`);
      doc.moveDown(1);

      // Footer
      doc
        .fontSize(10)
        .fillColor('gray')
        .text('Thank you for choosing our insurance services.', {
          align: 'center',
        });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { createPolicyPdf };
