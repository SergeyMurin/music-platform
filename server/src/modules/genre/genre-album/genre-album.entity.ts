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
import { Album } from '../../album/album.entity';
import { Genre } from '../genre.entity';

@Table
export class GenreAlbum extends Model<GenreAlbum> {
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

  @ForeignKey(() => Album)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  album_id: string;

  @BelongsTo(() => Album)
  album: Album;
}
