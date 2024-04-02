
import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';

export class CreateTipoSuscripcionDto {

    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @IsNumber()
    validezDias: number;

    @ IsBoolean()
    activo: boolean;


}
