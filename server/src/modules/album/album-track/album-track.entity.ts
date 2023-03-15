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
import { Track } from '../../track/track.entity';
import { Album } from '../album.entity';

@Table
export class AlbumTrack extends Model<AlbumTrack> {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    comment: 'UUID primary key',
    allowNull: false,
  })
  id: string;
  @ForeignKey(() => Album)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  album_id: string;

  @BelongsTo(() => Album)
  playlist: Album;

  @ForeignKey(() => Track)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  track_id: string;

  @BelongsTo(() => Track)
  track: Track;
}
