import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("calendar_pk", ["id"], { unique: true })
@Entity("calendar", { schema: "public" })
export class Calendar {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  
  @Column("character varying", { name: "title" })
  title: string;
  
  @Column("character varying", { name: "fecha" })
  fecha: string;

  @Column("character varying", { name: "desc" })
  desc: string;
  
  @Column("character varying", { name: "color" })
  color: string;
  
  @Column("integer", { name: "persona_id" })
  personaId: number;
  
  
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

  
}
