import { Bautizo, Matrimonio, MinisterioMiembro } from "../system";

export interface MatrimonioConNombres extends Matrimonio {
    nombre_esposo?: string;
    nombre_esposa?: string;
}

export interface BautizoConNombres extends Bautizo {
    miembroNombre?: string;
}

export interface MinisterioMiembroConNombres extends MinisterioMiembro {
    miembroNombre?: string;
    ministerioNombre?: string;
}
