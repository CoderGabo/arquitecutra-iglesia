export interface Comando {
    execute(): void;
    undo(): void;
    redo?(): void; // El método redo es opcional
}
  