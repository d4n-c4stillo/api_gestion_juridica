
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

export class CreateTipoSuscripcionDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @ApiProperty()
    @IsNumber()
    validezDias: number;

    @ApiProperty()
    @IsBoolean()
    activo: boolean;


}
