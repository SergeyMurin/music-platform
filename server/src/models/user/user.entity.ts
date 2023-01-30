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
import { Subscriber } from '../subscriber/subscriber.entity';
import { Comment } from '../comment/comment.entity';
import { Favorite } from '../favorite/favorite.entity';
import { Repost } from '../repost/repost.entity';
import { Track } from '../track/track.entity';
import { Album } from '../album/album.entity';

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
  @Column
  login: string;

  @Column
  email: string;

  @Column
  email_confirmed: boolean;

  @Column
  password: string;

  @Column
  user_picture_url: string;

  @Column
  bio: string;

  @HasMany(() => Subscriber)
  subscribers: Subscriber[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Favorite)
  favorites: Favorite[];

  @HasMany(() => Repost)
  reposts: Repost[];

  @HasMany(() => Track)
  tracks: Track[];

  @HasMany(() => Album)
  albums: Album[];
}
