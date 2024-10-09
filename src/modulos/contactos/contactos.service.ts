import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";


import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';

import { Contacto } from "../../../src/entities/Contacto";
import { RespuestaGenericaService } from "../../shared/respuesta.service";

@Injectable()
export class ContactosService {


  constructor(
    @InjectRepository(Contacto)
    private contactoRepository: Repository<Contacto>,
    private _serviceResp: RespuestaGenericaService,
  ) { }


  async create(dto: CreateContactoDto) {
    console.log('This action adds a new contacto');
    console.log('dto -->', dto);

    try {

      const res = await this.contactoRepository
        .createQueryBuilder()
        .insert()
        .into(Contacto)
        .values([
          {
            
          nombre      : dto.nombre,
          profesion   : dto.profesion,
          ciudad      : dto.ciudad,
          telefono    : dto.telefono,
          email       : dto.email,
          
          },
        ])
        .returning("id")
        .execute();

      return this._serviceResp.respuestaHttp201(
        res,
        "Registro Creado !!",
        ""
      );

    } catch (error) {

      console.log("Error creacion de Contacto: ", error);
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `Error creacion de Contacto: ${error.message}`,
        },
        HttpStatus.ACCEPTED,
        {
          cause: error,
        }
      );

    }

  }

  async findAll() {
    console.log(`This action returns all contactos`);

    console.log(`This action returns all archivos`);
    const result = await this.contactoRepository.query(`
        select *  from  contacto order by 1 desc
    `);

    if (result.length > 0) {
      return this._serviceResp.respuestaHttp200(
        result,
        "Registro Encontrado !!",
        ""
      );
    }

    return this._serviceResp.respuestaHttp404(
      false,
      "Registro No Encontrado !!",
      ""
    );

  }

  findOne(id: number) {
    return `This action returns a #${id} contacto`;
  }

  update(id: number, updateContactoDto: UpdateContactoDto) {
    return `This action updates a #${id} contacto`;
  }

  remove(id: number) {
    return `This action removes a #${id} contacto`;
  }
}
