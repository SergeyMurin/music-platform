import {
  Column,
  DataType,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

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

  @Column
  subscribers: [];
  @Column
  subscriptions: [];
  @Column
  favorites: [];
  @Column
  playlists: [];
  @Column
  reposts: [];
  @Column
  general_plays: number;

  @Column
  tracks: [];

  @Column
  albums: [];
}
