import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './userEntity';
import { Album } from './albumEntity';
import { Track } from './trackEntity';

@Table
export class Repost extends Model<Repost> {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    comment: 'UUID primary key',
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  author_user_id: string;

  @ForeignKey(() => Album)
  @Column({
    type: DataType.UUID,
  })
  album_id: string;

  @BelongsTo(() => Album)
  album: Album;

  @ForeignKey(() => Track)
  @Column({
    type: DataType.UUID,
  })
  track_id: string;

  @BelongsTo(() => Track)
  track: Track;
}
