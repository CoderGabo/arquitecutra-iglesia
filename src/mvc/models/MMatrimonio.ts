import { Matrimonio } from "../../interfaces/system";
import { DatabaseJson } from "../../utils/database_json";

export class MMatrimonio {
  private id: number;
  private padrino: string;
  private madrina: string;
  private lugar: string;
  private fecha: string;
  private id_esposo: number;
  private id_esposa: number;

  private database: DatabaseJson<Matrimonio>;

  constructor() {
    this.id = 0;
    this.padrino = '';
    this.madrina = '';
    this.lugar = '';
    this.fecha = '';
    this.id_esposo = 0;
    this.id_esposa = 0;
    
    this.database = new DatabaseJson('matrimonio');
  }

  setData(data: Matrimonio): void {
    this.id = data.id;
    this.padrino = data.padrino;
    this.madrina = data.madrina;
    this.lugar = data.lugar;
    this.fecha = data.fecha;
    this.id_esposo = data.id_esposo;
    this.id_esposa = data.id_esposa;
  }

  save(): Matrimonio | undefined {
    const data: Matrimonio = {
      id: this.id,
      padrino: this.padrino,
      madrina: this.madrina,
      lugar: this.lugar,
      fecha: new Date(this.fecha).toISOString().split('T')[0],
      id_esposo: this.id_esposo,
      id_esposa: this.id_esposa,
    };

    return this.id == 0 ?
      this.database.insert(data) :
      this.database.update(data);
  }

  delete(id: number): boolean {
    return this.database.delete(id);
  }

  find(id: number): Matrimonio | undefined {
    return this.database.find(id);
  }

  list(): Matrimonio[] {
    return this.database.list();
  }
}