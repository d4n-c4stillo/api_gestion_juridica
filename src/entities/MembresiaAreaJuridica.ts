import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("membresia_area_juridica_pk", ["id"], { unique: true })
@Entity("membresia_area_juridica", { schema: "public" })
export class MembresiaAreaJuridica {
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

  @Column("integer", { name: "membresia_id", nullable: true })
  membresiaId: number | null;

  @Column("integer", { name: "tipo_area_juridica_id", nullable: true })
  tipoAreaJuridicaId: number | null;

  @Column("boolean", { name: "estado", default: () => "true" })
  estado: boolean;
}
