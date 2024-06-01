import { WeatherMap } from '../dtos/weatherMap.dto';

export interface IWeatherService {
  getUserWeather(cityName: string): Promise<Partial<WeatherMap>>;
}
