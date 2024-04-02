import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("tipo_sociedad_pk", ["id"], { unique: true })
@Entity("tipo_sociedad", { schema: "public" })
export class TipoSociedad {
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

  @Column("character varying", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("character varying", { name: "codigo", nullable: true })
  codigo: string | null;

  @Column("character varying", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("boolean", { name: "activo", default: () => "true" })
  activo: boolean;
}
