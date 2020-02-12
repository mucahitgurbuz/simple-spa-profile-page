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
export default class Education extends Model<Education> {
  @AllowNull(false)
  @Column(DataType.STRING)
  institute: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  degree: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  department: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  gpa: string;

  @AllowNull(false)
  @Column(DataType.BIGINT)
  start: number;

  @AllowNull(true)
  @Column(DataType.BIGINT)
  finish: number;

  @Column
  ofId: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  description: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  address: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  logo: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsTo(() => User, {
    constraints: false,
    as: "education",
    onDelete: "cascade",
    foreignKey: "ofId"
  })
  profileOwner: User;
}
