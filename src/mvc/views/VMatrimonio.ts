import { MatrimonioConNombres } from '../../interfaces/helper/interface.helper';
import { Miembro, Matrimonio } from '../../interfaces/system';

export class VMatrimonio {
  private component: HTMLElement;

  public btnSave: HTMLButtonElement;
  public btnCreate: HTMLButtonElement;

  private inputId: HTMLInputElement;
  private inputPadrino: HTMLInputElement;
  private inputMadrina: HTMLInputElement;
  private inputLugar: HTMLInputElement;
  private inputFecha: HTMLInputElement;
  private inputId_Esposo: HTMLSelectElement;
  private inputId_Esposa: HTMLSelectElement;

  public outputTable: HTMLTableElement;
  private outputError: HTMLParagraphElement;

  constructor() {
    const $template = document.querySelector<HTMLTemplateElement>('#matrimonio');
    const $templateContent = $template?.content.querySelector<HTMLElement>('#container');
    this.component = $templateContent?.cloneNode(true) as HTMLElement;

    this.btnCreate = this.component.querySelector('#btnCreate') as HTMLButtonElement;
    this.btnSave = this.component.querySelector('#btnSave') as HTMLButtonElement;

    this.inputId = this.component.querySelector('#id') as HTMLInputElement;
    this.inputPadrino = this.component.querySelector('#padrino') as HTMLInputElement;
    this.inputMadrina = this.component.querySelector('#madrina') as HTMLInputElement;
    this.inputLugar = this.component.querySelector('#lugar') as HTMLInputElement;
    this.inputFecha = this.component.querySelector('#fecha') as HTMLInputElement;
    this.inputId_Esposo = this.component.querySelector('#esposo') as HTMLSelectElement;
    this.inputId_Esposa = this.component.querySelector('#esposa') as HTMLSelectElement;


    this.outputTable = this.component.querySelector('#table') as HTMLTableElement;
    this.outputError = this.component.querySelector('#errors') as HTMLParagraphElement;
  }

  getData(): Matrimonio {
    return {
      id: Number(this.inputId.value),
      padrino: this.inputPadrino.value,
      madrina: this.inputMadrina.value,
      lugar: this.inputLugar.value,
      fecha: this.inputFecha.value,
      id_esposo: Number(this.inputId_Esposo.value),
      id_esposa: Number(this.inputId_Esposa.value),
    }
  }

  setData(data: Matrimonio): void {
    this.inputId.value = String(data.id);
    this.inputPadrino.value = String(data.padrino);
    this.inputMadrina.value = String(data.madrina);
    this.inputLugar.value = String(data.lugar);
    this.inputFecha.value = String(data.fecha);
    this.inputId_Esposo.value = String(data.id_esposo),
    this.inputId_Esposa.value = String(data.id_esposa)
  }

  clearData(): void {
    this.inputId.value = '0';
    this.inputPadrino.value = '';
    this.inputMadrina.value = '';
    this.inputLugar.value = '';
    this.inputFecha.value = '';
    this.inputId_Esposo.value = '';
    this.inputId_Esposa.value = '';
  }

  setDataError(message: string): void {
    this.outputError.textContent = message;
  }

  setEsposos(miembros: Miembro[]): void {
    miembros.forEach(
        item => {
            const optionEsposo = document.createElement('option');
            optionEsposo.value = String(item.id);
            optionEsposo.textContent = item.nombre;
    
            this.inputId_Esposo.append(optionEsposo);
    
            const optionEsposa = document.createElement('option');
            optionEsposa.value = String(item.id);
            optionEsposa.textContent = item.nombre;
            this.inputId_Esposa.append(optionEsposa);
        }
    )
  }

  setTable(rows: MatrimonioConNombres[]): void {
    let cells = ''

    rows.forEach(row => {
      cells += `<tr>
      <td>${row.nombre_esposo}</td>
      <td>${row.nombre_esposa}</td>
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