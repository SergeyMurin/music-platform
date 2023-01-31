import {
  Table,
  Column,
  BelongsToMany,
  Model,
  PrimaryKey,
  IsUUID,
  Default,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { PlaylistTrack } from './playlist.track/playlist.track.entity';
import { Track } from '../track/track.entity';
import { Length } from 'class-validator';
import { User } from '../user/user.entity';

@Table
export class Playlist extends Model<Playlist> {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    comment: 'UUID primary key',
    allowNull: false,
  })
  id: string;
  @Length(5, 64)
  @Column
  title: string;

  @Column
  picture_url: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @BelongsTo(() => User)
  user: User;

  @Column({ defaultValue: 0 })
  tracks_count: number;

  @BelongsToMany(() => Track, () => PlaylistTrack)
  tracks: Track[];
}
