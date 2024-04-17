
export interface Miembro {
  id: number;
  nombre: string;
  telefono: number;
  direccion: string;
}

export interface Parentesco {
  id_miembro: number;
  id_familiar: number;
  id_tipo: number;
}

export interface Tipo_Familia{
  id: number;
  tipo: string;
}

export interface Ministerio {
  id: number;
  nombre: string;
  tipo: string;
}

export interface MinisterioMiembro {
  id_miembro: number;
  id_ministerio: number;
}

export interface Bautizo {
  id: number;
  padrino: string;
  madrina: string;
  lugar: string;
  fecha: string;
  id_miembro: number;
}

export interface Matrimonio {
  id: number;
  padrino: string;
  madrina: string;
  lugar: string;
  fecha: string;
  id_esposo: number;
  id_esposa: number;
}