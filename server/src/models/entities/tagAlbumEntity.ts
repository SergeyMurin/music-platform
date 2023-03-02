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
import { Album } from './albumEntity';
import { Tag } from './tagEntity';

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

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  tag_id: string;

  @BelongsTo(() => Tag)
  tag: Tag;

  @ForeignKey(() => Album)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  album_id: string;

  @BelongsTo(() => Album)
  album: Album;
}
