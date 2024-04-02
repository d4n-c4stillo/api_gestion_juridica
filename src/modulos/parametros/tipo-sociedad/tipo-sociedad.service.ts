import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateTipoSociedadDto } from './dto/create-tipo-sociedad.dto';
import { UpdateTipoSociedadDto } from './dto/update-tipo-sociedad.dto';
import { RespuestaGenericaService } from "../../../shared/respuesta.service";

import { TipoSociedad } from "../../../entities/TipoSociedad";

@Injectable()
export class TipoSociedadService {

  constructor(
    @InjectRepository(TipoSociedad)
    private tipoSociedadRepository: Repository<TipoSociedad>,

    private _serviceResp: RespuestaGenericaService,
  ) { }

  async create(dto: CreateTipoSociedadDto) {
    console.log('This action adds a new tipoSociedad');
    console.log('dto -->', dto);

    try {

      const res = await this.tipoSociedadRepository
        .createQueryBuilder()
        .insert()
        .into(TipoSociedad)
        .values([
          {
            nombre: dto.nombre,            
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

      console.log("Error creacion de Tipo Sociedad: ", error);
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `Error creacion de Tipo Sociedad: ${error.message}`,
        },
        HttpStatus.ACCEPTED,
        {
          cause: error,
        }
      );

    }
  }

  async findAll() {
    const result = await this.tipoSociedadRepository.find();

    return this._serviceResp.respuestaHttp200(
      result,
      "Dato Encontrado !!",
      ""
    );
  }

  async findOne(id: number) {
    const result = await this.tipoSociedadRepository.findOneBy(
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

  async update(id: number, dto: UpdateTipoSociedadDto) {
    console.log(`This action updates a #${id} tipoSociedad`);

    const data = await this.tipoSociedadRepository
      .createQueryBuilder()
      .update(TipoSociedad)
      .set({
        nombre: dto.nombre,            
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

    const result = await this.tipoSociedadRepository
      .createQueryBuilder()
      .delete()
      .from(TipoSociedad)
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

