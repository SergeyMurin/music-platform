import { Album } from './album.entity';

export const albumProviders = [
  {
    provide: 'ALBUM_REPOSITORY',
    useValue: Album,
  },
];
