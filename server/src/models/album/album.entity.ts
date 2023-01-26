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
  user_id: string;
  @Column
  album_picture_url: string;
  @Column
  title: string;
  @Column
  tracks: [];
  @Column
  genres: [];
  @Column
  tags: [];
  @Column
  duration: number;
}
