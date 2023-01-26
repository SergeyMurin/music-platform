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
import { Subscription } from '../subscription/subscription.entity';
import { Favorite } from '../favorite/favorite.entity';
import { Track } from '../track/track.entity';
import { Repost } from '../repost/repost.entity';
import { Playlist } from '../playlist/playlist.entity';
import { Album } from '../album/album.entity';

@Table
export class User extends Model {
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
  password_hash: string;
  @Column
  role_id: string;

  @Column
  user_name: string;

  @Column
  user_picture_url: string;

  @Column
  bio: string;

  @HasMany(() => Subscriber)
  subscribers: Subscriber[];
  @HasMany(() => Subscription)
  subscriptions: Subscription[];
  @HasMany(() => Favorite)
  favorites: Favorite[];
  @HasMany(() => Playlist)
  playlists: Playlist[];
  @HasMany(() => Repost)
  reposts: Repost[];
  @Column
  general_plays: number;

  @HasMany(() => Track)
  tracks: Track[];

  @HasMany(() => Album)
  albums: Album[];
}
