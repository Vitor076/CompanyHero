import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WeatherService } from './weather.service';
import { ProxyService } from 'src/common/proxy/proxy.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongooseModule.forFeature(), HttpModule],
  providers: [WeatherService, ProxyService],
})
export class WeatherModule {}
