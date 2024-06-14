import { Comando } from './Comando';

export class Invocador {
  private history: Comando[];
  private currentIndex: number;

  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }

  executeComando(comando: Comando): void {
    // Ejecutar el comando
    comando.execute();

    // Agregar el comando al historial y avanzar el índice
    this.history.splice(this.currentIndex + 1);
    this.history.push(comando);
    this.currentIndex++;
  }

  undo(): void {
    if (this.currentIndex >= 0) {
      const comando = this.history[this.currentIndex];
      console.log(comando);
      comando.undo();
      this.currentIndex--;
    } else {
      console.log('No hay más operaciones para deshacer');
    }
  }

  redo(): void {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      const comando = this.history[this.currentIndex];
      comando.redo?.(); // Llamar a redo si está implementado en el comando
    } else {
      console.log('No hay operaciones para rehacer');
    }
  }
}
