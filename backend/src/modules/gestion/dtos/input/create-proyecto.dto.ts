<<<<<<< HEAD
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProyectoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  idCliente!: number;
}
=======
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProyectoDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    idCliente!: number;

}
>>>>>>> a23f12acb7680d9d875cff4a2915686659636823
