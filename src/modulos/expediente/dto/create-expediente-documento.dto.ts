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

export class CreateExpedienteDocumentoDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fileName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mimeType: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    destination: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    size: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    descripcion: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    expedienteId: number;


}
