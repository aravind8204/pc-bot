const PDFDocument = require('pdfkit');
const { put } = require('@vercel/blob');

// Function to generate PDF and upload to Vercel Blob
async function createPolicyPdf(data, filename) {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks = [];

      // Capture data in memory
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', async () => {
        const pdfBuffer = Buffer.concat(chunks);

        const { url } = await put(`${filename}`, pdfBuffer, {
          access: 'public',
          token: "vercel_blob_rw_NBIkKdTRfIMnsXeg_h1Xl4FWOwkj1qvOHk4733deKPaJn7j",
          allowOverwrite: true
        });

        resolve(url);
      });

      // PDF content
      doc.fontSize(20).text('Insurance Policy Document', { align: 'center' });
      doc.moveDown();
      doc.fontSize(14).text(`Policy Number: ${data.policyNumber}`);
      doc.text(`Name: ${data.name}`);
      doc.text(`Email: ${data.email}`); // Fixed '₹' symbol
      doc.text(`Insurance Type: ${data.insuranceType}`);
      doc.text(`Start Date: ${data.startDate}`);
      doc.text(`Expiry Date: ${data.expiryDate}`);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { createPolicyPdf };
