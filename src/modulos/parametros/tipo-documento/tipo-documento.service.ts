import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo-documento.dto';
import { RespuestaGenericaService } from "../../../shared/respuesta.service";

import { TipoDocumento } from "../../../entities/TipoDocumento";

@Injectable()
export class TipoDocumentoService {

  constructor(
    @InjectRepository(TipoDocumento)
    private tipoDocumentoRepository: Repository<TipoDocumento>,

    private _serviceResp: RespuestaGenericaService,
  ) { }

 
  async create(dto: CreateTipoDocumentoDto) {
    console.log('This action adds a new TipoDocumento');
    console.log('dto -->', dto);

    try {

      const res = await this.tipoDocumentoRepository
        .createQueryBuilder()
        .insert()
        .into(TipoDocumento)
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

      console.log("Error creacion de Tipo Documento: ", error);
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `Error creacion de Tipo Documento: ${error.message}`,
        },
        HttpStatus.ACCEPTED,
        {
          cause: error,
        }
      );

    }

  }

  async findAll() {
    const result = await this.tipoDocumentoRepository.find();

    return this._serviceResp.respuestaHttp200(
      result,
      "Dato Encontrado !!",
      ""
    );
  }

  async findOne(id: number) {
    const result = await this.tipoDocumentoRepository.findOneBy(
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

  async update(id: number, dto: UpdateTipoDocumentoDto) {
    console.log(`This action updates a #${id} tipoDocumento`);

    const data = await this.tipoDocumentoRepository
      .createQueryBuilder()
      .update(TipoDocumento)
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

    const result = await this.tipoDocumentoRepository
      .createQueryBuilder()
      .delete()
      .from(TipoDocumento)
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
