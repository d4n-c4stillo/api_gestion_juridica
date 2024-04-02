import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTipoAreaJuridicaDto } from './dto/create-tipo-area-juridica.dto';
import { UpdateTipoAreaJuridicaDto } from './dto/update-tipo-area-juridica.dto';

import { RespuestaGenericaService } from "../../../shared/respuesta.service";

import { TipoAreaJuridica } from "../../../entities/TipoAreaJuridica";

@Injectable()
export class TipoAreaJuridicaService {

  constructor(
    @InjectRepository(TipoAreaJuridica)
    private tipoAreaJuridicaRepository: Repository<TipoAreaJuridica>,

    private _serviceResp: RespuestaGenericaService,
  ) { }

  async create(dto: CreateTipoAreaJuridicaDto) {
    console.log('This action adds a new tipoAreaJuridica');
    console.log('dto -->', dto);

    try {

      const res = await this.tipoAreaJuridicaRepository
        .createQueryBuilder()
        .insert()
        .into(TipoAreaJuridica)
        .values([
          {
            descripcion: dto.descripcion,
            nombre: dto.nombre,
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
    const result = await this.tipoAreaJuridicaRepository.find();

    return this._serviceResp.respuestaHttp200(
      result,
      "Dato Encontrado !!",
      ""
    );
  }

  async findOne(id: number) {
    const result = await this.tipoAreaJuridicaRepository.findOneBy(
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

  async update(id: number, dto: UpdateTipoAreaJuridicaDto) {
    console.log(`This action updates a #${id} tipoAreaJuridica`);

    const data = await this.tipoAreaJuridicaRepository
      .createQueryBuilder()
      .update(TipoAreaJuridica)
      .set({
        descripcion: dto.descripcion,
        nombre: dto.nombre,
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

    const result = await this.tipoAreaJuridicaRepository
      .createQueryBuilder()
      .delete()
      .from(TipoAreaJuridica)
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
