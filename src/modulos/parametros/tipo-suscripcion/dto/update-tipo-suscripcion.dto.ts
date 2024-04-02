import { PartialType } from '@nestjs/swagger';
import { CreateTipoSuscripcionDto } from './create-tipo-suscripcion.dto';

export class UpdateTipoSuscripcionDto extends PartialType(CreateTipoSuscripcionDto) {}
