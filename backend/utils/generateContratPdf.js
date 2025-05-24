const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

const generateContractPdf = (contrat, user, projets = [], outputPath) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });

      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);

      // HEADER
      const headerHeight = 120;
      const headerColor = '#1F4E79';
      doc.rect(0, 0, doc.page.width, headerHeight).fill(headerColor);

      const logoPath = path.join(__dirname, '..', 'assets', 'Tunisair-logo.png');
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 40, 40, { width: 120 });
      }

      doc.fontSize(20)
        .fillColor('#FFFFFF')
        .text('CONTRAT JURIDIQUE', 200, 50, { align: 'center', underline: true });

      doc.moveDown(3);

      // INFOS CONTRAT
      doc.fontSize(14).fillColor('#1F4E79').text('1. Informations sur le contrat', { underline: true });
      doc.fontSize(12).fillColor('black');
      doc.text(`Objet : ${contrat.objet}`);
      doc.text(`Montant : ${contrat.montant ?? 'N/A'} DNT`);
      doc.text(`Direction : ${contrat.direction ?? 'N/A'}`);
      doc.text(`Date signature : ${contrat.dateSignature?.toLocaleDateString() ?? 'N/A'}`);
      doc.text(`Date effet : ${contrat.dateEffet?.toLocaleDateString() ?? 'N/A'}`);
      doc.text(`Durée : ${contrat.duree ?? 'N/A'}`);
      doc.text(`Date fin : ${contrat.dateFin?.toLocaleDateString() ?? 'N/A'}`);
      doc.text(`Préavis : ${contrat.datePreavis?.toLocaleDateString() ?? 'N/A'}`);
      doc.moveDown(2);

      // INFOS UTILISATEUR
      doc.fontSize(14).fillColor('#1F4E79').text('2. Utilisateur', { underline: true });
      doc.fontSize(12).fillColor('black');
      doc.text(`Nom : ${user.nom} ${user.prenom}`);
      doc.text(`Email : ${user.email}`);
      doc.text(`Téléphone : ${user.phone ?? 'N/A'}`);
      doc.moveDown(2);

      // PROJETS ASSOCIÉS
      if (projets.length > 0) {
        doc.fontSize(14).fillColor('#1F4E79').text('3. Projets associés', { underline: true });
        projets.forEach((projet, index) => {
          doc.fontSize(12).fillColor('black')
            .text(`• ${index + 1}) Nom : ${projet.nom} | Description : ${projet.description ?? 'N/A'}`);
        });
      }

      doc.moveDown(2);

      // FOOTER
      doc.fontSize(10).fillColor('#999').text('Centre juridique Tunisair - Contact : (+216) 71 754 000', { align: 'center' });

      doc.end();
      stream.on('finish', () => resolve());
      stream.on('error', reject);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = generateContractPdf;
