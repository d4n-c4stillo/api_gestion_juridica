import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Roles } from "./Roles";
import { Users } from "./Users";

@Index("IDX_30ddd91a212a9d03669bc1dee7", ["role"], {})
@Index("IDX_2d3b7773f160e10a4530dfabd8", ["role", "user"], { unique: true })
@Index("IDX_ae54bfa78ffecc8cbed4555bd2", ["user"], {})
@Entity("user_role", { schema: "public" })
export class UserRole {
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

  @Column("integer", { name: "user" })
  user: number;

  @Column("integer", { name: "role" })
  role: number;

  @ManyToOne(() => Roles, (roles) => roles.userRoles)
  @JoinColumn([{ name: "role", referencedColumnName: "id" }])
  role2: Roles;

  @ManyToOne(() => Users, (users) => users.userRoles)
  @JoinColumn([{ name: "user", referencedColumnName: "id" }])
  user2: Users;
}
