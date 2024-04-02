import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("tipo_suscripcion_pk", ["id"], { unique: true })
@Entity("tipo_suscripcion", { schema: "public" })
export class TipoSuscripcion {
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

  @Column("character varying", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("integer", { name: "validez_dias" })
  validezDias: number;

  @Column("boolean", { name: "activo", default: () => "true" })
  activo: boolean;
}
