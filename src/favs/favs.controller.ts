import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FindOneParams } from 'src/interfaces/interfaces';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  async findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param() params: FindOneParams) {
    return this.favsService.addTrack(params.id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param() params: FindOneParams) {
    return this.favsService.removeTrack(params.id);
  }

  @Post('album/:id')
  async addAlbum(@Param() params: FindOneParams) {
    return this.favsService.addAlbum(params.id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param() params: FindOneParams) {
    return this.favsService.removeAlbum(params.id);
  }

  @Post('artist/:id')
  async addArtist(@Param() params: FindOneParams) {
    return this.favsService.addArtist(params.id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param() params: FindOneParams) {
    return this.favsService.removeArtist(params.id);
  }
}
