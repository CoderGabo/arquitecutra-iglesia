
import { MParentesco } from "../models/MParentesco";
import { VParentesco } from '../views/VParentesco';
import { MTipoFamilia } from "../models/MTipoFamilia";
import { MMiembro } from "../models/MMiembro";

export class CParentesco {
  private id_miembro: number;
  private id_familiar: number;
  private nombre: string;
  private model: MParentesco;
  private view: VParentesco;

  private modelMiembro: MMiembro;
  private modelTipoFamilia: MTipoFamilia;  

  constructor() {
    this.model = new MParentesco();
    this.view = new VParentesco();

    this.modelMiembro = new MMiembro();
    this.modelTipoFamilia = new MTipoFamilia();

    this.id_miembro = 0;
    this.id_familiar = 0;
    this.nombre = 'insert';

    this._initListener();
  }

  setTables(): void {
    const miembros = this.modelMiembro.list();
    const familiares = this.modelMiembro.list();
    const tipoFamilia = this.modelTipoFamilia.list();

    this.view.setMiembro(miembros);
    this.view.setFamiliar(familiares);
    this.view.setTipo(tipoFamilia);
  }

  setId(id_miembro: number, id_familiar: number): void {
    this.id_miembro = id_miembro;
    this.id_familiar = id_familiar;
  }

  setName(nombre: string): void{
    this.nombre = nombre;
  }

  create(): HTMLElement {
    // this.list();
    this.view.clearData();

    this.setTables();

    return this.view.getHTML();
  }

  save(): HTMLElement {
    const data = this.view.getData();

    if(data.id_familiar === data.id_miembro){
      this.view.setDataError('No se puede relacionar un miembro consigo mismo');
      return this.view.getHTML();
    }

    const datos_duplicados = this.model.find(data.id_miembro, data.id_familiar);
    // console.log(!datos_duplicados)

    if(datos_duplicados && this.nombre === 'insert'){
        this.view.setDataError('No se puede agregar parentescos entre miembros ya registrados. Por favor actualice los datos a modificar');
        return this.view.getHTML();
    }

    this.model.setData(data);
    const model = this.model.save(this.nombre);

    if (!model) {
      this.view.setDataError('Error');
    } else {
      this.view.setData(model);
      // Luego de guardar, recarga la página para reflejar los cambios
      window.location.reload();
    }

    // this.list();
    return this.view.getHTML();
  }

  delete(): void {
    // console.log(this.id_familiar,this.id_miembro)
    const state = this.model.delete(this.id_miembro, this.id_familiar);
    if (!state)
      this.view.setDataError('Error');

    this.view.clearData();
    // window.location.reload();
    this.list();
  }

  find(): void {
    const data = this.model.find(this.id_miembro, this.id_familiar);
    if (!data) {
      this.view.setDataError('error');
      return;
    }

    this.view.setData(data!);
  }

  list(): void {
    const data = this.view.getDataVerFamilia();
    const rows = this.model.findFamily(data.id_miembro);

    let family: Array<{ 
        id_miembro: number, 
        id_familiar: number, 
        miembro: string, 
        tipo: string, 
        familiar: string 
    }> = [];

    rows!.forEach(row => {
        const dataMiembro = this.modelMiembro.find(row.id_miembro);
        const dataFamiliar = this.modelMiembro.find(row.id_familiar);
        const dataTipo = this.modelTipoFamilia.find(row.id_tipo);

        if (!dataMiembro || !dataFamiliar || !dataTipo) {
            // this.view.setDataError('Error al recuperar los datos');
            return;  // Considera continuar con el siguiente item en lugar de salir completamente de la función
        }

        family.push({
            id_miembro: row.id_miembro,
            id_familiar: row.id_familiar,
            miembro: dataMiembro.nombre,
            tipo: dataTipo.tipo,
            familiar: dataFamiliar.nombre
        });
    });


    this.view.setTable(family);
  }

  _initListener(): void {
    this.view.btnCreate.addEventListener('click', () => {
      this.create();
    });

    this.view.btnSave.addEventListener('click', () => {
      this.save();
    });

    this.view.btnVerFamilia.addEventListener('click', () => {
      this.list();
    });

    this.view.outputTable.addEventListener('click', (evt) => {
      const element = evt.target as HTMLElement;
      if (element.nodeName != 'BUTTON')
        return;

      const id_miembro = element.getAttribute('data-id-miembro') || 0;
      const id_familiar = element.getAttribute('data-id-familiar') || 0;
      if (element.getAttribute('data-type') == 'delete') {
        this.setId(Number(id_miembro), Number(id_familiar));
        this.delete();
      }


      if (element.getAttribute('data-type') == 'view') {
        this.setName('Update');
        this.setId(Number(id_miembro), Number(id_familiar));
        this.find();
      }
    });
  }
}