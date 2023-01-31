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

@Table
export class TagAlbum extends Model<TagAlbum> {
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
  album: Album;
}
