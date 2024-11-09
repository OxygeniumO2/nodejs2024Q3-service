import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Module({
  controllers: [FavsController],
  providers: [FavsService, TrackService, AlbumService, ArtistService],
})
export class FavsModule {}
