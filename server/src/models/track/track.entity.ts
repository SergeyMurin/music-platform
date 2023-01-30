import {
  Table,
  Column,
  BelongsToMany,
  Model,
  PrimaryKey,
  IsUUID,
  Default,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Playlist } from '../playlist/playlist.entity';
import { PlaylistTracks } from '../playlist/playlist.tracks/playlist.tracks.entity';
import { Tag } from '../tag/tag.entity';
import { TagTrack } from '../tag/tag.track/tag.track.entity';

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

  @HasMany(() => TagTrack)
  track_tags: TagTrack[];
}
