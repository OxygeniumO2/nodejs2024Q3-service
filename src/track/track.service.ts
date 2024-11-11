import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { favorites, tracks } from 'src/db/db';
import { Track } from 'src/interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  checkTrackExists(id: string, fromService = true) {
    const track = tracks.get(id);

    if (!track) {
      if (fromService) {
        throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Track does not exist',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    return track;
  }

  create(createTrackDto: CreateTrackDto) {
    const track: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
      duration: createTrackDto.duration,
    };

    tracks.set(track.id, track);

    return track;
  }

  findAll() {
    return Array.from(tracks.values());
  }

  findOne(id: string) {
    return this.checkTrackExists(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.checkTrackExists(id);

    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };

    tracks.set(id, updatedTrack);

    return updatedTrack;
  }

  remove(id: string) {
    this.checkTrackExists(id);

    tracks.delete(id);

    favorites.tracks.forEach((track) => {
      if (track.id === id) {
        favorites.tracks.delete(track);
      }
    });
  }
}
