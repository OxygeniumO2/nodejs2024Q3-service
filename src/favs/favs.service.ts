import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { favorites } from 'src/db/db';

@Injectable()
export class FavsService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  findAll() {
    return {
      tracks: Array.from(favorites.tracks),
      albums: Array.from(favorites.albums),
      artists: Array.from(favorites.artists),
    };
  }

  addTrack(id: string) {
    const track = this.trackService.checkTrackExists(id, false);

    favorites.tracks.add(track);
  }

  removeTrack(id: string) {
    const track = this.trackService.checkTrackExists(id, false);

    if (favorites.tracks.has(track)) {
      favorites.tracks.delete(track);
    } else {
      throw new HttpException('Track not favorite', HttpStatus.NOT_FOUND);
    }
  }

  addAlbum(id: string) {
    const album = this.albumService.checkAlbumExists(id, false);

    favorites.albums.add(album);
  }

  removeAlbum(id: string) {
    const album = this.albumService.checkAlbumExists(id, false);

    if (favorites.albums.has(album)) {
      favorites.albums.delete(album);
    } else {
      throw new HttpException('Album not favorite', HttpStatus.NOT_FOUND);
    }
  }

  addArtist(id: string) {
    const artist = this.artistService.checkArtistExists(id, false);

    favorites.artists.add(artist);
  }

  removeArtist(id: string) {
    const artist = this.artistService.checkArtistExists(id, false);

    if (favorites.artists.has(artist)) {
      favorites.artists.delete(artist);
    } else {
      throw new HttpException('Artist not favorite', HttpStatus.NOT_FOUND);
    }
  }
}
