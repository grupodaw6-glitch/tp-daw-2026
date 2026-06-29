<<<<<<< HEAD
import { ApiProperty } from '@nestjs/swagger';
import { EstadosTareasEnum } from '../../enums/estados-tareas.enum';

export class ListTareaDTO {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  descripcion!: string;

  @ApiProperty()
  estado!: EstadosTareasEnum;
}
=======
import { ApiProperty } from "@nestjs/swagger";
import { EstadosTareasEnum } from "../../enums/estados-tareas.enum";

export class ListTareaDTO {

    @ApiProperty()
    id!: number;

    @ApiProperty()
    descripcion!: string;

    @ApiProperty()
    estado!: EstadosTareasEnum;

}
>>>>>>> a23f12acb7680d9d875cff4a2915686659636823
