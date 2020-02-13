import {
  Table,
  Scopes,
  Model,
  Column,
  AllowNull,
  HasOne,
  HasMany,
  DataType,
  IsEmail,
  Unique,
  Default,
  BeforeCreate,
  BeforeBulkCreate,
  BeforeUpdate,
  BeforeBulkUpdate,
  DefaultScope
} from "sequelize-typescript";
import bcrypt from "bcrypt";

import Photo from "./photo";
import Experience from "./experience";
import Education from "./education";
import Publication from "./publication";
import Award from "./award";
import Interest from "./interest";
import Skill from "./skill";
import Endorsement from "./endorsement";
import { AssociationOptions, AssociationScope } from "sequelize";

// const bcrypt = require('bcrypt');

function capitalizeFirstLetterEachWord(string: string): string {
  if (string.split(" ").length > 1) {
    return string
      .split(" ")
      .map(capitalizeFirstLetterEachWord)
      .join(" ");
  }
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

interface AssociationOptionsHasOne extends AssociationOptions {
  scope?: AssociationScope;
}

interface AssociationOptionsHasMany extends AssociationOptions {
  scope?: AssociationScope;
}

@DefaultScope({
  attributes: { exclude: ["password"] },
  include: [() => Photo]
})
@Scopes({
  withPassword: {
    attributes: {
      include: ["password"]
    }
  }
})
@Table
export default class User extends Model<User> {
  @AllowNull(false)
  @Column(DataType.STRING)
  fName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  lName: string;

  @Column(DataType.VIRTUAL)
  get displayName(): string {
    return `${this.getDataValue("fName")} ${this.getDataValue("lName")}`;
  }

  @IsEmail
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  set userCode(value: string) {
    this.setDataValue("userCode", value.toLowerCase());
  }
  get userCode(): string {
    return this.getDataValue("userCode");
  }

  @AllowNull(false)
  @Default("pending")
  @Column(DataType.ENUM("active", "inactive", "pending"))
  status: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @BeforeCreate
  @BeforeBulkCreate
  public static createHash(instance: User) {
    console.log(instance);
    return bcrypt
      .hash(instance.password, 10)
      .then(hash => {
        instance.password = hash;
      })
      .catch(err => {
        throw new Error("Could not hash.");
      });
  }

  @BeforeBulkUpdate
  @BeforeUpdate
  public static updateHash({
    attributes
  }: {
    attributes: { password?: string };
  }) {
    if (attributes.password) {
      return bcrypt
        .hash(attributes.password, 10)
        .then(hash => {
          attributes.password = hash;
        })
        .catch(err => {
          throw new Error("Could not hash.");
        });
    }
    return Promise.resolve();
  }

  @BeforeCreate
  @BeforeBulkCreate
  @BeforeUpdate
  @BeforeBulkUpdate
  public static fixCase(instance: User) {
    instance.fName = capitalizeFirstLetterEachWord(instance.fName);
    instance.lName = capitalizeFirstLetterEachWord(instance.lName);
  }

  @HasOne(() => Photo, {
    foreignKey: "ofId",
    constraints: false,
    scope: {
      of: "profilePhoto"
    },
    onDelete: "cascade"
  } as AssociationOptionsHasOne)
  photo: Photo;

  @HasMany(() => Experience, {
    foreignKey: "ofId",
    constraints: false,
    onDelete: "cascade"
  } as AssociationOptionsHasMany)
  experiences: Experience[];

  @HasMany(() => Education, {
    foreignKey: "ofId",
    constraints: false,
    onDelete: "cascade"
  } as AssociationOptionsHasMany)
  educations: Education[];

  @HasMany(() => Publication, {
    foreignKey: "ofId",
    constraints: false,
    onDelete: "cascade"
  } as AssociationOptionsHasMany)
  publications: Publication[];

  @HasMany(() => Award, {
    foreignKey: "ofId",
    constraints: false,
    onDelete: "cascade"
  } as AssociationOptionsHasMany)
  awards: Award[];

  @HasMany(() => Interest, {
    foreignKey: "ofId",
    constraints: false,
    onDelete: "cascade"
  } as AssociationOptionsHasMany)
  interests: Interest[];

  @HasMany(() => Skill, {
    foreignKey: "ofId",
    constraints: false,
    onDelete: "cascade"
  } as AssociationOptionsHasMany)
  skills: Skill[];

  @HasMany(() => Endorsement, {
    foreignKey: "endorsedId",
    constraints: false,
    onDelete: "cascade"
  } as AssociationOptionsHasMany)
  endorsements: Endorsement[];
}
