import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Role } from '../../role/role.entity';

@Table
export class UserRole extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    comment: 'UUID primary key',
    allowNull: false,
    unique: true,
  })
  id: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
  })
  role_id: string;

  @BelongsTo(() => Role)
  role: Role;
}
