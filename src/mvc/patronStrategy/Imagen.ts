import { Descargar } from './Descargar';
import * as htmlToImage from 'html-to-image';
import { BautizoConNombres } from '../../interfaces/helper/interface.helper';

export class Imagen implements Descargar {
  descargarCertificado(data: BautizoConNombres): void {
    // Implementación para descargar el certificado en formato Imagen
    console.log('Descargando certificado en formato Imagen...');
    // Aquí puedes usar una librería como html-to-image para generar la imagen
    // Código de ejemplo con html-to-image
    const element = document.createElement('div');
    element.style.width = '900px'; // Ancho del certificado
    element.style.height = '900px'; // Alto del certificado
    element.style.textAlign = 'center'; // Centrado del contenido
    element.style.backgroundColor = '#ffffff'; // Fondo blanco

    element.innerHTML = `
      <div style="width: 80%; margin: 0 auto;">
        <h1 style="margin-bottom: 20px;">Certificado de Bautizo</h1>
        <p style="text-align: left;">Se hace presente el certificado de Bautizo para ${data.miembroNombre} con sus padrinos:</p>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <div style="text-align: left;">
            <p>Padrino:</p>
            <p>Madrina:</p>
          </div>
          <div style="text-align: right;">
            <p>${data.padrino}</p>
            <p>${data.madrina}</p>
          </div>
        </div>
        <p>Lugar: ${data.lugar}</p>
        <p>Fecha: ${data.fecha}</p>
        <p style="margin-top: 20px;">-----------------------------------------------------------------------------------------------------------------</p>
        <div style="display: flex; justify-content: space-between; margin-top: 20px;">
          <div style="text-align: left;">
            <p>Firma Párroco ________________________</p>
          </div>
          <div style="text-align: right;">
            <p>Firma Obispo _________________________</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(element);
    htmlToImage.toPng(element).then((dataUrl) => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `certificado${data.miembroNombre}.png`;
      link.click();
      document.body.removeChild(element);
    });
  }
}
