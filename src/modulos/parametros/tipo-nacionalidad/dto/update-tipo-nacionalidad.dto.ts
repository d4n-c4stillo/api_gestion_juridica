import { PartialType } from '@nestjs/swagger';
import { CreateTipoNacionalidadDto } from './create-tipo-nacionalidad.dto';

export class UpdateTipoNacionalidadDto extends PartialType(CreateTipoNacionalidadDto) {}
