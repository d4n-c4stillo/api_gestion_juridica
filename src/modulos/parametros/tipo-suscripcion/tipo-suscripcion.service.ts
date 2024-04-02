import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateTipoSuscripcionDto } from './dto/create-tipo-suscripcion.dto';
import { UpdateTipoSuscripcionDto } from './dto/update-tipo-suscripcion.dto';
import { RespuestaGenericaService } from "../../../shared/respuesta.service";

import { TipoSuscripcion } from "../../../entities/TipoSuscripcion";

@Injectable()
export class TipoSuscripcionService {

  constructor(
    @InjectRepository(TipoSuscripcion)
    private tipoSuscripcionRepository: Repository<TipoSuscripcion>,

    private _serviceResp: RespuestaGenericaService,
  ) { }


  async create(dto: CreateTipoSuscripcionDto) {
    console.log('This action adds a new tipoSuscripcion');
    console.log('dto -->', dto);

    try {

      const res = await this.tipoSuscripcionRepository
        .createQueryBuilder()
        .insert()
        .into(TipoSuscripcion)
        .values([
          {
            descripcion: dto.descripcion,
            validezDias: dto.validezDias,
            activo: dto.activo
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

      console.log("Error creacion de Tipo Suscripcion: ", error);
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `Error creacion de Tipo Suscripcion: ${error.message}`,
        },
        HttpStatus.ACCEPTED,
        {
          cause: error,
        }
      );

    }


  }

  async findAll() {
    const result = await this.tipoSuscripcionRepository.find();

    return this._serviceResp.respuestaHttp200(
      result,
      "Dato Encontrado !!",
      ""
    );

  }

  async findOne(id: number) {
    const result = await this.tipoSuscripcionRepository.findOneBy(
      {
        id: id
      }
    );

    return this._serviceResp.respuestaHttp200(
      result,
      "Dato Encontrado !!",
      ""
    );
  }

  async update(id: number, dto: UpdateTipoSuscripcionDto) {
    console.log(`This action updates a #${id} tipoSuscripcion`);

    const data = await this.tipoSuscripcionRepository
      .createQueryBuilder()
      .update(TipoSuscripcion)
      .set({
        descripcion: dto.descripcion,
        validezDias: dto.validezDias,
        activo: dto.activo
      })
      .where("id = :id", { id: id })
      .execute();

      return this._serviceResp.respuestaHttp201(
        data,
        "Registro Creado !!",
        ""
    );


  }

  async remove(id: number) {

    //TODO: Validar si existen registros

    const result = await this.tipoSuscripcionRepository
      .createQueryBuilder()
      .delete()
      .from(TipoSuscripcion)
      .where("id = :id", { id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException("registro no encontrado !");
    }

    return this._serviceResp.respuestaHttp203(
      result,
      "Registro Eliminado !!",
      ""
    );
  }
}
