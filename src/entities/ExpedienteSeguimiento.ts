import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("archivo_pk", ["id"], { unique: true })
@Entity("expediente_seguimiento", { schema: "public" })
export class ExpedienteSeguimiento {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "expediente_id", nullable: true })
  expedienteId: number | null;
  
  @Column("date", { name: "fecha" })
  fecha: string;

  @Column("integer", { name: "accion_seguimiento_tipo_id"})
  accionSeguimientoTipoId: number | null;
  
  @Column("character varying", { name: "descripcion" })
  descripcion: string;

  @Column("character varying", { name: "observacion" })
  observacion: string;

  @Column("date", { name: "proxima_fecha_respuesta" })
  proximaFechaRespuesta: string;

  @Column("boolean", { name: "sentencia" })
  sentencia?: boolean;

  @Column("date", { name: "sentencia_fecha" })
  sentenciaFecha?: string;

  @Column("boolean", { name: "calidad_cosa_juzgada" })
  calidadCosaJuzgada?: boolean;

  @Column("date", { name: "fecha_ingreso_memorial" })
  fechaIngresoMemorial?: string;

  @Column("boolean", { name: "apelacion" })
  apelacion?: boolean;

  @Column("date", { name: "fecha_limite_apelacion" })
  fechaLimiteApelacion?: string;

}
