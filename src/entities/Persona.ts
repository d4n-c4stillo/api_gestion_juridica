import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("persona_pk", ["id"], { unique: true })
@Entity("persona", { schema: "public" })
export class Persona {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", {
    name: "updatedAt",
    default: () => "now()",
  })
  updatedAt: Date;

  @Column("timestamp without time zone", {
    name: "createdAt",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("character varying", { name: "paterno" })
  paterno: string;

  @Column("character varying", { name: "materno" })
  materno: string;

  @Column("character varying", { name: "nombres" })
  nombres: string;

  @Column("integer", { name: "tipo_documento_id" })
  tipoDocumentoId: number;

  @Column("character varying", { name: "nro_documento" })
  nroDocumento: string;

  @Column("date", { name: "fecha_nacimiento", nullable: true })
  fechaNacimiento: string | null;

  @Column("integer", { name: "tipo_nacionalidad_id" })
  tipoNacionalidadId: number;

  @Column("character varying", { name: "email_personal" })
  emailPersonal: string;

  @Column("character varying", { name: "email_corporativo", nullable: true })
  emailCorporativo: string | null;

  @Column("character varying", { name: "celular", nullable: true })
  celular: string | null;

  @Column("character varying", { name: "profesion", nullable: true })
  profesion: string | null;

  @Column("character varying", { name: "direccion_procesal", nullable: true })
  direccionProcesal: string | null;

  @Column("character varying", { name: "direccion_personal", nullable: true })
  direccionPersonal: string | null;

  @Column("character varying", { name: "buffet_consultorio", nullable: true })
  buffetConsultorio: string | null;

  @Column("character varying", { name: "foto_url", nullable: true })
  fotoUrl: string | null;

  @Column("character varying", { name: "reservado1", nullable: true })
  reservado1: string | null;

  @Column("integer", { name: "cliente_tipo_id", nullable: true })
  clienteTipoId: number | null;

  @Column("integer", { name: "persona_tipo_id", nullable: true })
  personaTipoId: number | null;

  @Column("integer", { name: "create_user_id", nullable: true })
  createUserId: number | null;

  @Column("integer", { name: "update_user_id", nullable: true })
  updateUserId: number | null;
}
