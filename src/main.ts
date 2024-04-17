import { createRouter } from 'routerjs';

import './style.css';

import { CMiembro } from './mvc/controllers/CMiembro';
import { CMinisterio } from './mvc/controllers/CMinisterio';
import { CMinisterioMiembro } from './mvc/controllers/CMinisterioMiembro';
import { CBautizo } from './mvc/controllers/CBautizo';
import { CTipoFamilia } from './mvc/controllers/CTipoFamilia';
import { CParentesco } from "./mvc/controllers/CParentesco";
import { CMatrimonio } from "./mvc/controllers/CMatrimonio";

const root = document.querySelector('#app') as HTMLDivElement;

const Miembro = new CMiembro();
const TipoFamilia = new CTipoFamilia();
const Parentesco = new CParentesco();
const Ministerio = new CMinisterio();
const MinisterioMiembro = new CMinisterioMiembro();
const Bautizo = new CBautizo();
const Matrimonio = new CMatrimonio();

let response!: HTMLElement;

createRouter()
  .get('/miembro', () => {
    response = Miembro.create();
    root.innerHTML = '';
    root.append(response);
  })
  .get('/ministerio', () => {
    response = Ministerio.create();
    root.innerHTML = '';
    root.append(response);
  })
  .get('/ministerio-miembro', () => {
    response = MinisterioMiembro.create();
    root.innerHTML = '';
    root.append(response);
  })
  .get('/parentesco', () => {
    response = Parentesco.create();
    root.innerHTML = '';
    root.append(response);
  })
  .get('/tipo-familia', () => {
    response = TipoFamilia.create();
    root.innerHTML = '';
    root.append(response);
  })
  .get('/bautizo', () => {
    response = Bautizo.create();
    root.innerHTML = '';
    root.append(response);
  })
  .get('/matrimonio', () => {
    response = Matrimonio.create();
    root.innerHTML = '';
    root.append(response);
  }).run();