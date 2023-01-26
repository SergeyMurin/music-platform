import {
  Column,
  DataType,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Genre extends Model {
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
  title: string;
}