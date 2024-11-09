import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FindOneParams } from 'src/interfaces/interfaces';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: FindOneParams) {
    return this.albumService.findOne(params.id);
  }

  @Put(':id')
  async update(
    @Param() params: FindOneParams,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(params.id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() params: FindOneParams) {
    return this.albumService.remove(params.id);
  }
}
