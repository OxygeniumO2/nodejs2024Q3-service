import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { albums, artists, favorites, tracks } from 'src/db/db';
import { Artist } from 'src/interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  checkArtistExists(id: string, fromService = true) {
    const artist = artists.get(id);

    if (!artist) {
      if (fromService) {
        throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Artist does not exist',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    return artist;
  }

  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    artists.set(artist.id, artist);

    return artist;
  }

  findAll() {
    return Array.from(artists.values());
  }

  findOne(id: string) {
    return this.checkArtistExists(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.checkArtistExists(id);

    const updatedArtist = {
      ...artist,
      ...updateArtistDto,
    };

    artists.set(id, updatedArtist);

    return updatedArtist;
  }

  remove(id: string) {
    this.checkArtistExists(id);

    artists.delete(id);

    tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    favorites.artists.forEach((artist) => {
      if (artist.id === id) {
        favorites.artists.delete(artist);
      }
    });
  }
}
