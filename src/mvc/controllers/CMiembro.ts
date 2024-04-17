
import { MMiembro } from "../models/MMiembro";
import { VMiembro } from '../views/VMiembro';

export class CMiembro {
  private id: number;
  private model: MMiembro;
  private view: VMiembro;

  constructor() {
    this.model = new MMiembro();
    this.view = new VMiembro();

    this.id = 0;

    this._initListener();
  }

  setId(id: number): void {
    this.id = id;
  }

  create(): HTMLElement {
    this.list();
    this.view.clearData();

    return this.view.getHTML();
  }

  save(): HTMLElement {
    const data = this.view.getData();
    this.model.setData(data);
    const model = this.model.save();

    if (!model) {
      this.view.setDataError('Error');
    } else {
      this.view.setData(model);
    }

    this.list();
    return this.view.getHTML();
  }

  delete(): void {
    const state = this.model.delete(this.id);
    if (!state)
      this.view.setDataError('Error');

    this.view.clearData();
    this.list();
  }

  find(): void {
    const data = this.model.find(this.id);
    console.log(data);
    if (!data) {
      this.view.setDataError('error');
      return;
    }

    this.view.setData(data!);
  }

  list(): void {
    const rows = this.model.list();
    this.view.setTable(rows);
  }

  _initListener(): void {
    this.view.btnCreate.addEventListener('click', () => {
      this.create();
    });

    this.view.btnSave.addEventListener('click', () => {
      this.save();
    });

    this.view.outputTable.addEventListener('click', (evt) => {
      const element = evt.target as HTMLElement;
      if (element.nodeName != 'BUTTON')
        return;

      const id = element.getAttribute('data-id') || 0;
      console.log(id);
      if (element.getAttribute('data-type') == 'delete') {
        this.setId(Number(id));
        this.delete();
      }


      if (element.getAttribute('data-type') == 'view') {
        this.setId(Number(id));
        this.find();
      }
    });
  }
}