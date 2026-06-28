<<<<<<< HEAD
import { ApiProperty } from '@nestjs/swagger';
import { EstadosProyectosEnum } from '../../enums/estados-proyectos.enum';
import { ListClienteDTO } from './list-cliente.dto';

export class ListProyectoDTO {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  nombre!: string;

  @ApiProperty()
  estado!: EstadosProyectosEnum;

  @ApiProperty()
  cliente!: ListClienteDTO;
}
=======
import { ApiProperty } from "@nestjs/swagger";
import { EstadosProyectosEnum } from "../../enums/estados-proyectos.enum";
import { ListClienteDTO } from "./list-cliente.dto";

export class ListProyectoDTO {

    @ApiProperty()
    id!: number;

    @ApiProperty()
    nombre!: string;

    @ApiProperty()
    estado!: EstadosProyectosEnum;

    @ApiProperty()
    cliente!: ListClienteDTO;

}
>>>>>>> a23f12acb7680d9d875cff4a2915686659636823
