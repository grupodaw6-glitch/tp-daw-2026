import { ApiProperty } from '@nestjs/swagger';
import { EstadosProyectosEnum } from '../../enums/estados-proyectos.enum';
import { ListTareaDTO } from './list-tareas.dto';

export class ProyectoDTO {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  nombre!: string;

  @ApiProperty()
  estado!: EstadosProyectosEnum;

  @ApiProperty()
  cliente!: string;

  @ApiProperty()
  tareas!: ListTareaDTO[];
}
