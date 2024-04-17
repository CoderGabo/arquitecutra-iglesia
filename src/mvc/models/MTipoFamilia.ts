import { Tipo_Familia } from "../../interfaces/system";
import { DatabaseJson } from "../../utils/database_json";

export class MTipoFamilia {
  private id: number;
  private tipo: string;

  private database: DatabaseJson<Tipo_Familia>;

  constructor() {
    this.id = 0;
    this.tipo = '';
    
    this.database = new DatabaseJson('tipo_familia');
  }

  setData(data: Tipo_Familia): void {
    this.id = data.id;
    this.tipo = data.tipo;
  }

  save(): Tipo_Familia | undefined {
    const data: Tipo_Familia = {
      id: this.id,
      tipo: this.tipo,
    };

    console.log(this.id);

    return this.id == 0 ?
      this.database.insert(data) :
      this.database.update(data);
  }

  delete(id: number): boolean {
    return this.database.delete(id);
  }

  find(id: number): Tipo_Familia | undefined {
    return this.database.find(id);
  }

  list(): Tipo_Familia[] {
    return this.database.list();
  }
}