import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, HttpException, Logger } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class ProxyService {
  private logger = new Logger('ProxyService');

  constructor(private readonly httpService: HttpService) {}

  public async get<T>(
    endpoint: string,
    queryParams?: Record<string, any>,
    headers?: any,
    notFound = false,
  ): Promise<T> {
    const response: any = await lastValueFrom(
      this.httpService.get<T>(endpoint, { headers, params: queryParams }).pipe(
        catchError((error: AxiosError) => {
          if (notFound && error.response?.status === 404) {
            return Promise.resolve(null);
          }
          this.logger.error(error.config?.url);
          this.logger.error(error.response?.data || error.message);
        }),
      ),
    );
    return response?.data;
  }

  public async post<T>(fullEndpoint: string, data: any, headers?: object): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.post<T>(fullEndpoint, data, { ...headers }).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(error.message, error?.response?.status || 500);
        }),
      ),
    );
    return response;
  }

  public async put<T>(fullEndpoint: string, data: any, headers?: object): Promise<AxiosResponse> {
    const response = await lastValueFrom(
      this.httpService.put<T>(fullEndpoint, data, { ...headers }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.config?.url);
          this.logger.error(error.response?.data || error.message);
          throw new InternalServerErrorException();
        }),
      ),
    );
    return response;
  }

  public async delete<T>(fullEndpoint: string, headers?: object): Promise<T> {
    const response = await lastValueFrom(
      this.httpService.delete<T>(fullEndpoint, { ...headers }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.config?.url);
          this.logger.error(error.response?.data || error.message);
          throw new InternalServerErrorException();
        }),
      ),
    );
    return response.data;
  }
}
