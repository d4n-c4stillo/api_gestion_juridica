import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserRole } from "./UserRole";

@Index("UQ_97672ac88f789774dd47f7c8be3", ["email"], { unique: true })
@Index("IDX_19f0320dbf4e94fabff881c0be", ["emailVerified"], {})
@Index("IDX_409a0298fdd86a6495e23c25c6", ["isActive"], {})
@Entity("users", { schema: "public" })
export class Users {
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

  @Column("character varying", { name: "email", unique: true })
  email: string;

  @Column("character varying", { name: "firstname" })
  firstname: string;

  @Column("character varying", { name: "lastname" })
  lastname: string;

  @Column("character varying", { name: "password" })
  password: string;

  @Column("boolean", { name: "isActive", default: () => "true" })
  isActive: boolean;

  @Column("boolean", { name: "emailVerified", default: () => "false" })
  emailVerified: boolean;

  @Column("character varying", { name: "refreshToken", nullable: true })
  refreshToken: string | null;

  @Column("integer", { name: "persona_id", nullable: true })
  personaId: number | null;

  @OneToMany(() => UserRole, (userRole) => userRole.user2)
  userRoles: UserRole[];
}
