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

  @Column
  password: string;

  @Column({ allowNull: false, defaultValue: false })
  google_auth: boolean;

  @Column
  picture_url: string;
  @Length(1, 256)
  @Column
  bio: string;

  @HasMany(() => Subscriber)
  subscribers: Subscriber[];
  @Column({ defaultValue: 0 })
  subscribers_count: number;

  @Column({ defaultValue: 0 })
  subscriptions_count: number;

  @HasMany(() => Favorite)
  favorites: Favorite[];

  @Column({ defaultValue: 0 })
  favorites_count: number;

  @HasMany(() => Repost)
  reposts: Repost[];

  @Column({ defaultValue: 0 })
  reposts_count: number;

  @HasMany(() => Track)
  tracks: Track[];

  @Column({ defaultValue: 0 })
  tracks_count: number;

  @HasMany(() => Album)
  albums: Album[];

  @Column({ defaultValue: 0 })
  albums_count: number;

  @HasMany(() => Playlist)
  playlists: Playlist[];
  @Column({ defaultValue: 0 })
  playlists_count: number;
}
