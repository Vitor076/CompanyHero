import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { WeatherModule } from '../transport/weather/weather.module';
import { WeatherService } from '../transport/weather/weather.service';
import { ProxyService } from 'src/common/proxy/proxy.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongooseModule.forFeature([]), WeatherModule, HttpModule],
  providers: [UserService, WeatherService, ProxyService],
  controllers: [UserController],
})
export class UserModule {}
