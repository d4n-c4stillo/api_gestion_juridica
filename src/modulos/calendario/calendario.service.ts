import { Injectable } from '@nestjs/common';

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { Calendar } from "../../../src/entities/Calendar";
import { RespuestaGenericaService } from "../../shared/respuesta.service";


import { CreateCalendarioDto } from './dto/create-calendario.dto';
import { UpdateCalendarioDto } from './dto/update-calendario.dto';

@Injectable()
export class CalendarioService {

  constructor(
    @InjectRepository(Calendar)
    private calendarRepository: Repository<Calendar>,

    private _serviceResp: RespuestaGenericaService,
  ) { }

  create(createCalendarioDto: CreateCalendarioDto) {
    return 'This action adds a new calendario';
  }

  async findAll() {
    console.log(`This action returns all calendar`);

    const result = await this.calendarRepository.query(`

    SELECT 
    *
  FROM
      public.calendar
    
    `);

    return this._serviceResp.respuestaHttp200(
      result,
      "Registro Encontrado !!",
      ""
    );

  }

  findOne(id: number) {
    return `This action returns a #${id} calendario`;
  }

  update(id: number, updateCalendarioDto: UpdateCalendarioDto) {
    return `This action updates a #${id} calendario`;
  }

  remove(id: number) {
    return `This action removes a #${id} calendario`;
  }
}
