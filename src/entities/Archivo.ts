import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("archivo_pk", ["id"], { unique: true })
@Entity("archivo", { schema: "public" })
export class Archivo {
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

  @Column("integer", { name: "grupo_id" })
  grupoId: number;

  @Column("character varying", { name: "titulo" })
  titulo: string;

  @Column("character varying", { name: "descripcion" })
  descripcion: string;

  @Column("character varying", { name: "autor" })
  autor: string;

  @Column("character varying", { name: "meta_data" })
  metaData: string;


  @Column("boolean", { name: "vip", default: () => "false" })
  vip: boolean;
  
  @Column("boolean", { name: "gold", default: () => "false" })
  gold: boolean;
  
  @Column("boolean", { name: "starter", default: () => "false" })
  starter: boolean;


  @Column("character varying", { name: "reservado1", nullable: true })
  reservado1: string | null;

  @Column("character varying", { name: "reservado2", nullable: true })
  reservado2: string | null;

  @Column("character varying", { name: "reservado3", nullable: true })
  reservado3: string | null;

  @Column("integer", { name: "create_user_id", nullable: true })
  createUserId: number | null;

  @Column("integer", { name: "update_user_id", nullable: true })
  updateUserId: number | null;
}
