import {Test} from '../model/test';
import {Usuario} from '../model/usuario';
export interface ResultadoTest {
    id_resultado:number;
    id_test:number;
    id_usuario:number;
    fecha_realizacion:Date;
    puntaje:number;
    respuestas:string;
}
