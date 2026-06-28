import { EstadosProyectosEnum } from '../../enums/estados-proyectos.enum';
import { ListTareaDTO } from './list-tareas.dto';
export declare class ProyectoDTO {
  id: number;
  nombre: string;
  estado: EstadosProyectosEnum;
  cliente: string;
  tareas: ListTareaDTO[];
}
