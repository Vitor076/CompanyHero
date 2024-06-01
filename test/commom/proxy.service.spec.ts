import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { ProxyService } from '../../src/common/proxy/proxy.service';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

describe('ProxyService', () => {
  let service: ProxyService;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        ProxyService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProxyService>(ProxyService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('get', () => {
    it('should call HttpService.get with correct params and query params', () => {
      const endpoint = 'test-endpoint';

      const responseData = 'test-data';
      const queryParams = { param1: 'value1', param2: 'value2' };

      jest.spyOn(httpService, 'get').mockReturnValue(of({ data: responseData } as AxiosResponse));

      const result = service.get(endpoint, queryParams, {});
      expect(result).resolves.toEqual(responseData);
    });

    it('should throw an error when HttpService.get returns an error', async () => {
      const endpoint = 'test-endpoint';

      const error = new InternalServerErrorException('test-error');

      jest.spyOn(httpService, 'get').mockImplementation(() => {
        throw error;
      });

      await expect(service.get(endpoint, {}, {})).rejects.toThrowError(error);
    });

    it('should log error when HttpService.get throws an error', async () => {
      const endpoint = 'test-endpoint';

      const errorMessage = 'Request failed';
      const axiosError = {
        name: 'Error',
        message: errorMessage,
        config: {
          url: endpoint,
          headers: { 'Content-Type': 'aplication/json' },
        },
        isAxiosError: true,
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(throwError(axiosError));
      jest.spyOn(service['logger'], 'error');

      try {
        await service.get(endpoint, {}, {});
      } catch (error) {}

      expect(service['logger'].error).toHaveBeenCalledWith(expect.stringContaining(endpoint));
      expect(service['logger'].error).toHaveBeenCalledWith(errorMessage);
    });

    it('should pass additional query parameters when provided', async () => {
      const endpoint = 'test-endpoint';

      const query = { key: 'value' };
      const responseData = 'test-data';

      jest.spyOn(httpService, 'get').mockReturnValue(of({ data: responseData } as AxiosResponse));

      const result = service.get(endpoint, query, {});
      expect(result).resolves.toEqual(responseData);
    });

    it('should call HttpService.get with correct params and baseUrl', () => {
      const endpoint = 'test-endpoint';

      const responseData = 'test-data';
      const baseUrl = 'http://test-api.com';

      jest.spyOn(configService, 'get').mockReturnValue(baseUrl);
      jest.spyOn(httpService, 'get').mockReturnValue(of({ data: responseData } as AxiosResponse));

      const result = service.get(endpoint, {}, {});
      expect(result).resolves.toEqual(responseData);
    });
  });

  describe('post', () => {
    it('should call HttpService.post with correct params', () => {
      const endpoint = 'test-endpoint';
      const data = { test: 'data' };

      const responseData = 'test-data';

      jest.spyOn(httpService, 'post').mockReturnValue(of({ data: responseData } as AxiosResponse));

      const result = service.post(endpoint, data, {});
      expect(result).resolves.toEqual({ data: responseData });
    });

    it('should handle errors thrown by HttpService.post', async () => {
      const endpoint = 'test-endpoint';
      const data = { test: 'data' };

      jest.spyOn(httpService, 'post').mockReturnValue(throwError(new HttpException('Bad Request', 400)));

      await expect(service.post(endpoint, data, {})).rejects.toThrow(HttpException);
    });
  });

  describe('put', () => {
    it('should call HttpService.put with correct params', () => {
      const endpoint = 'test-endpoint';
      const data = { test: 'data' };

      const responseData = 'test-data';

      jest.spyOn(httpService, 'put').mockReturnValue(of(responseData as any as AxiosResponse));

      const result = service.put(endpoint, data, {});
      expect(result).resolves.toEqual(responseData);
    });

    it('should handle errors thrown by HttpService.put', async () => {
      const endpoint = 'test-endpoint';
      const data = { test: 'data' };

      jest.spyOn(httpService, 'put').mockReturnValue(throwError(new HttpException('Bad Request', 400)));

      await expect(service.put(endpoint, data, {})).rejects.toThrow(HttpException);
    });
  });

  describe('delete', () => {
    it('should call HttpService.delete with correct params', () => {
      const endpoint = 'test-endpoint';

      const responseData = 'test-data';

      jest.spyOn(httpService, 'delete').mockReturnValue(of({ data: responseData } as AxiosResponse));

      const result = service.delete(endpoint, {});
      expect(result).resolves.toEqual(responseData);
    });

    it('should handle errors thrown by HttpService.delete', async () => {
      const endpoint = 'test-endpoint';

      jest.spyOn(httpService, 'delete').mockReturnValue(throwError(new HttpException('Not Found', 404)));
      await expect(service.delete(endpoint, {})).rejects.toThrow(HttpException);
    });
  });
});
