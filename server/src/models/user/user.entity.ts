import {
  Column,
  DataType,
  Default,
  HasMany,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Subscriber } from '../subscriber/subscriber.entity';
import { Comment } from '../comment/comment.entity';
import { Favorite } from '../favorite/favorite.entity';
import { Repost } from '../repost/repost.entity';
import { Track } from '../track/track.entity';
import { Album } from '../album/album.entity';
import { Length } from 'class-validator';
import { Playlist } from '../playlist/playlist.entity';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    comment: 'UUID primary key',
    allowNull: false,
  })
  id: string;
  @Length(5, 25)
  @Column({ unique: true, allowNull: false })
  username: string;

  @Column({ unique: true, allowNull: false })
  email: string;

  @Column({ allowNull: false })
  email_confirmed: boolean;

  @Column({ allowNull: false })
  password: string;

  @Column
  user_picture_url: string;
  @Length(1, 256)
  @Column
  bio: string;

  @HasMany(() => Subscriber)
  subscribers: Subscriber[];

  @HasMany(() => Favorite)
  favorites: Favorite[];

  @HasMany(() => Repost)
  reposts: Repost[];

  @HasMany(() => Track)
  tracks: Track[];

  @HasMany(() => Album)
  albums: Album[];

  @HasMany(() => Playlist)
  playlists: Playlist[];
}
