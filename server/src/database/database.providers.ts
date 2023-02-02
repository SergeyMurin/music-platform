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
import { PlaylistTrack } from '../models/playlist/playlist.track/playlist.track.entity';
import { UserRole } from '../models/user/user.role/user.role.entity';
import { TagTrack } from '../models/tag/tag.track/tag.track.entity';
import { TagAlbum } from '../models/tag/tag.album/tag.album.entity';
import { GenreAlbum } from '../models/genre/genre.album/genre.album.entity';
import { GenreTrack } from '../models/genre/genre.track/genre.track.entity';
import { FavoriteAlbum } from '../models/favorite/favorite.album/favorite.album.entity';
import { FavoriteTrack } from '../models/favorite/favorite.track/favorite.track.entity';
import { AlbumTrack } from '../models/album/album.track.entity/album.track.entity';
import { ConfigService } from '../shared/config/config.service';
import { UserToken } from '../models/user/user.token/user.token.entity';

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
