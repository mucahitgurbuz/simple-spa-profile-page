import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  Column,
  AllowNull,
  DataType,
  BelongsTo,
  HasMany
} from "sequelize-typescript";
import User from "./user";
import Endorsement from "./endorsement";

import { AssociationOptions, AssociationScope } from "sequelize";

interface AssociationOptionsHasMany extends AssociationOptions {
  scope?: AssociationScope;
}

@Table
export default class Skill extends Model<Skill> {
  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @Column
  ofId: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsTo(() => User, {
    constraints: false,
    as: "skill",
    onDelete: "cascade",
    foreignKey: "ofId"
  })
  profileOwner: User;

  @HasMany(() => Endorsement, {
    foreignKey: "skillId",
    constraints: false,
    onDelete: "cascade"
  } as AssociationOptionsHasMany)
  endorsements: Endorsement[];
}
