import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("tipo_membresia_pk", ["id"], { unique: true })
@Entity("tipo_membresia", { schema: "public" })
export class TipoMembresia {
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

  @Column("boolean", { name: "activo", default: () => "true" })
  activo: boolean;

  @Column("character varying", { name: "descripcion", nullable: true })
  descripcion: string | null;
}
