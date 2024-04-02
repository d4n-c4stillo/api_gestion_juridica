import { PartialType } from '@nestjs/swagger';
import { CreateTipoMembresiaDto } from './create-tipo-membresia.dto';

export class UpdateTipoMembresiaDto extends PartialType(CreateTipoMembresiaDto) {}
