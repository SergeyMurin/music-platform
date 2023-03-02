import { Album } from '../entities/albumEntity';

export const albumProviders = [
  {
    provide: 'ALBUM_REPOSITORY',
    useValue: Album,
  },
];
