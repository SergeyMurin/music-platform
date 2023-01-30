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
import { Playlist } from '../playlist.entity';
import { Track } from '../../track/track.entity';

@Table
export class PlaylistTracks extends Model<PlaylistTracks> {
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
