import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMembresiaDto } from './dto/create-membresia.dto';
import { UpdateMembresiaDto } from './dto/update-membresia.dto';

import { UsersMembresia } from "../../../src/entities/UsersMembresia";
import { RespuestaGenericaService } from "../../shared/respuesta.service";


@Injectable()
export class MembresiaService {

  constructor(
    @InjectRepository(UsersMembresia)
    private membresiaRepository: Repository<UsersMembresia>,

    private _serviceResp: RespuestaGenericaService,
  ) { }


  create(createMembresiaDto: CreateMembresiaDto) {
    return 'This action adds a new membresia';
  }

  async findAll() {
    console.log(`This action returns all membresia`);

    const result = await this.membresiaRepository.query(`

    SELECT 
    public.persona.id,
    public.persona.paterno,
    public.persona.materno,
    public.persona.nombres,
    public.users.email,
    public.users_membresia.tipo_membresia_id,
    public.tipo_membresia.nombre,
    public.users_membresia.fecha_inicio,
    public.users_membresia.fecha_limite,
    public.users_membresia.fecha_fin,
    public.users_membresia.causas_finalizacion,
    public.users_membresia.tipo_suscripcion_id,
    public.tipo_suscripcion.descripcion,
    public.tipo_suscripcion.validez_dias
  FROM
    public.users
    INNER JOIN public.persona ON (public.users.persona_id = public.persona.id)
    INNER JOIN public.users_membresia ON (public.users_membresia.user_id = public.users.id)
    INNER JOIN public.tipo_membresia ON (public.users_membresia.tipo_membresia_id = public.tipo_membresia.id)
    INNER JOIN public.tipo_suscripcion ON (public.users_membresia.tipo_suscripcion_id = public.tipo_suscripcion.id)
  
    
    `);

    return this._serviceResp.respuestaHttp200(
      result,
      "Registro Encontrado !!",
      ""
    );

  }

  async findOneByPersonaId(id: number) {
    console.log(`This action returns a #${id} personaId`);

    const result = await this.membresiaRepository.query(`

    SELECT 
    public.persona.id,
    public.persona.paterno,
    public.persona.materno,
    public.persona.nombres,
    public.users.email,
    public.users_membresia.tipo_membresia_id,
    public.tipo_membresia.nombre,
    public.users_membresia.fecha_inicio,
    public.users_membresia.fecha_limite,
    public.users_membresia.fecha_fin,
    public.users_membresia.causas_finalizacion,
    public.users_membresia.tipo_suscripcion_id,
    public.tipo_suscripcion.descripcion,
    public.tipo_suscripcion.validez_dias
  FROM
    public.users
    INNER JOIN public.persona ON (public.users.persona_id = public.persona.id)
    INNER JOIN public.users_membresia ON (public.users_membresia.user_id = public.users.id)
    INNER JOIN public.tipo_membresia ON (public.users_membresia.tipo_membresia_id = public.tipo_membresia.id)
    INNER JOIN public.tipo_suscripcion ON (public.users_membresia.tipo_suscripcion_id = public.tipo_suscripcion.id)
    where persona.id = ${id}
    
    `);

    return this._serviceResp.respuestaHttp200(
      result,
      "Registro Encontrado !!",
      ""
    );

  }

  async findOne(id: number) {
    console.log(`This action returns a #${id} membresiaId`);

    const result = await this.membresiaRepository.query(`

    SELECT 
    public.persona.id,
    public.persona.paterno,
    public.persona.materno,
    public.persona.nombres,
    public.users.email,
    public.users_membresia.tipo_membresia_id,
    public.tipo_membresia.nombre,
    public.users_membresia.fecha_inicio,
    public.users_membresia.fecha_limite,
    public.users_membresia.fecha_fin,
    public.users_membresia.causas_finalizacion,
    public.users_membresia.tipo_suscripcion_id,
    public.tipo_suscripcion.descripcion,
    public.tipo_suscripcion.validez_dias
  FROM
    public.users
    INNER JOIN public.persona ON (public.users.persona_id = public.persona.id)
    INNER JOIN public.users_membresia ON (public.users_membresia.user_id = public.users.id)
    INNER JOIN public.tipo_membresia ON (public.users_membresia.tipo_membresia_id = public.tipo_membresia.id)
    INNER JOIN public.tipo_suscripcion ON (public.users_membresia.tipo_suscripcion_id = public.tipo_suscripcion.id)
    where users_membresia.id = ${id}
    
    `);

    return this._serviceResp.respuestaHttp200(
      result,
      "Registro Encontrado !!",
      ""
    );

  }

  update(id: number, updateMembresiaDto: UpdateMembresiaDto) {
    return `This action updates a #${id} membresia`;
  }

  async remove(id: number) {
    console.log(`This action removes a #${id} membresia`);

    //TODO: Validar si existen registros

    const result = await this.membresiaRepository
      .createQueryBuilder()
      .delete()
      .from(UsersMembresia)
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
