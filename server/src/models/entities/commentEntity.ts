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
import { User } from './userEntity';
import { Track } from './trackEntity';
import { Length } from 'class-validator';

@Table
export class Comment extends Model<Comment> {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    comment: 'UUID primary key',
    allowNull: false,
  })
  id: string;

  @Length(1, 256)
  @Column({ allowNull: false })
  content: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Track)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  track_id: string;
  @BelongsTo(() => Track)
  track: Track;
}
