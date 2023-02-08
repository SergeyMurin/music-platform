import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { albumProviders } from './album.providers';
import { DigitalOceanModule } from '../../digtal.ocean/digita.ocean.module';
import { TagModule } from '../tag/tag.module';
import { GenreAlbumModule } from '../genre/genre.album/genre.album.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../user/auth/auth.module';
import { TagAlbumModule } from '../tag/tag.album/tag.album.module';
import { AlbumTrackModule } from './album.track/album.track.module';

@Module({
  imports: [
    DatabaseModule,
    TrackModule,
    DigitalOceanModule,
    TrackModule,
    TagModule,
    TagAlbumModule,
    GenreAlbumModule,
    UserModule,
    AuthModule,
    forwardRef(() => AlbumTrackModule),
  ],
  controllers: [AlbumController],
  providers: [AlbumService, ...albumProviders],
  exports: [AlbumService, ...albumProviders],
})
export class AlbumModule {}
