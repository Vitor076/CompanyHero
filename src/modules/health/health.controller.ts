import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(private health: HealthCheckService, private http: HttpHealthIndicator) {}

  @Get('/status')
  @HealthCheck()
  status() {
    return this.health.check([]);
  }
}
