import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("users_membresia_pk", ["id"], { unique: true })
@Entity("users_membresia", { schema: "public" })
export class UsersMembresia {
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

  @Column("integer", { name: "user_id" })
  userId: number;

  @Column("integer", { name: "tipo_membresia_id" })
  tipoMembresiaId: number;

  @Column("date", { name: "fecha_inicio" })
  fechaInicio: string;

  @Column("date", { name: "fecha_limite" })
  fechaLimite: string;

  @Column("date", { name: "fecha_fin", nullable: true })
  fechaFin: string | null;

  @Column("character varying", { name: "causas_finalizacion", nullable: true })
  causasFinalizacion: string | null;

  @Column("smallint", { name: "tipo_suscripcion_id", nullable: true })
  tipoSuscripcionId: number | null;
}
