<<<<<<< HEAD
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTareaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descripcion!: string;
}
=======
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTareaDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descripcion!: string;

}
>>>>>>> a23f12acb7680d9d875cff4a2915686659636823
