import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/modules/user/user.service';
import { WeatherService } from '../../src/modules/transport/weather/weather.service';
import { SpotifyService } from '../../src/modules/transport/spotify/spotify.service';
import { UserInput } from '../../src/modules/user/dtos/input.dto';

jest.mock('../../src/modules/transport/weather/weather.service');
jest.mock('../../src/modules/transport/spotify/spotify.service');

describe('UserService', () => {
  let userService: UserService;
  let weatherService: WeatherService;
  let spotifyService: SpotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, WeatherService, SpotifyService],
    }).compile();

    userService = module.get<UserService>(UserService);
    weatherService = module.get<WeatherService>(WeatherService);
    spotifyService = module.get<SpotifyService>(SpotifyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMusicRecommended', () => {
    it('should recommend pop music when temperature is above 25', async () => {
      const mockUserWeather = { temp: 30 };
      const mockRecommendations = [{ name: 'Pop Song', uri: 'https://spotify.com/pop-song' }];

      (weatherService.getUserWeather as jest.Mock).mockResolvedValue(mockUserWeather);
      (spotifyService.getRecommendationsForGenre as jest.Mock).mockResolvedValue(mockRecommendations);

      const userInput: UserInput = { cityName: 'Rio de Janeiro' };
      const result = await userService.getMusicRecommended(userInput);

      expect(result).toEqual(mockRecommendations);
      expect(weatherService.getUserWeather).toHaveBeenCalledWith('Rio de Janeiro');
      expect(spotifyService.getRecommendationsForGenre).toHaveBeenCalledWith('pop');
    });

    it('should recommend rock music when temperature is between 10 and 25', async () => {
      const mockUserWeather = { temp: 20 };
      const mockRecommendations = [{ name: 'Rock Song', uri: 'https://spotify.com/rock-song' }];

      (weatherService.getUserWeather as jest.Mock).mockResolvedValue(mockUserWeather);
      (spotifyService.getRecommendationsForGenre as jest.Mock).mockResolvedValue(mockRecommendations);

      const userInput: UserInput = { cityName: 'São Paulo' };
      const result = await userService.getMusicRecommended(userInput);

      expect(result).toEqual(mockRecommendations);
      expect(weatherService.getUserWeather).toHaveBeenCalledWith('São Paulo');
      expect(spotifyService.getRecommendationsForGenre).toHaveBeenCalledWith('rock');
    });

    it('should recommend classical music when temperature is 10 or below', async () => {
      const mockUserWeather = { temp: 5 };
      const mockRecommendations = [{ name: 'Classical Song', uri: 'https://spotify.com/classical-song' }];

      (weatherService.getUserWeather as jest.Mock).mockResolvedValue(mockUserWeather);
      (spotifyService.getRecommendationsForGenre as jest.Mock).mockResolvedValue(mockRecommendations);

      const userInput: UserInput = { cityName: 'Curitiba' };
      const result = await userService.getMusicRecommended(userInput);

      expect(result).toEqual(mockRecommendations);
      expect(weatherService.getUserWeather).toHaveBeenCalledWith('Curitiba');
      expect(spotifyService.getRecommendationsForGenre).toHaveBeenCalledWith('classica');
    });

    it('should throw an error if weatherService throws an error', async () => {
      (weatherService.getUserWeather as jest.Mock).mockRejectedValue(new Error('Failed to get weather'));

      const userInput: UserInput = { cityName: 'Invalid City' };

      await expect(userService.getMusicRecommended(userInput)).rejects.toThrow('Failed to get weather');
      expect(weatherService.getUserWeather).toHaveBeenCalledWith('Invalid City');
      expect(spotifyService.getRecommendationsForGenre).not.toHaveBeenCalled();
    });

    it('should throw an error if spotifyService throws an error', async () => {
      const mockUserWeather = { temp: 30 };

      (weatherService.getUserWeather as jest.Mock).mockResolvedValue(mockUserWeather);
      (spotifyService.getRecommendationsForGenre as jest.Mock).mockRejectedValue(
        new Error('Failed to get recommendations'),
      );

      const userInput: UserInput = { cityName: 'Rio de Janeiro' };

      await expect(userService.getMusicRecommended(userInput)).rejects.toThrow('Failed to get recommendations');
      expect(weatherService.getUserWeather).toHaveBeenCalledWith('Rio de Janeiro');
      expect(spotifyService.getRecommendationsForGenre).toHaveBeenCalledWith('pop');
    });
  });
});
