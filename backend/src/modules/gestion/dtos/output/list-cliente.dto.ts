<<<<<<< HEAD
import { ApiProperty } from '@nestjs/swagger';
import { EstadosClientesEnum } from '../../enums/estados-clientes.enum';

export class ListClienteDTO {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  nombre!: string;

  @ApiProperty()
  estado!: EstadosClientesEnum;

  @ApiProperty({ required: false })
  telefono?: string;

  @ApiProperty({ required: false })
  mail?: string;
}
=======
import { ApiProperty } from "@nestjs/swagger";
import { EstadosClientesEnum } from "../../enums/estados-clientes.enum";

export class ListClienteDTO {

    @ApiProperty()
    id!: number;

    @ApiProperty()
    nombre!: string;

    @ApiProperty()
    estado!: EstadosClientesEnum;

    @ApiProperty({ required: false })
    telefono?: string;

    @ApiProperty({ required: false })
    mail?: string;

}
>>>>>>> a23f12acb7680d9d875cff4a2915686659636823
