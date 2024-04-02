import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTipoMembresiaDto } from './dto/create-tipo-membresia.dto';
import { UpdateTipoMembresiaDto } from './dto/update-tipo-membresia.dto';
import { RespuestaGenericaService } from "../../../shared/respuesta.service";

import { TipoMembresia } from "../../../entities/TipoMembresia";

@Injectable()
export class TipoMembresiaService {

  constructor(
    @InjectRepository(TipoMembresia)
    private tipoMembresiaRepository: Repository<TipoMembresia>,

    private _serviceResp: RespuestaGenericaService,
  ) { }


  async create(dto: CreateTipoMembresiaDto) {
    console.log('This action adds a new tipoSuscripcion');
    console.log('dto -->', dto);

    try {

      const res = await this.tipoMembresiaRepository
        .createQueryBuilder()
        .insert()
        .into(TipoMembresia)
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

      console.log("Error creacion de Tipo Membresia: ", error);
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `Error creacion de Tipo Membresia: ${error.message}`,
        },
        HttpStatus.ACCEPTED,
        {
          cause: error,
        }
      );

    }
  }

  async findAll() {
    const result = await this.tipoMembresiaRepository.find();

    return this._serviceResp.respuestaHttp200(
      result,
      "Dato Encontrado !!",
      ""
    );
  }

  async findOne(id: number) {
    const result = await this.tipoMembresiaRepository.findOneBy(
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

  async update(id: number, dto: UpdateTipoMembresiaDto) {
    console.log(`This action updates a #${id} tipoMembresia`);

    const data = await this.tipoMembresiaRepository
      .createQueryBuilder()
      .update(TipoMembresia)
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

    const result = await this.tipoMembresiaRepository
      .createQueryBuilder()
      .delete()
      .from(TipoMembresia)
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
