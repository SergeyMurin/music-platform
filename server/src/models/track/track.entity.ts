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
import { Genre } from '../genre/genre.entity';
import { Tag } from '../tag/tag.entity';
import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';
import { Album } from '../album/album.entity';
import { Playlist } from '../playlist/playlist.entity';

@Table
export class Track extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    comment: 'UUID primary key',
    allowNull: false,
  })
  id: string;

  @Column({ allowNull: false })
  title: string;

  @Column
  track_picture_url: string;

  @Column
  track_url: string;
  @HasMany(() => Genre)
  genres: Genre[];
  @HasMany(() => Tag)
  tags: Tag[];
  @Column
  duration: number;
  @Column
  explicit: boolean;

  @Column
  plays: number;

  @Column
  lyrics: string;

  @HasMany(() => Comment)
  comments: Comment[];

  @ForeignKey(() => Album)
  @Column({ field: 'id' })
  album_id: string;
  @ForeignKey(() => Playlist)
  @Column({ field: 'id' })
  playlist_id: string;

  @ForeignKey(() => User)
  @Column({ field: 'id' })
  user_id: string;
}
