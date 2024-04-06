import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreatePersonaDto {

    @IsNotEmpty()
    @IsString()
    paterno: string;

    @IsNotEmpty()
    @IsString()
    materno: string;

    @IsNotEmpty()
    @IsString()
    nombres: string;

    @IsNotEmpty()
    @IsNumber()
    tipoDocumentoId: number;

    @IsNotEmpty()
    @IsString()
    nroDocumento: string;

    @IsNotEmpty()
    @IsString()
    fechaNacimiento: string;

    @IsNotEmpty()
    @IsNumber()
    tipoNacionalidadId: number;

    @IsNotEmpty()
    @IsString()
    emailPersonal: string;

    @IsNotEmpty()
    @IsString()    
    emailCorporativo: string;

    @IsNotEmpty()
    @IsString()
    celular: string; 
    
    @IsNotEmpty()
    @IsString()
    profesion: string;

    @IsNotEmpty()
    @IsString()
    direccionProcesal: string;

    @IsNotEmpty()
    @IsString()
    direccionPersonal: string;

    @IsNotEmpty()
    @IsString()
    buffetConsultorio: string;

    @IsString()
    fotoUrl: string;


}
