import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateExpedienteDto } from './dto/create-expediente.dto';
import { UpdateExpedienteDto } from './dto/update-expediente.dto';

import { Expediente } from "../../../src/entities/Expediente";
import { ExpedienteDocumento } from "../../../src/entities/ExpedienteDocumento";
import { ExpedientePersona } from "../../../src/entities/ExpedientePersona";
import { ExpedienteSeguimiento } from "../../../src/entities/ExpedienteSeguimiento";

import { RespuestaGenericaService } from "../../shared/respuesta.service";
import { CreateExpedienteDocumentoDto } from "./dto/create-expediente-documento.dto";
import { CreateExpedientPersonaDto } from "./dto/create-expediente-persona.dto";
import { UpdateExpedientePersonaDto } from "./dto/update-expediente-persona.dto";
import { CreateExpedientSeguimientoDto } from "./dto/create-expediente-seguimiento.dto";

import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ExpedienteService {

  constructor(
    @InjectRepository(Expediente)
    private expedienteoRepository: Repository<Expediente>,

    @InjectRepository(ExpedienteDocumento)
    private expedienteDocumentoRepository: Repository<ExpedienteDocumento>,

    @InjectRepository(ExpedientePersona)
    private expedientePersonaRepository: Repository<ExpedientePersona>,

    @InjectRepository(ExpedienteSeguimiento)
    private expedienteSeguimientoRepository: Repository<ExpedienteSeguimiento>,


    private _serviceResp: RespuestaGenericaService,
    private readonly mailerService: MailerService

  ) { }


  async create(dto: CreateExpedienteDto) {
    console.log('This action adds a new expediente');
    console.log('dto -->', dto);

    try {

      const res = await this.expedienteoRepository
        .createQueryBuilder()
        .insert()
        .into(Expediente)
        .values([
          {
            codigoCud: dto.codigoCud,
            codigoNurej: dto.codigoNurej,
            juzgadoDeptoId: dto.juzgadoDepto,
            juzgadoProvId: dto.juzgadoProv,
            juzgadoId: dto.juzgadoId,
            nombreCorto: dto.nombreCorto,
            descripcion: dto.descripcion,

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

      console.log("Error creacion del Expediente: ", error);
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `Error creacion del Expediente: ${error.message}`,
        },
        HttpStatus.ACCEPTED,
        {
          cause: error,
        }
      );

    }

  }

  async findAll() {
    console.log(`This action returns all expediente`);

    const result = await this.expedienteoRepository.query(`

        SELECT
          expediente.id, 
          expediente.numero_juzgado, 
          expediente.codigo_cud, 
          expediente.codigo_nurej, 
          expediente.nombre_corto, 
          expediente.descripcion, 
          expediente.juzgado_depto, 
          departamento.lugar, 
          expediente.juzgado_prov, 
          provincia.lugar, 
          expediente.juzgado_id, 
          expediente.abierto,
          juzgado.numero, 
          juzgado.oficina, 
          juzgado.ubicacion, 
          juzgado.materia, 
          juzgado.notificacion_dia1, 
          juzgado.notificacion_hora1, 
          juzgado.notificacion_dia2, 
          juzgado.notificacion_hora2
        FROM
          expediente
          INNER JOIN
          departamento
          ON 
            expediente.juzgado_depto = departamento.id
          INNER JOIN
          provincia
          ON 
            expediente.juzgado_prov = provincia.id
          INNER JOIN
          juzgado
          ON 
            expediente.juzgado_id = juzgado.id        

      `);


    return this._serviceResp.respuestaHttp200(
      result,
      "Registro Encontrado !!",
      ""
    );

  }

  async findOne(id: number) {
    console.log(`This action returns a #${id} expediente`);

    const result = await this.expedienteoRepository.query(`

      SELECT
        expediente.id, 
        expediente.numero_juzgado, 
        expediente.codigo_cud, 
        expediente.codigo_nurej, 
        expediente.nombre_corto, 
        expediente.descripcion, 
        expediente.juzgado_depto, 
        departamento.lugar as depto, 
        expediente.juzgado_prov, 
        provincia.lugar as prov, 
        expediente.juzgado_id, 
        juzgado.numero, 
        juzgado.oficina, 
        juzgado.ubicacion, 
        juzgado.materia, 
        juzgado.notificacion_dia1, 
        juzgado.notificacion_hora1, 
        juzgado.notificacion_dia2, 
        juzgado.notificacion_hora2
      FROM
        expediente
        INNER JOIN
        departamento
        ON 
          expediente.juzgado_depto = departamento.id
        INNER JOIN
        provincia
        ON 
          expediente.juzgado_prov = provincia.id
        INNER JOIN
        juzgado
        ON 
          expediente.juzgado_id = juzgado.id     
      where    
        expediente.id = ${id}

    `);


    return this._serviceResp.respuestaHttp200(
      result[0],
      "Registro Encontrado !!",
      ""
    );


  }

  async findDocumentosByExpedienteId(id: number) {
    console.log(`This action returns all expediente - documentos`);

    const result = await this.expedienteoRepository.query(`

      select * from expediente_documentos where expediente_id = ${id}

    `);


    return this._serviceResp.respuestaHttp200(
      result,
      "Registro Encontrado !!",
      ""
    );

  }

  update(id: number, updateExpedienteDto: UpdateExpedienteDto) {
    return `This action updates a #${id} expediente`;
  }

  remove(id: number) {
    return `This action removes a #${id} expediente`;
  }

  async removeDocumento(id: number) {
    console.log(`This action removes a #${id} expediente documento`);

    const result = await this.expedienteDocumentoRepository
      .createQueryBuilder()
      .delete()
      .from(ExpedienteDocumento)
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

  async createDocumento(dto: CreateExpedienteDocumentoDto) {
    console.log('This action adds a new archivo Documento');    
    console.log('dto -->', dto);

    try {

      const res = await this.expedienteDocumentoRepository
        .createQueryBuilder()
        .insert()
        .into(ExpedienteDocumento)
        .values([
          {
            
          fileName    : dto.fileName,
          mimeType    : dto.mimeType,
          destination : dto.destination,
          size        : dto.size,          
          nombre      : dto.nombre,
          descripcion : dto.descripcion,  
          expedienteId: dto.expedienteId

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


  async findPersonasByExpedienteId(id: number) {
    console.log(`This action returns all expediente - documentos`);

    const result = await this.expedienteoRepository.query(`

      SELECT
        *,
      CASE		
          WHEN tipo_implicado_id = 1 THEN
          'DEMANDADO' 
          WHEN tipo_implicado_id = 2 THEN
          'TESTIGO' 
          WHEN tipo_implicado_id = 3 THEN
          'JUEZ' 
        END AS tipo_implicado 
      FROM
        expediente_implicados       
      where expediente_id = ${id}

    `);


    return this._serviceResp.respuestaHttp200(
      result,
      "Registro Encontrado !!",
      ""
    );

  }

  async createPersona(dto: CreateExpedientPersonaDto) {
    console.log('This action adds a new expediente persona');    
    console.log('dto -->', dto);

    try {

      const res = await this.expedientePersonaRepository
        .createQueryBuilder()
        .insert()
        .into(ExpedientePersona)
        .values([
          {
            
          expedienteId: dto.expedienteId,
          tipoImplicadoId: dto.tipoImplicadoId,                 
          nombre      : dto.nombre,
          direccion: dto.direccion,
          telefono : dto.telefono,
          email:  dto.email,
          observacion: dto.observacion,
          profesion: dto.profesion
       
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

      console.log("Error creacion de Expediente Persona: ", error);
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

  async removePersona(id: number) {
    console.log(`This action removes a #${id} expediente persona`);

    const result = await this.expedientePersonaRepository
      .createQueryBuilder()
      .delete()
      .from(ExpedientePersona)
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

  async updatePersona(id: number, dto: UpdateExpedientePersonaDto) {
    console.log(`This action updates a #${id} expediente persona`);

    const data = await this.expedientePersonaRepository
      .createQueryBuilder()
      .update(ExpedientePersona)
      .set({

        tipoImplicadoId: dto.tipoImplicadoId,                 
        nombre      : dto.nombre,
        direccion: dto.direccion,
        telefono : dto.telefono,
        email:  dto.email,
        observacion: dto.observacion,
        profesion: dto.profesion
       
      })
      .where("id = :id", { id: id })
      .execute();

      return this._serviceResp.respuestaHttp201(
        data,
        "Registro Creado !!",
        ""
    );
  }

  async xgetAllTipoSeguimiento() {
    console.log(`This action returns all expediente tipo seguimiento`);

    /*const result = await this.expedienteoRepository.query(`

        SELECT *  from accion_seguimiento_tipo               

      `);


    return this._serviceResp.respuestaHttp200(
      result,
      "Registro Encontrado !!",
      ""
    );
*/
  }

  async getAllSeguimientoByExpedienteId(id: number) {
    console.log(`This action returns all expediente - seguimiento`);

    const result = await this.expedienteoRepository.query(`

      SELECT
        expediente_seguimiento.*, 
        accion_seguimiento_tipo.descripcion as tipo_seguimiento, 
        accion_seguimiento_tipo.nro_dias_respuesta, 
        accion_seguimiento_tipo.dias_calendario
      FROM
        expediente_seguimiento
        INNER JOIN
        accion_seguimiento_tipo
        ON 
          expediente_seguimiento.accion_seguimiento_tipo_id = accion_seguimiento_tipo.id            
      where expediente_id = ${id}

    `);


    return this._serviceResp.respuestaHttp200(
      result,
      "Registro Encontrado !!",
      ""
    );

  }

  async createSeguimiento(dto: CreateExpedientSeguimientoDto) {
    console.log('This action adds a new expediente seguimiento');    
    console.log('dto -->', dto);

    dto.proximaFechaRespuesta = '10/10/2024';

    try {

      const res = await this.expedienteSeguimientoRepository
        .createQueryBuilder()
        .insert()
        .into(ExpedienteSeguimiento)
        .values([
          {
            
          expedienteId: dto.expedienteId,
          fecha: dto.fecha,
          accionSeguimientoTipoId: dto.accionSeguimientoTipoId,
          observacion: dto.observacion,
          descripcion: dto.descripcion,
          proximaFechaRespuesta: '10/10/2024',//dto.proximaFechaRespuesta,
          /*sentencia: dto.sentencia,
          sentenciaFecha: dto.sentenciaFecha,
          calidadCosaJuzgada: dto.calidadCosaJuzgada,
          fechaIngresoMemorial: dto.fechaIngresoMemorial,
          apelacion:dto.apelacion,
          fechaLimiteApelacion: dto.fechaLimiteApelacion*/
       
          },
        ])
        .returning("id")
        .execute();

        let enviado = this.sendMail(dto);

      return this._serviceResp.respuestaHttp201(
        res,
        "Registro Creado !!",
        ""
      );

    } catch (error) {

      console.log("Error creacion de Expediente seguimiento: ", error);
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `Error creacion de seguimiento: ${error.message}`,
        },
        HttpStatus.ACCEPTED,
        {
          cause: error,
        }
      );

    }
  }

  async getAllTipoSeguimiento(){

   
      console.log(`This action returns all expediente tipo seguimiento`);
  
      const result = await this.expedienteoRepository.query(`
  
          SELECT *  from accion_seguimiento_tipo               
  
        `);
  
  
      return this._serviceResp.respuestaHttp200(
        result,
        "Registro Encontrado !!",
        ""
      );
  
 
  }

  async removeSeguimiento(id: number) {
    console.log(`This action removes a #${id} expediente seguimiento`);

    const result = await this.expedienteSeguimientoRepository
      .createQueryBuilder()
      .delete()
      .from(ExpedienteSeguimiento)
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

  async sendMail(dto) {
    console.log('enviando email....');
    let tipo_seguimiento = '';
    switch(dto.accionSeguimientoTipoId) {
      case 1:
        tipo_seguimiento = 'Auto Interlocutorio'
        break;
      case 2:
         tipo_seguimiento = 'Decreto'
        break;
      case 3:
         tipo_seguimiento = 'Resolucion'
        break;
      case 4:
         tipo_seguimiento = 'Sentencia'
        break;
      case 5:
         tipo_seguimiento = 'Subsanar'
        break;
      case 6:
         tipo_seguimiento = 'Sin Informacion'
        break;
      case 7:
         tipo_seguimiento = 'Auto de Apertura de Pruebas'
        break;
      case 8:
         tipo_seguimiento = 'Audiencia'
        break;
      case 9:
         tipo_seguimiento = 'Apelación'
        break;
    }

    try {
      await this.mailerService.sendMail({
        to: 'd4n.c4stillo@gmail.com',
        from: '"GESTION JURIDICA" <linux@over.windows>', // sender address
        subject: 'ALARMA - EXPEDIENTE', // Subject line
        text: '', // plaintext body
        html: `<p>CASO: INTENTO DE FEMENICIDIO</p><p>${tipo_seguimiento}</p><p>USTED TIENE UNA ALARMA PENDIENTE FECHA: <strong>05/08/2024 - 15:30</strong></p><p> Descripcion: ${dto.descripcion}</p><p> Observacion: ${dto.observacion}</p><p> Proxima Fecha de Respuesta: ${dto.proximaFechaRespuesta}</p>`,
      });
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
      };
    }
  }


}
