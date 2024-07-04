import {Persona} from '../model/persona';
import {Rol} from '../model/rol';
export interface Usuario {
    id_usuario : number ;
    id_persona: number;
    id_rol: number;
    email : string ;
    password_hash : string;
    fechaupdateuser: Date; 
}
