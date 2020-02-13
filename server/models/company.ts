import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  Column,
  AllowNull,
  DataType,
  HasMany
} from "sequelize-typescript";

import Experience from "./experience";

import { AssociationOptions, AssociationScope } from "sequelize";

interface AssociationOptionsHasMany extends AssociationOptions {
  scope?: AssociationScope;
}

@Table
export default class Company extends Model<Company> {
  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  logo: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @HasMany(() => Experience, {
    foreignKey: "companyId",
    constraints: false,
    onDelete: "cascade"
  } as AssociationOptionsHasMany)
  experiences: Experience[];
}
