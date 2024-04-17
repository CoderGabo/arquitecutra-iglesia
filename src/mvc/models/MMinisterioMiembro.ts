import { MinisterioMiembro } from "../../interfaces/system";
import { DatabaseJson } from "../../utils/database_json";

export class MMinisterioMiembro {
  private id_ministerio: number;
  private id_miembro: number;

  private database: DatabaseJson<MinisterioMiembro>;

  constructor() {
    this.id_miembro = 0;
    this.id_ministerio = 0;
    
    this.database = new DatabaseJson('ministerio-miembro');
  }

  setData(data: MinisterioMiembro): void {
    this.id_miembro = data.id_miembro;
    this.id_ministerio = data.id_ministerio;
  }

  save(accion: string): MinisterioMiembro | undefined {
    const data: MinisterioMiembro = {
      id_miembro: this.id_miembro,
      id_ministerio: this.id_ministerio,
    };

    return accion == 'insert' ?
      this.database.insertMany(data) :
      this.database.updateMiembroMinisterio(data);
  }

  delete(id_miembro: number, id_ministerio: number): boolean {
    return this.database.deleteMiembroMinisterio(id_miembro, id_ministerio);
  }

  find(id_miembro: number, id_ministerio: number): MinisterioMiembro | undefined {
    return this.database.findMiembroMinisterio(id_miembro, id_ministerio);
  }
  
  list(): MinisterioMiembro[] {
    return this.database.list();
  }
}