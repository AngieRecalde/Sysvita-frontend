
import {Ubigeo} from '../model/ubigeo';
export interface Persona {
    id_persona: number;
    id_ubigeo: number;
    nombres : string ;
    apellidos: string ;
    fecha_registro: Date;
    telefono: string;
    edad: number;
    fechaupdatepers: Date;

}
