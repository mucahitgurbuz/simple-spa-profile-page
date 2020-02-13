import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  Column,
  AllowNull,
  DataType,
  BelongsTo
} from "sequelize-typescript";
import User from "./user";

@Table
export default class Award extends Model<Award> {
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
    as: "award",
    onDelete: "cascade",
    foreignKey: "ofId"
  })
  profileOwner: User;
}
