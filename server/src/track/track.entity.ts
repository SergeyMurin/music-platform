import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Track extends Model {
  @Column
  title: string;

  @Column
  author: string;

  @Column
  duration: number;
  @Column
  explicit: boolean;
}
