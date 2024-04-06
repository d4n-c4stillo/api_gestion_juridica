import { Controller, Get, Post, Body, Patch, Param, Delete, Put} from '@nestjs/common';
import { PersonaService } from './persona.service';

import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from "../../../src/entities/Persona";

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { TipoNacionalidadService } from '../parametros/tipo-nacionalidad/tipo-nacionalidad.service';
import { TipoDocumentoService } from '../parametros/tipo-documento/tipo-documento.service';


@ApiTags('Persona')
@Controller('persona')
export class PersonaController {
  constructor(
    private readonly personaService: PersonaService,
    private  tipoNacionalidadService: TipoNacionalidadService,
    private  tipoDocumentoService: TipoDocumentoService,
  ) {}

  @Post()
  create(@Body() createPersonaDto: CreatePersonaDto) {
    return this.personaService.create(createPersonaDto);
  }

  @Get()
  findAll() {
    return this.personaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personaService.update(+id, updatePersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personaService.remove(+id);
  }
}
