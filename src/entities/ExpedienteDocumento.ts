import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("archivo_pk", ["id"], { unique: true })
@Entity("expediente_documentos", { schema: "public" })
export class ExpedienteDocumento {
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

  @Column("character varying", { name: "file_name" })
  fileName: string;

  @Column("character varying", { name: "mime_type" })
  mimeType: string;

  @Column("character varying", { name: "destination" })
  destination: string;

  @Column("integer", { name: "size" })  
  size: number;

  @Column("character varying", { name: "nombre" })
  nombre: string;

  @Column("character varying", { name: "descripcion" })
  descripcion: string;

  @Column("integer", { name: "expediente_id", nullable: true })
  expedienteId: number | null;

}
