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
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Playlist } from '../playlist/playlist.entity';
import { PlaylistTracks } from '../playlist/playlist.tracks/playlist.tracks.entity';
import { Tag } from '../tag/tag.entity';
import { TagTrack } from '../tag/tag.track/tag.track.entity';
import { Album } from '../album/album.entity';
import { GenreAlbum } from '../genre/genre.album/genre.album.entity';
import { GenreTrack } from '../genre/genre.track/genre.track.entity';
import { User } from '../user/user.entity';

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
  title: string;

  @BelongsToMany(() => Playlist, () => PlaylistTracks)
  playlists: Playlist[];

  @ForeignKey(() => Album)
  @Column({
    type: DataType.UUID,
  })
  album_id: string;

  @BelongsTo(() => Album)
  album: Album;

  @HasMany(() => TagTrack)
  track_tags: TagTrack[];

  @HasMany(() => GenreTrack)
  track_genres: GenreTrack[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  user_id: string;
  @BelongsTo(() => User)
  user: User;
}
