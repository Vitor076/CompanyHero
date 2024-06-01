import { Injectable } from '@nestjs/common';
import { WeatherService } from '../transport/weather/weather.service';
import { UserInput } from './dtos/input.dto';
import { IUserService } from './interfaces/user.service.interface';
import { SpotifyService } from '../transport/spotify/spotify.service';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly weatherService: WeatherService, private readonly spotifyService: SpotifyService) {}

  async getMusicRecommended(userInput: UserInput): Promise<any> {
    const userWeather = await this.weatherService.getUserWeather(userInput.cityName);
    const genre = userWeather.temp > 25 ? 'pop' : userWeather.temp > 10 ? 'rock' : 'classica';

    return this.spotifyService.getRecommendationsForGenre(genre);
  }
}
