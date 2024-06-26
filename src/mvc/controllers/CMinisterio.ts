import { MMinisterio } from "../models/MMinisterio";
import { VMinisterio } from '../views/VMinisterio';
import { EliminarMinisterioComando } from '../patronCommand/EliminarMinisterioComando';
import { GuardarMinisterioComando } from '../patronCommand/GuardarMinisterioComando';
import { Invocador } from '../patronCommand/Invocador';

export class CMinisterio {
  private id: number;
  private model: MMinisterio;
  private view: VMinisterio;
  private invocador: Invocador;

  constructor() {
    this.model = new MMinisterio();
    this.view = new VMinisterio();
    this.invocador = new Invocador();

    this.id = 0;

    this._initListener();
  }

  setId(id: number): void {
    this.id = id;
  }

  create(): HTMLElement {
    this.list();
    this.view.clearData();
    return this.view.getHTML();
  }

  save(): HTMLElement {
    const data = this.view.getData();
    const saveCommand = new GuardarMinisterioComando(this.model, data);
    this.invocador.executeComando(saveCommand);

    this.list();
    return this.view.getHTML();
  }

  delete(): void {
    const deleteCommand = new EliminarMinisterioComando(this.model, this.id);
    this.invocador.executeComando(deleteCommand);

    this.view.clearData();
    this.list();
  }

  undo(): void {
    this.invocador.undo();
    this.list();
  }

  redo(): void {
    this.invocador.redo();
    this.list();
  }

  find(): void {
    const data = this.model.find(this.id);
    if (!data) {
      this.view.setDataError('error');
      return;
    }

    this.view.setData(data);
  }

  list(): void {
    const rows = this.model.list();
    this.view.setTable(rows);
  }

  _initListener(): void {
    this.view.btnCreate.addEventListener('click', () => {
      this.create();
    });

    this.view.btnSave.addEventListener('click', () => {
      this.save();
    });

    this.view.btnUndo.addEventListener('click', () => {
      this.undo();
    });

    this.view.btnRedo.addEventListener('click', () => {
      this.redo();
    });


    this.view.outputTable.addEventListener('click', (evt) => {
      const element = evt.target as HTMLElement;
      if (element.nodeName != 'BUTTON')
        return;

      const id = element.getAttribute('data-id') || 0;
      if (element.getAttribute('data-type') == 'delete') {
        this.setId(Number(id));
        this.delete();
      }

      if (element.getAttribute('data-type') == 'view') {
        this.setId(Number(id));
        this.find();
      }
    });
  }
}
