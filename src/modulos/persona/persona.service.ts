import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

import { Persona } from "../../../src/entities/Persona";
import { RespuestaGenericaService } from "../../shared/respuesta.service";


@Injectable()
export class PersonaService {

  constructor(
    @InjectRepository(Persona)
    private personaRepository: Repository<Persona>,

    private _serviceResp: RespuestaGenericaService,
  ) { }


  async create(dto: CreatePersonaDto) {
    console.log('This action adds a new persona');
    console.log('dto -->', dto);

    try {

      const res = await this.personaRepository
        .createQueryBuilder()
        .insert()
        .into(Persona)
        .values([
          {
            paterno: dto.paterno,
            materno: dto.materno,
            nombres: dto.nombres,
            tipoDocumentoId: dto.tipoDocumentoId,
            nroDocumento: dto.nroDocumento,
            fechaNacimiento: dto.fechaNacimiento,
            tipoNacionalidadId: dto.tipoNacionalidadId,
            emailPersonal: dto.emailPersonal,
            emailCorporativo: dto.emailCorporativo,
            celular: dto.celular,
            profesion: dto.profesion,
            direccionProcesal: dto.direccionProcesal,
            direccionPersonal: dto.direccionPersonal,
            buffetConsultorio: dto.buffetConsultorio,
            personaTipoId: dto.personaTipoId,
            clienteTipoId: dto.clienteTipoId
           

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

      console.log("Error creacion de Persona: ", error);
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `Error creacion de Persona: ${error.message}`,
        },
        HttpStatus.ACCEPTED,
        {
          cause: error,
        }
      );

    }

  }

  async findAll() {
    console.log(`This action returns all persona - clientes`);

    const result = await this.personaRepository.query(`

    SELECT 
    public.persona.id,
    public.persona."updatedAt",
    public.persona."createdAt",
    public.persona.paterno,
    public.persona.materno,
    public.persona.nombres,
    public.persona.tipo_documento_id,
    public.tipo_documento.descripcion as tipo_documento,
    public.tipo_documento.codigo as tipo_documento_codigo,
    public.persona.nro_documento,
    public.persona.fecha_nacimiento,
    public.persona.tipo_nacionalidad_id,
    public.tipo_nacionalidad.descripcion as tipo_nacionalidad,
    public.tipo_nacionalidad.codigo as tipo_nacionalidad_codigo,
    public.persona.email_personal,
    public.persona.email_corporativo,
    public.persona.celular,
    public.persona.profesion,
    public.persona.direccion_procesal,
    public.persona.direccion_personal,
    public.persona.buffet_consultorio,
    public.persona.foto_url,
    public.persona.cliente_tipo_id,
    public.persona.persona_tipo_id
  FROM
    public.persona
    INNER JOIN public.tipo_nacionalidad ON (public.persona.tipo_nacionalidad_id = public.tipo_nacionalidad.id)
    INNER JOIN public.tipo_documento ON (public.persona.tipo_documento_id = public.tipo_documento.id)
   where public.persona.persona_tipo_id = 1
    
    `);

    return this._serviceResp.respuestaHttp200(
      result,
      "Registro Encontrado !!",
      ""
    );


  }

  async findAllAbogados() {
    console.log(`This action returns all abogados`);

    const result = await this.personaRepository.query(`

    SELECT 
    public.persona.id,
    public.persona."updatedAt",
    public.persona."createdAt",
    public.persona.paterno,
    public.persona.materno,
    public.persona.nombres,
    public.persona.tipo_documento_id,
    public.tipo_documento.descripcion as tipo_documento,
    public.tipo_documento.codigo as tipo_documento_codigo,
    public.persona.nro_documento,
    public.persona.fecha_nacimiento,
    public.persona.tipo_nacionalidad_id,
    public.tipo_nacionalidad.descripcion as tipo_nacionalidad,
    public.tipo_nacionalidad.codigo as tipo_nacionalidad_codigo,
    public.persona.email_personal,
    public.persona.email_corporativo,
    public.persona.celular,
    public.persona.profesion,
    public.persona.direccion_procesal,
    public.persona.direccion_personal,
    public.persona.buffet_consultorio,
    public.persona.foto_url,
    public.persona.cliente_tipo_id,
    public.persona.persona_tipo_id
  FROM
    public.persona
    INNER JOIN public.tipo_nacionalidad ON (public.persona.tipo_nacionalidad_id = public.tipo_nacionalidad.id)
    INNER JOIN public.tipo_documento ON (public.persona.tipo_documento_id = public.tipo_documento.id)
   where public.persona.persona_tipo_id = 2 
    `);

    return this._serviceResp.respuestaHttp200(
      result,
      "Registro Encontrado !!",
      ""
    );


  }

  async findAllUsuarios() {
    console.log(`This action returns all usuarios`);

    const result = await this.personaRepository.query(`

        SELECT
        users.email,
        users.password,
        users."isActive" as activo,
        persona.paterno,
        persona.materno,
        persona.nombres,
        persona.cliente_tipo_id,
        persona.persona_tipo_id,
        users.rol_id 
      FROM
        users
        INNER JOIN persona ON users.persona_id = persona.id
    
    `);

    return this._serviceResp.respuestaHttp200(
      result,
      "Registro Encontrado !!",
      ""
    );


  }

  async findOne(id: number) {
    console.log(`This action returns all persona`);

    const result = await this.personaRepository.query(`

        SELECT 
        public.persona.id,
        public.persona."updatedAt",
        public.persona."createdAt",
        public.persona.paterno,
        public.persona.materno,
        public.persona.nombres,
        public.persona.tipo_documento_id,
        public.tipo_documento.descripcion as tipo_documento,
        public.tipo_documento.codigo as tipo_documento_codigo,
        public.persona.nro_documento,
        public.persona.fecha_nacimiento,
        public.persona.tipo_nacionalidad_id,
        public.tipo_nacionalidad.descripcion as tipo_nacionalidad,
        public.tipo_nacionalidad.codigo as tipo_nacionalidad_codigo,
        public.persona.email_personal,
        public.persona.email_corporativo,
        public.persona.celular,
        public.persona.profesion,
        public.persona.direccion_procesal,
        public.persona.direccion_personal,
        public.persona.buffet_consultorio,
        public.persona.foto_url
      FROM
        public.persona
        INNER JOIN public.tipo_nacionalidad ON (public.persona.tipo_nacionalidad_id = public.tipo_nacionalidad.id)
        INNER JOIN public.tipo_documento ON (public.persona.tipo_documento_id = public.tipo_documento.id)
      where persona.id = ${id}
    
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

  async update(id: number, dto: UpdatePersonaDto) {
    console.log(`This action updates a #${id} persona`);

    try {

      const data = await this.personaRepository
        .createQueryBuilder()
        .update(Persona)
        .set({

          paterno: dto.paterno,
          materno: dto.materno,
          nombres: dto.nombres,
          tipoDocumentoId: dto.tipoDocumentoId,
          nroDocumento: dto.nroDocumento,
          fechaNacimiento: dto.fechaNacimiento,
          tipoNacionalidadId: dto.tipoNacionalidadId,
          emailPersonal: dto.emailPersonal,
          emailCorporativo: dto.emailCorporativo,
          celular: dto.celular,
          profesion: dto.profesion,
          direccionProcesal: dto.direccionProcesal,
          direccionPersonal: dto.direccionPersonal,
          buffetConsultorio: dto.buffetConsultorio

          
        })
        .where("id = :id", { id: id })
        .execute();

      return this._serviceResp.respuestaHttp201(
        data,
        "Registro Creado !!",
        ""
      );

    } catch (error) {

      console.log("Error actualizacion de Persona: ", error);
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `Error actualizacion de Persona: ${error.message}`,
        },
        HttpStatus.ACCEPTED,
        {
          cause: error,
        }
      );


    }
  }

  async remove(id: number) {
    console.log(`This action removes a #${id} persona`);

    //TODO: Validar si existen registros

    const result = await this.personaRepository
      .createQueryBuilder()
      .delete()
      .from(Persona)
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
