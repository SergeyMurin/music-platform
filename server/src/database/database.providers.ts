import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';
import { Track } from '../models/track/track.entity';
import { User } from '../models/user/user.entity';
import { Favorite } from '../models/favorite/favorite.entity';
import { Subscriber } from '../models/subscriber/subscriber.entity';
import { Album } from '../models/album/album.entity';
import { Genre } from '../models/genre/genre.entity';
import { Playlist } from '../models/playlist/playlist.entity';
import { Repost } from '../models/repost/repost.entity';
import { Role } from '../models/role/role.entity';
import { Tag } from '../models/tag/tag.entity';
import { Comment } from '../models/comment/comment.entity';
import { PlaylistTracks } from '../models/playlist/playlist.tracks/playlist.tracks.entity';
import { UserRole } from '../models/user/user.role/user.role.entity';
import { TagTrack } from '../models/tag/tag.track/tag.track.entity';
import { TagAlbum } from '../models/tag/tag.album/tag.album.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5555,
        username: 'postgres',
        password: 'admin',
        database: 'music-platform',
      });

      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

      const modelsToAdd: ModelCtor<Model<any, any>>[] = [
        User,
        Subscriber,
        Track,
        Playlist,
        PlaylistTracks,
        Role,
        UserRole,
        Tag,
        TagTrack,
        TagAlbum,
        Genre,
        Album,
      ];

      sequelize.addModels(modelsToAdd);
      await sequelize.sync();

      return sequelize;
    },
  },
];
