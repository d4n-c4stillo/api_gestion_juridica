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

export class UpdateArchivoDto {

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
    @IsNumber()
    grupoId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    titulo: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    autor: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    metaData: string;

    @ApiProperty()
    @IsBoolean()
    vip: boolean;

    @ApiProperty()
    @IsBoolean()
    gold: boolean;

    @ApiProperty()
    @IsBoolean()
    starter: boolean;


}
