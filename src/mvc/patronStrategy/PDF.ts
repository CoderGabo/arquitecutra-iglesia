import { Descargar } from './Descargar';
import jsPDF from 'jspdf';
import { BautizoConNombres } from '../../interfaces/helper/interface.helper';

export class PDF implements Descargar {
  descargarCertificado(data: BautizoConNombres): void {
    // Implementación para descargar el certificado en formato PDF
    console.log('Descargando certificado en formato PDF...');
    // Aquí puedes usar una librería como jsPDF para generar el PDF
    // Código de ejemplo con jsPDF
    const doc = new jsPDF();
    // Configuración del título
    const titulo = `Certificado de Bautizo de ${data.miembroNombre}`;
    const tituloWidth = doc.getStringUnitWidth(titulo) * doc.internal.pageSize.getWidth() / doc.internal.scaleFactor;
    const tituloX = (doc.internal.pageSize.getWidth() - tituloWidth) / 2;
    doc.text(titulo, tituloX, 10);

    // Datos del padrino y la madrina
    const startY = 20;
    const lineHeight = 10;
    doc.text(`Se hace presente el certificado de Bautizo para ${data.miembroNombre} con sus padrinos:`, 10, startY);
    doc.text('Padrino:', 10, startY + lineHeight * 2);
    doc.line(90, startY + lineHeight * 2.3, 180, startY + lineHeight * 2.3); // Linea bajo el nombre del padrino
    doc.text(data.padrino, 90, startY + lineHeight * 2);
    doc.text('Madrina:', 10, startY + lineHeight * 4);
    doc.line(90, startY + lineHeight * 4.3, 180, startY + lineHeight * 4.3); // Linea bajo el nombre de la madrina
    doc.text(data.madrina, 90, startY + lineHeight * 4);

    // Fecha y lugar de bautizo
    const fechaY = startY + lineHeight * 6;
    doc.text('En la fecha:', 10, fechaY);
    doc.line(90, fechaY + lineHeight * 0.3, 180, fechaY + lineHeight * 0.3); 
    doc.text(data.fecha, 90, fechaY);
    doc.text('En la iglesia:', 10, fechaY + lineHeight * 2);
    doc.line(90, fechaY + lineHeight * 2.3, 180, fechaY + lineHeight * 2.3); // Linea bajo el lugar
    doc.text(data.lugar, 90, fechaY + lineHeight * 2);

    // Firmas del párroco y del obispo
    const firmaY = fechaY + lineHeight * 8;
    const firmaX = 35;
    doc.text('Firma Párroco', firmaX, firmaY);
    doc.text('Firma Obispo', firmaX + 100, firmaY);
    doc.line(firmaX - 5, firmaY - lineHeight * 0.6, firmaX + 40, firmaY - lineHeight * 0.6); // Línea para la firma del párroco
    doc.line(firmaX + 95, firmaY - lineHeight * 0.6, firmaX + 138, firmaY - lineHeight * 0.6); // Línea para la firma del obispo

    doc.save(`certificado${data.miembroNombre}.pdf`);
  }
}
