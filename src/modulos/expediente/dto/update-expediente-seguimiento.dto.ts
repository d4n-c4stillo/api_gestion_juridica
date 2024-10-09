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
import { PartialType } from '@nestjs/swagger';
import { CreateExpedienteDto } from './create-expediente.dto';

export class UpdateExpedienteDto extends PartialType(CreateExpedienteDto) {

    @ApiProperty()    
    @IsBoolean()
    sentencia: boolean;

    @ApiProperty()    
    @IsString()
    sentenciaFecha: string;
  
    @ApiProperty()    
    @IsBoolean()
    calidadCosaJuzgada: boolean;

    @ApiProperty()    
    @IsString()
    fechaIngresoMemorial: string;

    @ApiProperty()   
    @IsBoolean()
    apelacion: boolean;

    @ApiProperty()   
    @IsString()
    fechaLimiteApelacion: string;
    
}
