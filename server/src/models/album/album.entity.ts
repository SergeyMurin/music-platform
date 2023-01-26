import {
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Track } from '../track/track.entity';
import { Genre } from '../genre/genre.entity';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';

@Table
export class Album extends Model {
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
  album_picture_url: string;
  @Column
  title: string;
  @HasMany(() => Track)
  tracks: Track[];
  @HasMany(() => Genre)
  genres: Genre[];
  @HasMany(() => Tag)
  tags: Tag[];
  @Column
  duration: number;

  @ForeignKey(() => User)
  @Column({ field: 'id' })
  user_id: string;
}
