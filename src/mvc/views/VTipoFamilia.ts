import { Tipo_Familia } from '../../interfaces/system';
export class VTipoFamilia {
  private component: HTMLElement;

  public btnSave: HTMLButtonElement;
  public btnCreate: HTMLButtonElement;

  private inputId: HTMLInputElement;
  private inputTipo: HTMLInputElement;

  public outputTable: HTMLTableElement;
  private outputError: HTMLParagraphElement;

  constructor() {
    const $template = document.querySelector<HTMLTemplateElement>('#tipo-familia');
    const $templateContent = $template?.content.querySelector<HTMLElement>('#container');
    this.component = $templateContent?.cloneNode(true) as HTMLElement;
    
    this.btnCreate = this.component.querySelector('#btnCreate') as HTMLButtonElement;
    this.btnSave = this.component.querySelector('#btnSave') as HTMLButtonElement;

    this.inputId = this.component.querySelector('#id') as HTMLInputElement;
    this.inputTipo = this.component.querySelector('#tipo') as HTMLInputElement;

    this.outputTable = this.component.querySelector('#table') as HTMLTableElement;
    this.outputError = this.component.querySelector('#errors') as HTMLParagraphElement;
  }

  getData(): Tipo_Familia {
    return {
      id: Number(this.inputId.value),
      tipo: this.inputTipo.value,
    }
  }

  setData(data: Tipo_Familia): void {
    this.inputId.value = String(data.id);
    this.inputTipo.value = String(data.tipo);
  }

  clearData(): void {
    this.inputId.value = '0';
    this.inputTipo.value = '';
  }

  setDataError(message: string): void {
    this.outputError.textContent = message;
  }

  setTable(rows: Tipo_Familia[]): void {
    let cells = ''

    rows.forEach(row => {
      cells += `<tr>
      <td>${row.tipo}</td>
      <td width="100px">
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