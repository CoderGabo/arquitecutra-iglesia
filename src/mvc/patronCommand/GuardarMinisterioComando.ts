import { Comando } from './Comando';
import { MMinisterio } from '../models/MMinisterio';
import { Ministerio } from '../../interfaces/system';

export class GuardarMinisterioComando implements Comando {
  private model: MMinisterio;
  private data: Ministerio;
  private previousData?: Ministerio;

  constructor(model: MMinisterio, data: Ministerio) {
    this.model = model;
    this.data = data;
  }

  execute(): void {
    // Guardar el estado anterior antes de realizar el guardado
    this.model.setData(this.data);
    const savedData = this.model.save();

    this.previousData = savedData;
    console.log(this.previousData);
    if (!savedData) {
      console.error('Error al guardar el ministerio');
    } else {
      console.log('Ministerio guardado:', savedData);
    }
  }

  undo(): void {
    if (this.previousData) {
      // Si hay datos anteriores, revertir al estado anterior eliminando el ministerio actual
      this.model.delete(this.previousData.id);
      console.log('Operación de guardar revertida');
    } else {
      console.error('No hay datos anteriores para deshacer');
    }
  }

  redo(): void {
    if (this.previousData) {
      // Si hay datos anteriores, restaurar el estado anterior volviendo a guardar los datos
      this.previousData.id = 0;
      this.model.setData(this.previousData);
      const savedData = this.model.save();
      if (!savedData) {
        console.error('Error al restaurar el ministerio');
        return;
      }
      this.previousData = savedData
      console.log('Operación de guardar re-hecha');
    } else {
      console.error('No hay datos anteriores para rehacer');
    }
  }
}
