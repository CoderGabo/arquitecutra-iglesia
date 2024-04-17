import { Parentesco } from "../../interfaces/system";
import { DatabaseJson } from "../../utils/database_json";

export class MParentesco {
  private id_miembro: number;
  private id_tipo: number;
  private id_familiar: number;

  private database: DatabaseJson<Parentesco>;

  constructor() {
    this.id_familiar = 0;
    this.id_miembro = 0;
    this.id_tipo = 0;

    this.database = new DatabaseJson('parentesco');
  }

  setData(data: Parentesco): void {
    this.id_miembro = data.id_miembro;
    this.id_familiar = data.id_familiar;
    this.id_tipo = data.id_tipo;

  }

  save(accion: string): Parentesco | undefined {
    const data: Parentesco = {
      id_miembro: this.id_miembro,
      id_familiar: this.id_familiar,
      id_tipo: this.id_tipo,
    };

    return accion == 'insert' ?
      this.database.insertMany(data):
      this.database.updateMany(data);
  }

  delete(id_miembro: number, id_familiar: number): boolean {
    return this.database.deleteMany(id_miembro, id_familiar);
  }

  find(id_miembro: number, id_familiar: number): Parentesco | undefined {
    return this.database.findMany(id_miembro, id_familiar);
  }

  findFamily(id_miembro: number): Parentesco[] | undefined {
    return this.database.findFamily(id_miembro);
  }

  list(): Parentesco[] {
    return this.database.list();
  }
}