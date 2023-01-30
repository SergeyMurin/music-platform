import {
  Table,
  Column,
  BelongsToMany,
  Model,
  PrimaryKey,
  IsUUID,
  Default,
  DataType,
} from 'sequelize-typescript';
import { PlaylistTracks } from './playlist.tracks/playlist.tracks.entity';
import { Track } from '../track/track.entity';

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
  @Column
  title: string;

  @BelongsToMany(() => Track, () => PlaylistTracks)
  tracks: Track[];
}
