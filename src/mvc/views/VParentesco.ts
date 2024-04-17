import { Miembro, Parentesco, Tipo_Familia } from '../../interfaces/system';

export class VParentesco {
  private component: HTMLElement;

  public btnSave: HTMLButtonElement;
  public btnCreate: HTMLButtonElement;
  public btnVerFamilia: HTMLButtonElement;

  private inputMiembro: HTMLSelectElement;
  private inputTipo: HTMLSelectElement;
  private inputFamiliar: HTMLSelectElement;
  private inputMiembroFamilia: HTMLSelectElement;

  public outputTable: HTMLTableElement;
  private outputError: HTMLParagraphElement;

  constructor() {
    const $template = document.querySelector<HTMLTemplateElement>('#parentesco');
    const $templateContent = $template?.content.querySelector<HTMLElement>('#container');
    this.component = $templateContent?.cloneNode(true) as HTMLElement;

    this.btnCreate = this.component.querySelector('#btnCreate') as HTMLButtonElement;
    this.btnSave = this.component.querySelector('#btnSave') as HTMLButtonElement;
    this.btnVerFamilia = this.component.querySelector('#btnVerFamilia') as HTMLButtonElement;

    this.inputFamiliar = this.component.querySelector('#familiar') as HTMLSelectElement;
    this.inputMiembro = this.component.querySelector('#miembro') as HTMLSelectElement;
    this.inputTipo= this.component.querySelector('#tipo') as HTMLSelectElement;
    this.inputMiembroFamilia = this.component.querySelector('#miembro-familia') as HTMLSelectElement;

    this.outputTable = this.component.querySelector('#table') as HTMLTableElement;
    this.outputError = this.component.querySelector('#errors') as HTMLParagraphElement;
  }

  getData(): Parentesco {
    return {
      id_miembro: Number(this.inputMiembro.value),
      id_familiar: Number(this.inputFamiliar.value),
      id_tipo: Number(this.inputTipo.value),
    }
  }

  getDataVerFamilia(): Parentesco {
    return {
      id_miembro: Number(this.inputMiembroFamilia.value),
      id_familiar: 0,
      id_tipo: 0,
    }
  }

  setData(data: Parentesco): void {
    this.inputMiembro.value = String(data.id_miembro);
    this.inputFamiliar.value = String(data.id_familiar);
    this.inputTipo.value = String(data.id_tipo);
  }

  setDataVerFamilia(data: {id_miembro_familia: number}): void {
    this.inputMiembroFamilia.value = String(data.id_miembro_familia)
  }

  clearData(): void {
    this.inputMiembro.value = '0';
  }

  setMiembro(rows: Miembro[]): void {
    rows.forEach(
      item => {
        const option = document.createElement('option');
        option.value = String(item.id);
        option.textContent = item.nombre;

        this.inputMiembro.append(option);

        const optionMiembroFamili = document.createElement('option');
        optionMiembroFamili.value = String(item.id);
        optionMiembroFamili.textContent = item.nombre;

        this.inputMiembroFamilia.append(optionMiembroFamili);
      }
    )
  }

  setFamiliar(rows: Miembro[]): void {
    rows.forEach(
      item => {
        const option = document.createElement('option');
        option.value = String(item.id);
        option.textContent = item.nombre;

        this.inputFamiliar.append(option);
      }
    )
  }

  setTipo(rows: Tipo_Familia[]): void {
    rows.forEach(
      item => {
        const option = document.createElement('option');
        option.value = String(item.id);
        option.textContent = item.tipo;

        this.inputTipo.append(option);
      }
    )
  }

  setDataError(message: string): void {
    this.outputError.textContent = message;
  }

  setTable(rows: Array<{id_miembro: number, id_familiar: number, miembro: string, tipo: string, familiar: string}>): void {
    let cells = ''

    rows.forEach(row => {
      cells += `<tr>
      <td>${row.miembro}</td>
      <td>${row.tipo}</td>
      <td>${row.familiar}</td>
      <td width="150px">
        <button data-id-miembro="${row.id_miembro}" data-id-familiar="${row.id_familiar}" data-type="view" class="btn btn-outline-dark">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button data-id-miembro="${row.id_miembro}" data-id-familiar="${row.id_familiar}" data-type="delete" class="btn btn-outline-danger">
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