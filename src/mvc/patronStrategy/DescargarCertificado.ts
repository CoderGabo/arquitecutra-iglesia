import { BautizoConNombres } from '../../interfaces/helper/interface.helper';
import { Descargar } from './Descargar';
import { PDF } from './PDF';

export class DescargarCertificado {
  private estrategia: Descargar;

  constructor() {
    // Inicializamos la estrategia con un valor por defecto
    this.estrategia = new PDF();
  }

  setStrategy(estrategia: Descargar): void {
    this.estrategia = estrategia;
  }

  descargarCertificado(data: BautizoConNombres): void {
    if (this.estrategia) {
      this.estrategia.descargarCertificado(data);
    } else {
      console.error('Estrategia no establecida.');
    }
  }
}
