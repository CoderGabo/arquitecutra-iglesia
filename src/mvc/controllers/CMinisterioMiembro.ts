
import { MMinisterioMiembro } from "../models/MMinisterioMiembro";
import { MMiembro } from '../models/MMiembro';
import { MMinisterio } from '../models/MMinisterio';

import { VMinisterioMiembro } from '../views/VMinisterioMiembro';


export class CMinisterioMiembro {
  private id_miembro: number;
  private id_ministerio: number;
  private nombre: string;
  private model: MMinisterioMiembro;
  private view: VMinisterioMiembro;

  private modelMiembro: MMiembro;
  private modelMinisterio: MMinisterio;

  constructor() {
    this.model = new MMinisterioMiembro();
    this.view = new VMinisterioMiembro();
    this.modelMiembro = new MMiembro();
    this.modelMinisterio = new MMinisterio();

    this.id_miembro = 0;
    this.id_ministerio = 0;
    this.nombre = 'insert';

    this._initListener();
  }

  setId(id_miembro: number, id_ministerio: number): void {
    this.id_miembro = id_miembro;
    this.id_ministerio = id_ministerio
  }

  setName(nombre: string): void{
    this.nombre = nombre;
  }

  setMiembros(): void {
    const miembros = this.modelMiembro.list();
    this.view.setMiembros(miembros);
  }

  setMinisterios(): void {
    const ministerios = this.modelMinisterio.list();
    this.view.setMinisterios(ministerios);
  }

  create(): HTMLElement {
    this.list();
    this.view.clearData();

    this.setMiembros();
    this.setMinisterios();

    return this.view.getHTML();
  }

  save(): HTMLElement {
    const data = this.view.getData();
    this.model.setData(data);
    const model = this.model.save(this.nombre);

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
    const state = this.model.delete(this.id_miembro, this.id_ministerio);
    if (!state)
      this.view.setDataError('Error');

    this.view.clearData();
    this.list();
  }

  find(): void {
    const data = this.model.find(this.id_miembro, this.id_ministerio);
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
        const ministerioInfo = this.modelMinisterio.find(row.id_ministerio);
        
        // Combina la información obtenida en un solo objeto
        return {
          ...row, // Conserva la información original de la fila
          miembroNombre: miembroInfo?.nombre,
          ministerioNombre: ministerioInfo?.nombre
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

      const id_miembro = element.getAttribute('data-id-miembro') || 0;
      const id_ministerio = element.getAttribute('data-id-ministerio') || 0;
      if (element.getAttribute('data-type') == 'delete') {
        this.setId(Number(id_miembro), Number(id_ministerio));
        this.delete();
      }


      if (element.getAttribute('data-type') == 'view') {
        this.nombre = 'Update';
        this.setId(Number(id_miembro), Number(id_ministerio));
        this.find();
      }
    });
  }
}