import { Test, TestingModule } from '@nestjs/testing';

import { ProxyService } from '../../../src/common/proxy/proxy.service';
import { HttpException } from '@nestjs/common';
import { WeatherService } from '../../../src/modules/transport/weather/weather.service';
import { ConfigService } from '@nestjs/config';

jest.mock('../../../src/common/proxy/proxy.service');

describe('WeatherService', () => {
  let weatherService: WeatherService;
  let proxyService: ProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        ConfigService,
        {
          provide: ProxyService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    weatherService = module.get<WeatherService>(WeatherService);
    proxyService = module.get<ProxyService>(ProxyService);
  });

  describe('getUserGeocoding', () => {
    it('should return geocoding information for a valid city', async () => {
      const cityName = 'São Paulo';
      const geocodingResponse = [{ lat: -23.55052, lon: -46.633308 }];
      (proxyService.get as jest.Mock).mockResolvedValue(geocodingResponse);

      const result = await weatherService.getUserGeocoding(cityName);
      expect(result).toEqual({ lat: -23.55052, lon: -46.633308 });
    });

    it('should handle errors properly', async () => {
      const cityName = 'ErrorCity';
      (proxyService.get as jest.Mock).mockRejectedValue({ response: { status: 500 } });

      await expect(weatherService.getUserGeocoding(cityName)).rejects.toThrow(HttpException);
    });
  });

  describe('getUserWeather', () => {
    it('should return weather information for a valid city', async () => {
      const cityName = 'São Paulo';
      const geocodingResponse = { lat: -23.55052, lon: -46.633308 };
      const weatherResponse = { main: { temp: 25.5 } };
      (proxyService.get as jest.Mock).mockResolvedValueOnce([geocodingResponse]).mockResolvedValueOnce(weatherResponse);

      const result = await weatherService.getUserWeather(cityName);
      expect(result).toEqual({ temp: 25.5 });
    });

    it('should throw an exception if geocoding fails', async () => {
      const cityName = 'InvalidCity';
      (proxyService.get as jest.Mock).mockResolvedValue([]);

      await expect(weatherService.getUserWeather(cityName)).rejects.toThrow(TypeError);
    });

    it('should handle errors properly', async () => {
      const cityName = 'ErrorCity';
      (proxyService.get as jest.Mock).mockRejectedValue({ response: { status: 500 } });

      await expect(weatherService.getUserWeather(cityName)).rejects.toThrow(HttpException);
    });
  });
});
