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
import { Playlist } from '../playlist/playlist.entity';
import { PlaylistTracks } from '../playlist.tracks/playlist.tracks.entity';

@Table
export class Track extends Model<Track> {
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

  @BelongsToMany(() => Playlist, () => PlaylistTracks)
  playlists: Playlist[];
}
