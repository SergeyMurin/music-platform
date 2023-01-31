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
import { Tag } from '../tag.entity';

@Table
export class TagTrack extends Model<TagTrack> {
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

  @ForeignKey(() => Track)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  track_id: string;

  @BelongsTo(() => Track)
  track: Track;
}
