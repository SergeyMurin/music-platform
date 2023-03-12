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
import { Track } from './trackEntity';
import { Genre } from './genreEntity';

@Table
export class GenreTrack extends Model<GenreTrack> {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    comment: 'UUID primary key',
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Genre)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  genre_id: string;

  @BelongsTo(() => Genre)
  genre: Genre;

  @ForeignKey(() => Track)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  track_id: string;

  @BelongsTo(() => Track)
  track: Track;
}
