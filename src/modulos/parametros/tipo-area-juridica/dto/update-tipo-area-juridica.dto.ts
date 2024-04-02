import { PartialType } from '@nestjs/swagger';
import { CreateTipoAreaJuridicaDto } from './create-tipo-area-juridica.dto';

export class UpdateTipoAreaJuridicaDto extends PartialType(CreateTipoAreaJuridicaDto) {}
