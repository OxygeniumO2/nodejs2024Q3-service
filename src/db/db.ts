import { Album, Artist, Track, User } from 'src/interfaces/interfaces';

export const users = new Map<string, User>();

export const tracks = new Map<string, Track>();

export const artists = new Map<string, Artist>();

export const albums = new Map<string, Album>();

export const favorites = {
  artists: new Set<Artist>(),
  albums: new Set<Album>(),
  tracks: new Set<Track>(),
};