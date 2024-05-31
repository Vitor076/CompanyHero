import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProxyService } from 'src/common/proxy/proxy.service';
import {
  SPOTIFY_ACCESS_TOKEN_URL,
  SPOTIFY_API_URL,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from './spotify.constant';
import { SpotifyDto } from './dtos/spotify.dto';

@Injectable()
export class SpotifyService {
  private clientId: string;
  private clientSecret: string;
  private SpotifyUrl: string;
  private accessToken: string;
  private SpotifyAcessTokenUrl: string;

  constructor(private proxyService: ProxyService, private configService: ConfigService) {
    this.clientId = this.configService.get<string>(SPOTIFY_CLIENT_ID);
    this.clientSecret = this.configService.get<string>(SPOTIFY_CLIENT_SECRET);
    this.SpotifyUrl = this.configService.get<string>(SPOTIFY_API_URL);
    this.SpotifyAcessTokenUrl = this.configService.get<string>(SPOTIFY_ACCESS_TOKEN_URL);
  }

  async getAccessToken(): Promise<string> {
    if (this.accessToken) {
      return this.accessToken;
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64'),
    };
    const data = 'grant_type=client_credentials';

    try {
      const response = await this.proxyService.post<string>(this.SpotifyAcessTokenUrl, data, { headers });
      this.accessToken = response.data.access_token;
      return this.accessToken;
    } catch (error) {
      throw new HttpException('Failed to fetch access token from Spotify', error.response.status);
    }
  }

  async getUserMusic(musicalGenre: string): Promise<SpotifyDto> {
    const token = await this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const userRecommendedMusic = await this.proxyService.get<any>(
        this.SpotifyUrl,
        { q: musicalGenre, type: 'track', market: 'br', limit: 5, offset: 1 },
        headers,
      );
      const tracks = userRecommendedMusic.tracks.items;
      const userRecommended = await tracks.map((track) => {
        const name = track.album.name;
        const uri = track.album.external_urls.spotify;
        return { name, uri };
      });
      return userRecommended;
    } catch (error) {
      throw new HttpException('Failed to fetch data from Spotify API', error.response.status);
    }
  }

  async getRecommendationsForGenre(musicalGenre: string): Promise<SpotifyDto> {
    return this.getUserMusic(musicalGenre);
  }
}
