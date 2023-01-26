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
import { Track } from '../track/track.entity';

@Table
export class Comment extends Model {
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
  user_id: string;

  @Column
  content: string;

  @HasMany(() => Comment)
  comments: Comment[];

  @ForeignKey(() => Comment)
  @Column({ field: 'id' })
  comment_id: string;

  @ForeignKey(() => Track)
  @Column({ field: 'id' })
  track_id: string;
}
