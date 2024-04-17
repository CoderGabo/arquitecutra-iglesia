import { Miembro } from "../../interfaces/system";
import { DatabaseJson } from "../../utils/database_json";

export class MMiembro {
  private id: number;
  private nombre: string;
  private telefono: number;
  private direccion: string;

  private database: DatabaseJson<Miembro>;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.telefono = 0;
    this.direccion = '';

    this.database = new DatabaseJson('miembro');
  }

  setData(data: Miembro): void {
    this.id = data.id;
    this.nombre = data.nombre;
    this.telefono = data.telefono;
    this.direccion = data.direccion;

  }

  save(): Miembro | undefined {
    const data: Miembro = {
      id: this.id,
      nombre: this.nombre,
      telefono: this.telefono,
      direccion: this.direccion,
    };

    return this.id == 0 ?
      this.database.insert(data) :
      this.database.update(data);
  }

  delete(id: number): boolean {
    return this.database.delete(id);
  }

  find(id: number): Miembro | undefined {
    return this.database.find(id);
  }

  list(): Miembro[] {
    return this.database.list();
  }
}