import {
  Column,
  DataType,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Track extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    comment: 'UUID primary key',
    allowNull: false,
  })
  id: string;

  @Column({ allowNull: false })
  title: string;

  @Column
  track_picture_url: string;

  @Column
  track_url: string;
  @Column
  genres: [];
  @Column
  tags: [];
  @Column
  duration: number;
  @Column
  explicit: boolean;

  @Column
  plays: number;

  @Column
  lyrics: string;

  @Column
  comments: [];
}
