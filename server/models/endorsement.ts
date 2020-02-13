import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  Column,
  BelongsTo
} from "sequelize-typescript";
import Skill from "./skill";
import User from "./user";

@Table
export default class Endorsement extends Model<Endorsement> {
  @Column
  skillId: number;

  @Column
  endorsedId: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsTo(() => Skill, {
    constraints: false,
    as: "endorsement",
    onDelete: "cascade",
    foreignKey: "skillId"
  })
  skillOwner: Skill;

  @BelongsTo(() => User, {
    constraints: false,
    as: "endorsedUser",
    onDelete: "cascade",
    foreignKey: "endorsedId"
  })
  profileOwner: User;
}
