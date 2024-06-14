import { Comando } from './Comando';
import { MMinisterio } from '../models/MMinisterio';

export class EliminarMinisterioComando implements Comando {
  private model: MMinisterio;
  private id: number;
  private deletedData?: any; // Aquí se puede almacenar el estado eliminado para permitir undo

  constructor(model: MMinisterio, id: number) {
    this.model = model;
    this.id = id;
  }

  execute(): void {
    this.deletedData = this.model.find(this.id);
    const success = this.model.delete(this.id);
    if (!success) {
      console.error('Error al eliminar el ministerio');
    } else {
      console.log('Ministerio eliminado');
    }
  }

  undo(): void {
    if (this.deletedData) {
      
      this.deletedData.id = 0;
      this.model.setData(this.deletedData);
      
      this.deletedData = this.model.save();
      console.log('Se ha revertido la operación de eliminación');
    } else {
      console.error('No se puede deshacer la operación porque no se ha eliminado ningún ministerio');
    }
  }

  redo(): void {
    if (this.deletedData) {
      // Si hay datos anteriores, restaurar el estado anterior volviendo a guardar los datos
      console.log(this.deletedData);
      const success =  this.model.delete(this.deletedData.id);
      if (!success) {
        console.error('Error al restaurar el ministerio');
        return;
      }
      console.log('Operación de guardar re-hecha');
    } else {
      console.error('No hay datos anteriores para rehacer');
    }
  }
}
