import { TagAlbum } from './tag-album.entity';

export const tagAlbumProviders = [
  {
    provide: 'TAG_ALBUM_REPOSITORY',
    useValue: TagAlbum,
  },
];
