import { SpotifyDto } from '../dtos/spotify.dto';

export interface ISpotifyService {
  getAccessToken(): Promise<string>;
  getUserMusic(musicalGenre: string): Promise<SpotifyDto>;
  getRecommendationsForGenre(musicalGenre: string): Promise<SpotifyDto>;
}
