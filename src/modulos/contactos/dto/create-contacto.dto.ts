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


export class CreateContactoDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    profesion: string;
   
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    ciudad: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    telefono: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;


}
