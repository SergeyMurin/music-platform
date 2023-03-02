import {
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  IsUUID,
  Default,
  DataType,
  Column,
} from 'sequelize-typescript';
import { Playlist } from './playlistEntity';
import { Track } from './trackEntity';

@Table
export class PlaylistTrack extends Model<PlaylistTrack> {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    comment: 'UUID primary key',
    allowNull: false,
  })
  id: string;
  @ForeignKey(() => Playlist)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  playlist_id: string;

  @BelongsTo(() => Playlist)
  playlist: Playlist;

  @ForeignKey(() => Track)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  track_id: string;

  @BelongsTo(() => Track)
  track: Track;
}
