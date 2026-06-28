<<<<<<< HEAD
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateClienteDto } from './create-cliente.dto';
import { EstadosClientesEnum } from '../../enums/estados-clientes.enum';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @ApiProperty({
    enum: EstadosClientesEnum,
    example: EstadosClientesEnum.ACTIVO,
  })
  @IsEnum(EstadosClientesEnum)
  @IsOptional()
  estado!: EstadosClientesEnum;
}
=======
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { CreateClienteDto } from "./create-cliente.dto";
import { EstadosClientesEnum } from "../../enums/estados-clientes.enum";

export class UpdateClienteDto extends PartialType(CreateClienteDto) {

    @ApiProperty({ enum: EstadosClientesEnum, example: EstadosClientesEnum.ACTIVO })
    @IsEnum(EstadosClientesEnum)
    @IsOptional()
    estado!: EstadosClientesEnum;

}
>>>>>>> a23f12acb7680d9d875cff4a2915686659636823
