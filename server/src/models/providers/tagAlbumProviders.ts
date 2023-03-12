import { TagAlbum } from '../entities/tagAlbumEntity';

export const tagAlbumProviders = [
  {
    provide: 'TAG_ALBUM_REPOSITORY',
    useValue: TagAlbum,
  },
];
