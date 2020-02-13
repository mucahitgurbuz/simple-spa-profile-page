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
import Company from "./company";

@Table
export default class Experience extends Model<Experience> {
  @AllowNull(false)
  @Column(DataType.STRING)
  position: string;

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
  location: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsTo(() => User, {
    constraints: false,
    as: "experience",
    onDelete: "cascade",
    foreignKey: "ofId"
  })
  profileOwner: User;

  @BelongsTo(() => Company, {
    constraints: false,
    as: "company",
    onDelete: "cascade",
    foreignKey: "companyId"
  })
  companyOwner: Company;
}
