import { PartialType } from '@nestjs/swagger';
import { CreatePersonaDto } from './create-persona.dto';
import { ApiProperty } from '@nestjs/swagger';

import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class UpdatePersonaDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    paterno: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    materno: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nombres: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    tipoDocumentoId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nroDocumento: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fechaNacimiento: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    tipoNacionalidadId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    emailPersonal: string;

    @ApiProperty()  
    @IsString()    
    emailCorporativo: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    celular: string; 
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    profesion: string;

    @ApiProperty()
    @IsString()
    direccionProcesal: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    direccionPersonal: string;

    @ApiProperty()   
    @IsString()
    buffetConsultorio: string;

    @ApiProperty()
    @IsString()
    fotoUrl: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    personaTipoId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    clienteTipoId: number;



}
