import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("archivo_pk", ["id"], { unique: true })
@Entity("expediente", { schema: "public" })
export class Expediente {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "codigo_cud" })
  codigoCud: string;

  @Column("character varying", { name: "codigo_nurej" })
  codigoNurej: string;

  @Column("integer", { name: "juzgado_depto" })  
  juzgadoDeptoId: number;

  @Column("integer", { name: "juzgado_prov" })
  juzgadoProvId: number;

  @Column("integer", { name: "juzgado_id" })
  juzgadoId: number;

  @Column("character varying", { name: "nombre_corto" })
  nombreCorto: string;

  @Column("character varying", { name: "descripcion" })
  descripcion: string;

  @Column("boolean", { name: "abierto" })
  abierto: boolean;


  //TODO: aumentar usuario_id

  
}
