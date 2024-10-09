import { PartialType } from '@nestjs/swagger';
import { CreateExpedientPersonaDto } from './create-expediente-persona.dto';

export class UpdateExpedientePersonaDto extends PartialType(CreateExpedientPersonaDto) {}
