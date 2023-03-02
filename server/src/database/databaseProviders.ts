import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';

import { Track } from '../models/entities/trackEntity';
import { User } from '../models/entities/userEntity';
import { Favorite } from '../models/entities/favoriteEntity';
import { Subscriber } from '../models/entities/subscriberEntity';
import { Album } from '../models/entities/albumEntity';
import { Genre } from '../models/entities/genreEntity';
import { Playlist } from '../models/entities/playlistEntity';
import { Repost } from '../models/entities/repostEntity';
import { Role } from '../models/entities/roleEntity';
import { Tag } from '../models/entities/tagEntity';
import { Comment } from '../models/entities/commentEntity';
import { PlaylistTrack } from '../models/entities/playlistTrackEntity';
import { UserRole } from '../models/entities/userRoleEntity';
import { TagTrack } from '../models/entities/tagTrackEntity';
import { TagAlbum } from '../models/entities/tagAlbumEntity';
import { GenreAlbum } from '../models/entities/genreAlbumEntity';
import { GenreTrack } from '../models/entities/genreTrackEntity';
import { FavoriteAlbum } from '../models/entities/favoriteAlbumEntity';
import { FavoriteTrack } from '../models/entities/favoriteTrackEntity';
import { AlbumTrack } from '../models/entities/albumTrackEntity';
import { ConfigService } from '../shared/config/configService';
import { UserToken } from '../models/entities/userTokenEntity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize(configService.sequelizeOrmConfig);
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
        PlaylistTrack,
        Role,
        UserRole,
        Tag,
        TagTrack,
        TagAlbum,
        Genre,
        Album,
        AlbumTrack,
        GenreAlbum,
        GenreTrack,
        Comment,
        Favorite,
        FavoriteAlbum,
        FavoriteTrack,
        Repost,
        UserToken,
      ];
      sequelize.addModels(modelsToAdd);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
