import {
  BelongsTo,
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
import { TagAlbum } from '../tag/tag.album/tag.album.entity';
import { GenreAlbum } from '../genre/genre.album/genre.album.entity';
import { User } from '../user/user.entity';

@Table
export class Album extends Model {
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
  album_picture_url: string;
  @Column
  title: string;

  @HasMany(() => Track)
  album_tracks: Track[];

  @HasMany(() => GenreAlbum)
  album_genres: GenreAlbum[];

  @HasMany(() => TagAlbum)
  album_tags: TagAlbum[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  user_id: string;
  @BelongsTo(() => User)
  user: User;
}
