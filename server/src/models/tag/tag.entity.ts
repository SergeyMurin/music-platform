import {
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';

@Table
export class Tag extends Model {
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
  title: string;

  @ForeignKey(() => Album)
  @Column({ field: 'id' })
  album_id: string;

  @ForeignKey(() => Track)
  @Column({ field: 'id' })
  track_id: string;
}
