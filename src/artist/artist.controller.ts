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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FindOneParams } from 'src/interfaces/interfaces';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: FindOneParams) {
    return this.artistService.findOne(params.id);
  }

  @Put(':id')
  async update(
    @Param() params: FindOneParams,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(params.id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() params: FindOneParams) {
    return this.artistService.remove(params.id);
  }
}
