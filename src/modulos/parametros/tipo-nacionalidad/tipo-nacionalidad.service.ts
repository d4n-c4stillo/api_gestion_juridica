import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTipoNacionalidadDto } from './dto/create-tipo-nacionalidad.dto';
import { UpdateTipoNacionalidadDto } from './dto/update-tipo-nacionalidad.dto';

import { RespuestaGenericaService } from "../../../shared/respuesta.service";
import { TipoNacionalidad } from "../../../entities/TipoNacionalidad";

@Injectable()
export class TipoNacionalidadService {

  constructor(
    @InjectRepository(TipoNacionalidad)
    private tipoNacionalidadRepository: Repository<TipoNacionalidad>,

    private _serviceResp: RespuestaGenericaService,
  ) { }

  async create(dto: CreateTipoNacionalidadDto) {
    console.log('This action adds a new tiponacionalidad');
    console.log('dto -->', dto);

    try {

      const res = await this.tipoNacionalidadRepository
        .createQueryBuilder()
        .insert()
        .into(TipoNacionalidad)
        .values([
          {
            descripcion: dto.descripcion,
            codigo: dto.codigo,
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

      console.log("Error creacion de Tipo Nacionalidad: ", error);
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `Error creacion de Tipo Nacionalidad: ${error.message}`,
        },
        HttpStatus.ACCEPTED,
        {
          cause: error,
        }
      );

    }
  }

  async findAll() {
    const result = await this.tipoNacionalidadRepository.find();

    return this._serviceResp.respuestaHttp200(
      result,
      "Dato Encontrado !!",
      ""
    );
  }

  async findOne(id: number) {
    const result = await this.tipoNacionalidadRepository.findOneBy(
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

  async update(id: number, dto: UpdateTipoNacionalidadDto) {
    
    console.log(`This action updates a #${id} tipoNacionalidad`);

    const data = await this.tipoNacionalidadRepository
      .createQueryBuilder()
      .update(TipoNacionalidad)
      .set({
        descripcion: dto.descripcion,
        codigo: dto.codigo,
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

    const result = await this.tipoNacionalidadRepository
      .createQueryBuilder()
      .delete()
      .from(TipoNacionalidad)
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
