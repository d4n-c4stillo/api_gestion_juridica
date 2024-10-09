import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("archivo_pk", ["id"], { unique: true })
@Entity("expediente_implicados", { schema: "public" })
export class ExpedientePersona {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "expediente_id", nullable: true })
  expedienteId: number | null;

  @Column("integer", { name: "tipo_implicado_id", nullable: true })
  tipoImplicadoId: number | null;


  @Column("character varying", { name: "nombre" })
  nombre: string;

  @Column("character varying", { name: "direccion" })
  direccion: string;

  @Column("character varying", { name: "telefono" })
  telefono: string;

  @Column("character varying", { name: "email" })
  email: string;

  @Column("character varying", { name: "profesion" })
  profesion: string;

  @Column("character varying", { name: "observacion" })
  observacion: string;

}
