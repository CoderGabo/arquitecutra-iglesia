import { BautizoConNombres } from '../../interfaces/helper/interface.helper';
import { Miembro, Bautizo } from '../../interfaces/system';

export class VBautizo {
  private component: HTMLElement;

  public btnSave: HTMLButtonElement;
  public btnCreate: HTMLButtonElement;

  private inputId: HTMLInputElement;
  private inputPadrino: HTMLInputElement;
  private inputMadrina: HTMLInputElement;
  private inputLugar: HTMLInputElement;
  private inputFecha: HTMLInputElement;
  private inputId_Miembro: HTMLSelectElement;


  public outputTable: HTMLTableElement;
  private outputError: HTMLParagraphElement;

  constructor() {
    const $template = document.querySelector<HTMLTemplateElement>('#bautizo');
    const $templateContent = $template?.content.querySelector<HTMLElement>('#container');
    this.component = $templateContent?.cloneNode(true) as HTMLElement;

    this.btnCreate = this.component.querySelector('#btnCreate') as HTMLButtonElement;
    this.btnSave = this.component.querySelector('#btnSave') as HTMLButtonElement;

    this.inputId = this.component.querySelector('#id') as HTMLInputElement;
    this.inputPadrino = this.component.querySelector('#padrino') as HTMLInputElement;
    this.inputMadrina = this.component.querySelector('#madrina') as HTMLInputElement;
    this.inputLugar = this.component.querySelector('#lugar') as HTMLInputElement;
    this.inputFecha = this.component.querySelector('#fecha') as HTMLInputElement;
    this.inputId_Miembro = this.component.querySelector('#miembro') as HTMLSelectElement;


    this.outputTable = this.component.querySelector('#table') as HTMLTableElement;
    this.outputError = this.component.querySelector('#errors') as HTMLParagraphElement;
  }

  getData(): Bautizo {
    return {
      id: Number(this.inputId.value),
      padrino: this.inputPadrino.value,
      madrina: this.inputMadrina.value,
      lugar: this.inputLugar.value,
      fecha: this.inputFecha.value,
      id_miembro: Number(this.inputId_Miembro.value),
    }
  }

  setData(data: Bautizo): void {
    this.inputId.value = String(data.id);
    this.inputPadrino.value = String(data.padrino);
    this.inputMadrina.value = String(data.madrina);
    this.inputLugar.value = String(data.lugar);
    this.inputFecha.value = String(data.fecha);
    this.inputId_Miembro.value = String(data.id_miembro);
  }

  clearData(): void {
    this.inputId.value = '0';
    this.inputPadrino.value = '';
    this.inputMadrina.value = '';
    this.inputLugar.value = '';
    this.inputFecha.value = '';
    this.inputId_Miembro.value = '';
  }

  setDataError(message: string): void {
    this.outputError.textContent = message;
  }

  setMiembros(miembros: Miembro[]): void {
    miembros.forEach(
        item => {
          const option= document.createElement('option');
          option.value = String(item.id);
          option.textContent = item.nombre;
  
          this.inputId_Miembro.append(option);
        }
    )
  }

  setTable(rows: BautizoConNombres[]): void {
    let cells = ''

    rows.forEach(row => {
      cells += `<tr>
      <td>${row.miembroNombre}</td>
      <td>${row.padrino}</td>
      <td>${row.madrina}</td>
      <td>${row.lugar}</td>
      <td>${row.fecha}</td>
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