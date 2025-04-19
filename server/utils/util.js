const PDFDocument = require('pdfkit');
const { put } = require('@vercel/blob');
const { PassThrough } = require('stream');

// Function to generate PDF and upload to Vercel Blob
async function createPolicyPdf(data, filename) {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const stream = new PassThrough(); // memory stream
      const chunks = [];

      // Capture chunks of the PDF from stream
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

      doc.pipe(stream); // connect doc to in-memory stream

      // PDF content
      doc.fontSize(20).text('Insurance Policy Document', { align: 'center' });
      doc.moveDown();
      doc.fontSize(14).text(`Policy Number: ${data.policyNumber}`);
      doc.text(`Name: ${data.name}`);
      doc.text(`Email: ${data.email}`);
      doc.text(`Insurance Type: ${data.insuranceType}`);
      doc.text(`Start Date: ${data.startDate}`);
      doc.text(`Expiry Date: ${data.expiryDate}`);

      doc.end(); // finalize PDF
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { createPolicyPdf };