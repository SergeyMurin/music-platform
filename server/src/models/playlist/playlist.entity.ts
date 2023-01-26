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
import { User } from '../user/user.entity';

@Table
export class Playlist extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    comment: 'UUID primary key',
    allowNull: false,
  })
  id: string;
  @HasMany(() => Track)
  tracks: Track[];
  @ForeignKey(() => User)
  @Column({ field: 'id' })
  user_id: string;
}
