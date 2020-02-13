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
export default class Interest extends Model<Interest> {
  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  logo: string;

  @AllowNull(false)
  @Column(DataType.BIGINT)
  memberCount: number;

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
    as: "interest",
    onDelete: "cascade",
    foreignKey: "ofId"
  })
  profileOwner: User;
}
