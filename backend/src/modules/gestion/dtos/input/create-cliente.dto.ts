<<<<<<< HEAD
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  mail?: string;
}
=======
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClienteDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    telefono?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    mail?: string;

}
>>>>>>> a23f12acb7680d9d875cff4a2915686659636823
