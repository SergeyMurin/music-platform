import {
  Column,
  DataType,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Length } from 'class-validator';

@Table
export class Role extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    comment: 'UUID primary key',
    allowNull: false,
  })
  id: string;
  @Length(1, 25)
  @Column({ allowNull: false, unique: true })
  title: string;
  @Column({ allowNull: false })
  access: boolean;
}
