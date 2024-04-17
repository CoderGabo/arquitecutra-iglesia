import { MinisterioMiembroConNombres } from '../../interfaces/helper/interface.helper';
import { Miembro, Ministerio, MinisterioMiembro } from '../../interfaces/system';
export class VMinisterioMiembro {
  private component: HTMLElement;

  public btnSave: HTMLButtonElement;
  public btnCreate: HTMLButtonElement;

  private inputId_Miembro: HTMLSelectElement;
  private inputId_Ministerio: HTMLSelectElement;

  public outputTable: HTMLTableElement;
  private outputError: HTMLParagraphElement;

  constructor() {
    const $template = document.querySelector<HTMLTemplateElement>('#ministerio-miembro');
    const $templateContent = $template?.content.querySelector<HTMLElement>('#container');
    this.component = $templateContent?.cloneNode(true) as HTMLElement;
    this.btnCreate = this.component.querySelector('#btnCreate') as HTMLButtonElement;
    this.btnSave = this.component.querySelector('#btnSave') as HTMLButtonElement;

    this.inputId_Miembro = this.component.querySelector('#miembro') as HTMLSelectElement;
    this.inputId_Ministerio = this.component.querySelector('#ministerio') as HTMLSelectElement;

    this.outputTable = this.component.querySelector('#table') as HTMLTableElement;
    this.outputError = this.component.querySelector('#errors') as HTMLParagraphElement;
  }

  getData(): MinisterioMiembro {
    return {
      id_miembro: Number(this.inputId_Miembro.value),
      id_ministerio: Number(this.inputId_Ministerio.value)
    }
  }

  setData(data: MinisterioMiembro): void {
    this.inputId_Miembro.value = String(data.id_miembro);
    this.inputId_Ministerio.value = String(data.id_ministerio);
  }

  clearData(): void {
    this.inputId_Miembro.value = '';
    this.inputId_Ministerio.value = '';
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

  setMinisterios(ministerios: Ministerio[]): void {
    ministerios.forEach(
        item => {
          const option= document.createElement('option');
          option.value = String(item.id);
          option.textContent = item.nombre;
  
          this.inputId_Ministerio.append(option);
        }
    )
  }

  setTable(rows: MinisterioMiembroConNombres[]): void {
    let cells = ''

    rows.forEach(row => {
      cells += `<tr>
      <td>${row.miembroNombre}</td>
      <td>${row.ministerioNombre}</td>
      <td width="100px">
        <button data-id-miembro="${row.id_miembro}" data-id-ministerio="${row.id_ministerio}" data-type="view" class="btn btn-outline-dark">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button data-id-miembro="${row.id_miembro}" data-id-ministerio="${row.id_ministerio}" data-type="delete" class="btn btn-outline-danger">
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