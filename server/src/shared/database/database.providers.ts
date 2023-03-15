import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';

import { Track } from '../../modules/track/track.entity';
import { User } from '../../modules/user/user.entity';
import { Favorite } from '../../modules/favorite/favorite.entity';
import { Subscriber } from '../../modules/subscribe/subscriber.entity';
import { Album } from '../../modules/album/album.entity';
import { Genre } from '../../modules/genre/genre.entity';
import { Playlist } from '../../modules/playlist/playlist.entity';
import { Repost } from '../../modules/repost/repost.entity';
import { Role } from '../../modules/role/role.entity';
import { Tag } from '../../modules/tag/tag.entity';
import { Comment } from '../../modules/comment/comment.entity';
import { PlaylistTrack } from '../../modules/playlist/playlist-track/playlist-track.entity';
import { UserRole } from '../../modules/user/user-role/user-role.entity';
import { TagTrack } from '../../modules/tag/tag-track/tag-track.entity';
import { TagAlbum } from '../../modules/tag/tag-album/tag-album.entity';
import { GenreAlbum } from '../../modules/genre/genre-album/genre-album.entity';
import { GenreTrack } from '../../modules/genre/genre-track/genre-track.entity';
import { FavoriteAlbum } from '../../modules/favorite/favorite-album/favorite-album.entity';
import { FavoriteTrack } from '../../modules/favorite/favorite-track/favorite-track.entity';
import { AlbumTrack } from '../../modules/album/album-track/album-track.entity';
import { ConfigService } from '../config/config.service';
import { UserToken } from '../../modules/user/user-token/user-token.entity';

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
