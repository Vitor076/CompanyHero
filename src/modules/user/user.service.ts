import { Injectable } from '@nestjs/common';
import { WeatherService } from '../transport/weather/weather.service';
import { UserInput } from './dtos/input.dto';
import { IUserService } from './interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly weatherService: WeatherService) {}

  async getWeatherService(userInput: UserInput): Promise<any> {
    const userWeather = this.weatherService.getUserWeather(userInput.cityName);
    return userWeather;
  }
}
