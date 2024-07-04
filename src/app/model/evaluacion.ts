import {ResultadoTest} from '../model/resultadotest';
import {Especialista} from '../model/especialista';
export interface Evaluacion {
    id_evaluacion: number;
    id_resultado:number;
    diagnostico:Text;
    fundamentacion:Text;
}
