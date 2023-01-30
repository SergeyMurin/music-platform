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
import { TagTrack } from '../tag/tag.track/tag.track.entity';
import { Album } from '../album/album.entity';
import { GenreTrack } from '../genre/genre.track/genre.track.entity';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';
import { Length } from 'class-validator';

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
  @Length(5, 64)
  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: false })
  track_url: string;

  @Column({ allowNull: false })
  track_picture_url: string;

  @Column({ allowNull: false })
  explicit: boolean;

  @Column
  lyrics: string;

  @BelongsToMany(() => Playlist, () => PlaylistTracks)
  playlists: Playlist[];

  @ForeignKey(() => Album)
  @Column({
    type: DataType.UUID,
  })
  album_id: string;

  @BelongsTo(() => Album)
  album: Album;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;
  @BelongsTo(() => User)
  user: User;

  @HasMany(() => TagTrack)
  track_tags: TagTrack[];

  @HasMany(() => GenreTrack)
  track_genres: GenreTrack[];

  @HasMany(() => Comment)
  comments: Comment[];
}
