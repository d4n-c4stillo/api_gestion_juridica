import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';
import { Archivo } from "../../../src/entities/Archivo";
import { RespuestaGenericaService } from "../../shared/respuesta.service";

@Injectable()
export class ArchivosService {

  constructor(
    @InjectRepository(Archivo)
    private archivoRepository: Repository<Archivo>,
    private _serviceResp: RespuestaGenericaService,
  ) { }


  async create(dto: CreateArchivoDto) {
    console.log('This action adds a new archivo');    
    console.log('dto -->', dto);

    try {

      const res = await this.archivoRepository
        .createQueryBuilder()
        .insert()
        .into(Archivo)
        .values([
          {
            
          fileName    : dto.fileName,
          mimeType    : dto.mimeType,
          destination : dto.destination,
          size        : dto.size,
          grupoId     : dto.grupoId,
          titulo      : dto.titulo,
          descripcion : dto.descripcion,
          autor       : dto.autor,
          metaData    : dto.metaData,
          vip         : dto.vip,
          gold        : dto.gold,
          starter     : dto.starter
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

      console.log("Error creacion de Archivo: ", error);
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `Error creacion de Archivo: ${error.message}`,
        },
        HttpStatus.ACCEPTED,
        {
          cause: error,
        }
      );

    }
  }

  async findAllByGrupoId(id: number) {
    console.log(`This action returns all archivos by groupID`);

    const result = await this.archivoRepository.query(`

    select a.*, tga.nombre from archivo a
    inner join tipo_grupo_archivo tga on tga.id =  a.grupo_id  
    where tga.id = ${id}      
    
    `);

    if (result.length > 0) {
      return this._serviceResp.respuestaHttp200(
        result[0],
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

  async findAll() {
    console.log(`This action returns all archivos`);
    const result = await this.archivoRepository.query(`

    select a.*, tga.nombre from archivo a
    inner join tipo_grupo_archivo tga on tga.id =  a.grupo_id          
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

  async findOne(id: number) {
    console.log(`This action returns a #${id} archivo`);

    const result = await this.archivoRepository.query(`

    select a.*, tga.nombre from archivo a
    inner join tipo_grupo_archivo tga on tga.id =  a.grupo_id  
    where a.id = ${id}      
    
    `);

    if (result.length > 0) {
      return this._serviceResp.respuestaHttp200(
        result[0],
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

  update(id: number, updateArchivoDto: UpdateArchivoDto) {
    console.log(`This action updates a #${id} archivo`);

    
  }

  async remove(id: number) {
    console.log(`This action removes a #${id} archivo`);

    //TODO: Validar si existen registros

    const result = await this.archivoRepository
      .createQueryBuilder()
      .delete()
      .from(Archivo)
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
