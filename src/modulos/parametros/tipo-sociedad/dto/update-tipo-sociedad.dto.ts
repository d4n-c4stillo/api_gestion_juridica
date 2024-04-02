import { PartialType } from '@nestjs/swagger';
import { CreateTipoSociedadDto } from './create-tipo-sociedad.dto';

export class UpdateTipoSociedadDto extends PartialType(CreateTipoSociedadDto) {}
