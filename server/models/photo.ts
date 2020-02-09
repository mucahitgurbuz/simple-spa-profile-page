import { Table, Model, CreatedAt, UpdatedAt, Column, AllowNull, DataType, BelongsTo } from 'sequelize-typescript';
import User from './user';

const ownerConversion = {
  profilePhoto: "profileOwner",
  // more
}

@Table
export default class Photo extends Model<Photo> {
  @AllowNull(false)
  @Column(DataType.STRING)
  originalUrl: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  thumbnailUrl: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  of: string

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
    as: 'profilePhoto',
    onDelete: 'cascade',
    foreignKey: 'ofId'
  })
  profileOwner: User;

  public getOwner = (options: any = {}) => this.$get(ownerConversion[this.get('of')], options);

}