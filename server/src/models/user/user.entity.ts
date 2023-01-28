import {
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Subscriber } from '../subscriber/subscriber.entity';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    comment: 'UUID primary key',
    allowNull: false,
  })
  id: string;
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Subscriber)
  subscribers: Subscriber[];
}
