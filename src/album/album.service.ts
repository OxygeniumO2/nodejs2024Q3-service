import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { albums, favorites, tracks } from 'src/db/db';
import { Album } from 'src/interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  checkAlbumExists(id: string, fromService = true) {
    const album = albums.get(id);

    if (!album) {
      if (fromService) {
        throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Album does not exist',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    return album;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const album: Album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };

    albums.set(album.id, album);

    return album;
  }

  findAll() {
    return Array.from(albums.values());
  }

  findOne(id: string) {
    return this.checkAlbumExists(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.checkAlbumExists(id);

    const updatedAlbum = {
      ...album,
      ...updateAlbumDto,
    };

    albums.set(id, updatedAlbum);

    return updatedAlbum;
  }

  remove(id: string) {
    this.checkAlbumExists(id);

    albums.delete(id);

    tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    favorites.albums.forEach((album) => {
      if (album.id === id) {
        favorites.albums.delete(album);
      }
    });
  }
}