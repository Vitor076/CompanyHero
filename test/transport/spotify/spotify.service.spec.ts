import { Test, TestingModule } from '@nestjs/testing';
import { ProxyService } from '../../../src/common/proxy/proxy.service';
import { ConfigService } from '@nestjs/config';
import { HttpException } from '@nestjs/common';
import { SpotifyService } from '../../../src/modules/transport/spotify/spotify.service';

jest.mock('../../../src/common/proxy/proxy.service');

describe('SpotifyService', () => {
  let spotifyService: SpotifyService;
  let proxyService: ProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpotifyService,
        {
          provide: ProxyService,
          useValue: {
            post: jest.fn(),
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    spotifyService = module.get<SpotifyService>(SpotifyService);
    proxyService = module.get<ProxyService>(ProxyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAccessToken', () => {
    it('should return access token', async () => {
      const mockAccessToken = 'mock-access-token';
      (proxyService.post as jest.Mock).mockResolvedValue({
        data: { access_token: mockAccessToken },
      });

      const result = await spotifyService.getAccessToken();
      expect(result).toBe(mockAccessToken);
    });

    it('should throw an HttpException when failing to fetch access token', async () => {
      (proxyService.post as jest.Mock).mockRejectedValue({
        response: { status: 401 },
      });

      await expect(spotifyService.getAccessToken()).rejects.toThrow(HttpException);
    });
  });

  describe('getUserMusic', () => {
    it('should return user recommended music for a valid genre', async () => {
      const mockAccessToken = 'mock-access-token';
      const mockMusicData = {
        tracks: {
          items: [
            {
              album: {
                name: 'Test Album',
                external_urls: { spotify: 'https://spotify.com/test-album' },
              },
            },
          ],
        },
      };

      (spotifyService as any).accessToken = mockAccessToken;
      (proxyService.get as jest.Mock).mockResolvedValue(mockMusicData);

      const result = await spotifyService.getUserMusic('rock');
      expect(result).toEqual([{ name: 'Test Album', uri: 'https://spotify.com/test-album' }]);
    });

    it('should throw an HttpException when failing to fetch user music', async () => {
      const mockAccessToken = 'mock-access-token';
      (spotifyService as any).accessToken = mockAccessToken;
      (proxyService.get as jest.Mock).mockRejectedValue({
        response: { status: 500 },
      });

      await expect(spotifyService.getUserMusic('rock')).rejects.toThrow(HttpException);
    });
  });

  describe('getRecommendationsForGenre', () => {
    it('should return recommendations for a genre', async () => {
      jest
        .spyOn(spotifyService, 'getUserMusic')
        .mockResolvedValue({ name: 'Test Album', uri: 'https://spotify.com/test-album' });

      const result = await spotifyService.getRecommendationsForGenre('rock');
      expect(result).toEqual({ name: 'Test Album', uri: 'https://spotify.com/test-album' });
      expect(spotifyService.getUserMusic).toHaveBeenCalledWith('rock');
    });
  });
});
