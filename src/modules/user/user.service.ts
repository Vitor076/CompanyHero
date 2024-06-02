import { Injectable } from '@nestjs/common';
import { WeatherService } from '../transport/weather/weather.service';
import { UserInput } from './dtos/input.dto';
import { IUserService } from './interfaces/user.service.interface';
import { SpotifyService } from '../transport/spotify/spotify.service';
import { TEMP_POP, TEMP_ROCK } from './user.constant';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly weatherService: WeatherService, private readonly spotifyService: SpotifyService) {}

  async getMusicRecommended(userInput: UserInput): Promise<any> {
    const userWeather = await this.weatherService.getUserWeather(userInput.cityName);
    const genre = userWeather.temp > TEMP_POP ? 'pop' : userWeather.temp > TEMP_ROCK ? 'rock' : 'classica';

    return this.spotifyService.getRecommendationsForGenre(genre);
  }
}
