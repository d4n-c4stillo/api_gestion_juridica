import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MembresiaService } from './membresia.service';
import { CreateMembresiaDto } from './dto/create-membresia.dto';
import { UpdateMembresiaDto } from './dto/update-membresia.dto';

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UsersMembresia } from "../../../src/entities/UsersMembresia";

import { TipoMembresiaService } from '../parametros/tipo-membresia/tipo-membresia.service';
import { TipoSuscripcionService } from '../parametros/tipo-suscripcion/tipo-suscripcion.service';
import { UsersService } from '../../users/users.service';

@ApiTags('Membresia')
@Controller('membresia')
export class MembresiaController {
  constructor(
    private readonly membresiaService: MembresiaService,
    private usersService: UsersService,
    //TODO: importar esto:
    //private tipoSuscripcionServoce: TipoSuscripcionService,
    //private tipoMembresiaService: TipoMembresiaService,
  ) {}

  @Post()
  create(@Body() createMembresiaDto: CreateMembresiaDto) {
    return this.membresiaService.create(createMembresiaDto);
  }

  @Get()
  findAll() {
    return this.membresiaService.findAll();
  }

  @Get('byPersonaId/:id')
  findOne(@Param('id') id: string) {
    return this.membresiaService.findOneByPersonaId(+id);
  }

  @Get(':id')
  findOneMembresi(@Param('id') id: string) {
    return this.membresiaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMembresiaDto: UpdateMembresiaDto) {
    return this.membresiaService.update(+id, updateMembresiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membresiaService.remove(+id);
  }
}
