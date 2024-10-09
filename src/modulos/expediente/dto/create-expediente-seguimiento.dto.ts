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

export class CreateExpedientSeguimientoDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    expedienteId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    accionSeguimientoTipoId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fecha: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    observacion: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @ApiProperty()    
    @IsString()
    proximaFechaRespuesta: string;

   
    

}
