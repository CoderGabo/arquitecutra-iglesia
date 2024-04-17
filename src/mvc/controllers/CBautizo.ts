
import { MBautizo } from "../models//MBautizo";
import { MMiembro } from '../models/MMiembro';
import { VBautizo } from "../views/VBautizo";

export class CBautizo {
  private id: number;
  private model: MBautizo;
  private view: VBautizo;

  private modelMiembro: MMiembro;

  constructor() {
    this.model = new MBautizo();
    this.view = new VBautizo();
    this.modelMiembro = new MMiembro();

    this.id = 0;

    this._initListener();
  }
  setId(id: number): void {
    this.id = id;
  }

  setMiembros(): void {
    const miembros = this.modelMiembro.list();
    this.view.setMiembros(miembros);
  }

  create(): HTMLElement {
    this.list();
    this.view.clearData();

    this.setMiembros();

    return this.view.getHTML();
  }

  save(): HTMLElement {
    const data = this.view.getData();
    this.model.setData(data);
    const model = this.model.save();

    if (!model) {
      this.view.setDataError('Error');
    } else {
      this.view.setData(model);
    }

    this.list();
    return this.view.getHTML();
  }

  delete(): void {
    const state = this.model.delete(this.id);
    if (!state)
      this.view.setDataError('Error');

    this.view.clearData();
    this.list();
  }

  find(): void {
    const data = this.model.find(this.id);
    if (!data) {
      this.view.setDataError('error');
      return;
    }

    this.view.setData(data!);
  }

  list(): void {
    const rows = this.model.list();

    const rowsWithDetails = rows.map(row => {
        const miembroInfo = this.modelMiembro.find(row.id_miembro);
        
        // Combina la información obtenida en un solo objeto
        return {
          ...row, // Conserva la información original de la fila
          miembroNombre: miembroInfo?.nombre,
        };
    });

    this.view.setTable(rowsWithDetails);
  }

  _initListener(): void {
    this.view.btnCreate.addEventListener('click', () => {
      this.create();
    });

    this.view.btnSave.addEventListener('click', () => {
      this.save();
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