import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("contacto_pk", ["id"], { unique: true })
@Entity("contacto", { schema: "public" })
export class Contacto {
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

  @Column("character varying", { name: "profesion" })
  profesion: string;

  @Column("character varying", { name: "ciudad" })
  ciudad: string;

  @Column("character varying", { name: "telefono" })
  telefono: string;

  @Column("character varying", { name: "email" })
  email: string;

 
}
