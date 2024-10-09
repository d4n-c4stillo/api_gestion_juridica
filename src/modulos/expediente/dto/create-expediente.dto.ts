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

export class CreateExpedienteDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    codigoCud: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    codigoNurej: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    juzgadoDepto: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    juzgadoProv: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    juzgadoId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nombreCorto: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    descripcion: string;



}
