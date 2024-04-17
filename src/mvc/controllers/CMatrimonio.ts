
import { MMatrimonio } from "../models/MMatrimonio";
import { MMiembro } from '../models/MMiembro';
import { MBautizo } from '../models/MBautizo';
import { VMatrimonio } from "../views/VMatrimonio";

export class CMatrimonio {
  private id: number;
  private model: MMatrimonio;
  private view: VMatrimonio;

  private modelMiembro: MMiembro;
  private modelBautizo: MBautizo;

  constructor() {
    this.model = new MMatrimonio();
    this.view = new VMatrimonio();
    this.modelMiembro = new MMiembro();
    this.modelBautizo = new MBautizo();

    this.id = 0;

    this._initListener();
  }
  setId(id: number): void {
    this.id = id;
  }

  setEsposos(): void {
    const miembros = this.modelMiembro.list();
    this.view.setEsposos(miembros);
  }

  create(): HTMLElement {
    this.list();
    this.view.clearData();

    this.setEsposos();

    return this.view.getHTML();
  }

  save(): HTMLElement {
    const data = this.view.getData();
    const bautizo_esposo = this.modelBautizo.findBautizado(data.id_esposo);
    const bautizo_esposa = this.modelBautizo.findBautizado(data.id_esposa);

    if(!bautizo_esposa || !bautizo_esposo){
        this.view.setDataError('Ambos miembros deben estar bautizados para poder casarse');
        return this.view.getHTML();
    }
    this.model.setData(data);
    const model = this.model.save();

    if (!model) {
      this.view.setDataError('Error');
    } else {
      this.view.setData(model);
      // Luego de guardar, recarga la página para reflejar los cambios
      window.location.reload();
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
        const esposoInfo = this.modelMiembro.find(row.id_esposo);
        const esposaInfo = this.modelMiembro.find(row.id_esposa);
        
        // Combina la información obtenida en un solo objeto
        return {
          ...row, // Conserva la información original de la fila
          nombre_esposo: esposoInfo?.nombre,
          nombre_esposa: esposaInfo?.nombre,
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