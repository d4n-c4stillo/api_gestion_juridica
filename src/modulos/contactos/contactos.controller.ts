import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactosService } from './contactos.service';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { RespuestaGenericaService } from "../../shared/respuesta.service";

@ApiTags('Contactos y Servicios ')
@Controller('contacto')

export class ContactosController {
  constructor(
    private readonly contactosService: ContactosService,
    private _serviceResp: RespuestaGenericaService,
  ) {}


  @Post('')
  create(@Body() createContactoDto: CreateContactoDto) {   
    return this.contactosService.create(createContactoDto);
  }

  @Get()
  findAll() {
    return this.contactosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactoDto: UpdateContactoDto) {
    return this.contactosService.update(+id, updateContactoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactosService.remove(+id);
  }
}
