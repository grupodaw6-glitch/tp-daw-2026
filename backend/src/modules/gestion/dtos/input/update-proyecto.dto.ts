<<<<<<< HEAD
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProyectoDto } from './create-proyecto.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { EstadosProyectosEnum } from '../../enums/estados-proyectos.enum';

export class UpdateProyectoDto extends PartialType(CreateProyectoDto) {
  @ApiProperty({
    enum: EstadosProyectosEnum,
    example: EstadosProyectosEnum.ACTIVO,
  })
  @IsEnum(EstadosProyectosEnum)
  @IsOptional()
  estado?: EstadosProyectosEnum;
}
=======
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateProyectoDto } from "./create-proyecto.dto";
import { IsEnum, IsOptional } from "class-validator";
import { EstadosProyectosEnum } from "../../enums/estados-proyectos.enum";

export class UpdateProyectoDto extends PartialType(CreateProyectoDto) {

    @ApiProperty({
        enum: EstadosProyectosEnum,
        example: EstadosProyectosEnum.ACTIVO
    })
    @IsEnum(EstadosProyectosEnum)
    @IsOptional()
    estado?: EstadosProyectosEnum;

}
>>>>>>> a23f12acb7680d9d875cff4a2915686659636823
