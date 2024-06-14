import { Ministerio } from "../../interfaces/system";
import { DatabaseJson } from "../../utils/database_json";

export class MMinisterio {
  private id: number;
  private nombre: string;
  private tipo: string;

  private database: DatabaseJson<Ministerio>;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.tipo = '';
    
    this.database = new DatabaseJson('ministerio');
  }

  setData(data: Ministerio): void {
    this.id = data.id;
    this.nombre = data.nombre;
    this.tipo = data.tipo;
  }

  save(): Ministerio | undefined {
    const data: Ministerio = {
      id: this.id,
      nombre: this.nombre,
      tipo: this.tipo,
    };

    return this.id == 0 ?
      this.database.insert(data) :
      this.database.update(data);
  }

  delete(id: number): boolean {
    return this.database.delete(id);
  }

  find(id: number): Ministerio | undefined {
    return this.database.find(id);
  }

  findByName(name: string): Ministerio | undefined {
    return this.database.findByName(name);
  }

  list(): Ministerio[] {
    return this.database.list();
  }
}