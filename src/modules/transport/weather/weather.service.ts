import { Injectable, Logger } from '@nestjs/common';
import { ProxyService } from 'src/common/proxy/proxy.service';
import { ConfigService } from '@nestjs/config';
import { OPEN_WEATHER_KEY, OPEN_WEATHER_GEOCODING_URL, OPEN_WEATHER_MAP_URL } from './weather.constant';
import { UserGeocodingDto } from './dtos/Geocoding.dto';
import { WeatherMap, WeatherMapDto } from './dtos/weatherMap.dto';
import { IWeatherService } from './interfaces/weather.service.interface';

@Injectable()
export class WeatherService implements IWeatherService {
  private readonly weatherGeocodingUrl: string;
  private readonly weatherMapUrl: string;
  private readonly openWeatherKey: string;
  private readonly logger = new Logger(WeatherService.name);

  constructor(private readonly proxyService: ProxyService, readonly configService: ConfigService) {
    this.weatherGeocodingUrl = this.configService.get<string>(OPEN_WEATHER_GEOCODING_URL);
    this.openWeatherKey = this.configService.get<string>(OPEN_WEATHER_KEY);
    this.weatherMapUrl = this.configService.get<string>(OPEN_WEATHER_MAP_URL);
  }

  private async getUserGeocoding(cityName: string): Promise<Partial<UserGeocodingDto>> {
    try {
      const userGeocoding = await this.proxyService.get<UserGeocodingDto>(this.weatherGeocodingUrl, {
        q: cityName,
        limit: 1,
        appid: this.openWeatherKey,
      });
      const latitude = userGeocoding[0].lat;
      const longitude = userGeocoding[0].lon;
      if (latitude && longitude) {
        return { lat: latitude, lon: longitude };
      }
      this.logger.log('invalid cityName');
    } catch (error) {
      throw error.stack;
    }
  }

  public async getUserWeather(cityName: string): Promise<Partial<WeatherMap>> {
    const userGeocoding = await this.getUserGeocoding(cityName);
    try {
      const userWeather = await this.proxyService.get<WeatherMapDto>(this.weatherMapUrl, {
        lat: userGeocoding?.lat,
        lon: userGeocoding?.lon,
        appid: this.openWeatherKey,
        lang: 'pt_br',
        units: 'metric',
      });
      const getUserTemp = userWeather?.main?.temp;
      if (getUserTemp) {
        return { temp: getUserTemp };
      }
      this.logger.log('Error to get Temp');
    } catch (error) {
      throw error.stack;
    }
  }
}
