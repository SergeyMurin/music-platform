import { RepostAlbum } from './repost.album.entity';

export const repostAlbumProviders = [
  {
    provide: 'REPOST_ALBUM_REPOSITORY',
    useValue: RepostAlbum,
  },
];
