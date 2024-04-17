import { Bautizo } from "../../interfaces/system";
import { DatabaseJson } from "../../utils/database_json";

export class MBautizo {
  private id: number;
  private padrino: string;
  private madrina: string;
  private lugar: string;
  private fecha: string;
  private id_miembro: number;

  private database: DatabaseJson<Bautizo>;

  constructor() {
    this.id = 0;
    this.padrino = '';
    this.madrina = '';
    this.lugar = '';
    this.fecha = '';
    this.id_miembro = 0;
    
    this.database = new DatabaseJson('bautizo');
  }

  setData(data: Bautizo): void {
    this.id = data.id;
    this.padrino = data.padrino;
    this.madrina = data.madrina;
    this.lugar = data.lugar;
    this.fecha = data.fecha;
    this.id_miembro = data.id_miembro;
  }

  save(): Bautizo | undefined {
    const data: Bautizo = {
      id: this.id,
      padrino: this.padrino,
      madrina: this.madrina,
      lugar: this.lugar,
      fecha: new Date(this.fecha).toISOString().split('T')[0],
      id_miembro: this.id_miembro,
    };

    return this.id == 0 ?
      this.database.insert(data) :
      this.database.update(data);
  }

  delete(id: number): boolean {
    return this.database.delete(id);
  }

  find(id: number): Bautizo | undefined {
    return this.database.find(id);
  }

  findBautizado(id: number): Bautizo | undefined {
    return this.database.findBautizo(id);
  }

  list(): Bautizo[] {
    return this.database.list();
  }
}