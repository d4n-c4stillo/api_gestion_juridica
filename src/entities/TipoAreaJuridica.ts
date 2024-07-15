import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("tipo_area_juridica_pk", ["id"], { unique: true })
@Entity("tipo_area_juridica", { schema: "public" })
export class TipoAreaJuridica {
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

  @Column("character varying", { name: "nombre" })
  nombre: string;

  @Column("character varying", { name: "descripcion" })
  descripcion: string;

  @Column("boolean", { name: "activo", default: () => "true" })
  activo: boolean;
}
