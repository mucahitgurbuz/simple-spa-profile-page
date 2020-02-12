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
export default class Publication extends Model<Publication> {
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
    as: "publication",
    onDelete: "cascade",
    foreignKey: "ofId"
  })
  profileOwner: User;
}
