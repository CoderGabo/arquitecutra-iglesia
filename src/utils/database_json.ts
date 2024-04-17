/**
 * @author juanvladimir13
 * @mail juanvladimir13@gmail.com
 * @github https://www.github.com/juanvladimir13
 */
export class DatabaseJson<T> {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName
  }
  
  save(data: any): T| undefined {
    return data.id == 0 ? this.insert(data) : this.update(data);
  }

  insert(data: T): T {
    let rows = this._readFileJson();
    const dataTemp = { ...data, id: Date.now() + Math.floor(Math.random() * Date.now()) };
    rows.push(dataTemp);
    this._writeFileJson(rows);
    return dataTemp;
  }

  insertMany(data: T): T {
    let rows = this._readFileJson();
    const dataTemp = { ...data };
    rows.push(dataTemp);
    this._writeFileJson(rows);
    return dataTemp;
  }

  update(data: any): T | undefined {
    const rows = this._readFileJson();
    let dataIndex = rows.findIndex(item => item.id == data.id);
    if (dataIndex == -1)
      return undefined;

    rows[dataIndex] = { ...data };
    this._writeFileJson(rows);
    return data;
  }

  updateMany(data: any): T | undefined {
    const rows = this._readFileJson();
    let dataIndex = rows.findIndex(item => item.id_miembro == data.id_miembro && item.id_familiar == data.id_familiar);

    if (dataIndex == -1)
      return undefined;

    rows[dataIndex] = { ...data };
    this._writeFileJson(rows);
    return data;
  }

  updateMiembroMinisterio(data: any): T | undefined {
    const rows = this._readFileJson();
    let dataIndex = rows.findIndex(item => item.id_miembro == data.id_miembro && item.id_ministerio == data.id_ministerio);

    if (dataIndex == -1)
      return undefined;

    rows[dataIndex] = { ...data };
    this._writeFileJson(rows);
    return data;
  }

  delete(id: number): boolean {
    const rows = this._readFileJson();
    const newRows = rows.filter(item => item.id != id);

    this._writeFileJson(newRows);
    return newRows.length != rows.length;
  }

  deleteMany(id_miembro: number, id_familiar: number): boolean {
    const rows = this._readFileJson();
    const newRows = rows.filter(item => !(item.id_miembro === id_miembro && item.id_familiar === id_familiar));

    this._writeFileJson(newRows);
    return newRows.length != rows.length;
  }

  deleteMiembroMinisterio(id_miembro: number, id_ministerio: number): boolean {
    const rows = this._readFileJson();
    const newRows = rows.filter(item => !(item.id_miembro === id_miembro && item.id_ministerio === id_ministerio));

    this._writeFileJson(newRows);
    return newRows.length != rows.length;
  }

  find(id: number): T | undefined {
    const rows = this._readFileJson();
    return rows.find(item => item.id == id);
  }

  findFamily(id: number): T[] | undefined {
    const rows = this._readFileJson();
    return rows.filter(item => item.id_miembro == id);
  }

  findBautizo(id: number): T | undefined {
    const rows = this._readFileJson();
    return rows.find(item => item.id_miembro == id);
  }

  findMany(id_miembro: number, id_familiar: number): T | undefined {
    const rows = this._readFileJson();
    return rows.find(item => item.id_miembro == id_miembro && item.id_familiar == id_familiar );
  }

  findMiembroMinisterio(id_miembro: number, id_ministerio: number): T | undefined {
    const rows = this._readFileJson();
    return rows.find(item => item.id_miembro == id_miembro && item.id_ministerio == id_ministerio );
  }

  findByName(nombre: string): T | undefined {
    const rows = this._readFileJson();
    return rows.find(item => item.nombre == nombre);
  }

  list(): T[] {
    return this._readFileJson() as T[];
  }

  _readFileJson(): any[] {
    const fileContent = localStorage.getItem(this.tableName) || '[]';
    return JSON.parse(fileContent) as any[];
  }

  _writeFileJson(data: any): void {
    const rows = JSON.stringify(data)
    localStorage.setItem(this.tableName, rows)
  }
}