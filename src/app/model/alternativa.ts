import {Pregunta} from '../model/pregunta';
export interface Alternativa {
    id_alternativa: number;
    id_pregunta : number;
    texto_opcion:Text;
    valor: number;
}
