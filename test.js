const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs').promises;

// Ruta del archivo PDF de entrada y salida
const inputPdfPath = 'test.pdf';
const outputPdfPath = 'test.pdf';

// Definir los datos y coordenadas en un objeto JSON
const elementosParaAgregar = [
  {
    texto: '1',
    x: 166,
    y: 684,
  },
  {
    texto: '1',
    x: 290,
    y: 650,
  },
  {
    texto: 'c/ 8h',
    x: 318,
    y: 650,
  },
  {
    texto: 'Paracetamol 500mg',
    x: 46,
    y: 630,
  },
  {
    texto: '3 días',
    x: 290,
    y: 714,
  },
  {
    texto: `
            DNI: 12345678A
            Nombre: Juan Pérez
            Fecha: 01/01/2021
    `,
    x: 340,
    y: 724,
  },
  {
    texto: '1',
    x: 166,
    y: 272,
  },
  {
    texto: '1',
    x: 290,
    y: 240,
  },
  {
    texto: 'c/ 8h',
    x: 318,
    y: 240,
  },
  {
    texto: 'Paracetamol 500mg',
    x: 46,
    y: 220,
  },
  {
    texto: '3 días',
    x: 290,
    y: 304,
  },
  {
    texto: `
            Juan Pérez 01/01/2021
            12345678A
    `,
    x: 340,
    y: 314,
  },
];



async function addTextToPdf() {
  try {
    // Leer el archivo PDF de entrada
    const inputPdfBytes = await fs.readFile(inputPdfPath);

    // Crear un documento PDF a partir de los bytes del archivo de entrada
    const pdfDoc = await PDFDocument.load(inputPdfBytes);

    // Obtener la primera página del PDF
    const firstPage = pdfDoc.getPages()[1];

    // Recorrer el objeto JSON y agregar texto en las coordenadas especificadas
    elementosParaAgregar.forEach((elemento) => {
      firstPage.drawText(elemento.texto, {
        x: elemento.x,
        y: elemento.y,
        size: 12, // Tamaño de la fuente
        color: rgb(0, 0, 0), // Color del texto (negro)
      });
    });

    // Guardar el PDF modificado en un nuevo archivo
    const modifiedPdfBytes = await pdfDoc.save();

    // Escribir el archivo PDF de salida
    await fs.writeFile(outputPdfPath, modifiedPdfBytes);

    console.log('Texto agregado con éxito en la primera página del PDF.');
  } catch (error) {
    console.error('Error al agregar texto al PDF:', error);
  }
}

addTextToPdf();
