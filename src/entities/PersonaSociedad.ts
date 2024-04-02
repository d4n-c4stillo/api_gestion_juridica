import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("persona_sociedad_pk", ["id"], { unique: true })
@Entity("persona_sociedad", { schema: "public" })
export class PersonaSociedad {
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

  @Column("integer", { name: "tipo_sociedad_id" })
  tipoSociedadId: number;

  @Column("date", { name: "fecha_inicio" })
  fechaInicio: string;

  @Column("date", { name: "fecha_fin", nullable: true })
  fechaFin: string | null;

  @Column("character varying", { name: "causas_finalizacion", nullable: true })
  causasFinalizacion: string | null;

  @Column("boolean", { name: "estado", default: () => "true" })
  estado: boolean;

  @Column("integer", { name: "persona_id", nullable: true })
  personaId: number | null;
}
