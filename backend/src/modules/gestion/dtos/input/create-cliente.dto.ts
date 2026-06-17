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