import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProxyService } from 'src/common/proxy/proxy.service';
import { HttpModule } from '@nestjs/axios';
import { SpotifyService } from './spotify.service';

@Module({
  imports: [MongooseModule.forFeature(), HttpModule],
  providers: [SpotifyService, ProxyService],
})
export class SpotifyModule {}
