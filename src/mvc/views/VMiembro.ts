import { Miembro } from '../../interfaces/system';
export class VMiembro {
  private component: HTMLElement;

  public btnSave: HTMLButtonElement;
  public btnCreate: HTMLButtonElement;

  private inputId: HTMLInputElement;
  private inputNombre: HTMLInputElement;
  private inputTelefono: HTMLInputElement;
  private inputDireccion: HTMLInputElement;

  public outputTable: HTMLTableElement;
  public outputFamilyTable: HTMLTableElement;
  private outputError: HTMLParagraphElement;

  constructor() {
    const $template = document.querySelector<HTMLTemplateElement>('#miembro');
    const $templateContent = $template?.content.querySelector<HTMLElement>('#container');
    this.component = $templateContent?.cloneNode(true) as HTMLElement;

    this.btnCreate = this.component.querySelector('#btnCreate') as HTMLButtonElement;
    this.btnSave = this.component.querySelector('#btnSave') as HTMLButtonElement;

    this.inputId = this.component.querySelector('#id') as HTMLInputElement;
    this.inputNombre = this.component.querySelector('#nombre') as HTMLInputElement;
    this.inputTelefono = this.component.querySelector('#telefono') as HTMLInputElement;
    this.inputDireccion= this.component.querySelector('#dirección') as HTMLInputElement;

    this.outputTable = this.component.querySelector('#table') as HTMLTableElement;
    this.outputFamilyTable = this.component.querySelector('#tableFamily') as HTMLTableElement;
    this.outputError = this.component.querySelector('#errors') as HTMLParagraphElement;
  }

  getData(): Miembro {
    return {
      id: Number(this.inputId.value),
      nombre: this.inputNombre.value,
      telefono: Number(this.inputTelefono.value),
      direccion: this.inputDireccion.value,
    }
  }

  setData(data: Miembro): void {
    this.inputId.value = String(data.id);
    this.inputNombre.value = data.nombre;
    this.inputTelefono.value = String(data.telefono);
    this.inputDireccion.value = data.direccion;
  }

  clearData(): void {
    this.inputId.value = '0';
    this.inputNombre.value = '';
    this.inputDireccion.value = '';
    this.inputTelefono.value = '';
  }

  setDataError(message: string): void {
    this.outputError.textContent = message;
  }

  setTable(rows: Miembro[]): void {
    let cells = ''

    rows.forEach(row => {
      cells += `<tr>
      <td>${row.nombre}</td>
      <td>${row.telefono}</td>
      <td>${row.direccion}</td>
      <td width="150px">
        <button data-id="${row.id}" data-type="view" class="btn btn-outline-dark">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button data-id="${row.id}" data-type="delete" class="btn btn-outline-danger">
          <i class="bi bi-trash"></i>
        </button>
      </td>
      </tr>`
    });
    
    const tbody = this.outputTable.querySelector('tbody') as HTMLTableSectionElement;
    tbody.innerHTML = cells;
  }
  
  getHTML(): HTMLElement {
    return this.component;
  }
}