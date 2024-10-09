import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateExpedientPersonaDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    expedienteId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    tipoImplicadoId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    direccion: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    telefono: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    profesion: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    observacion: string;
  
   


}
