import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInput } from './dtos/input.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async searchZipcode(@Query() query: UserInput): Promise<any> {
    return this.userService.getWeatherService(query);
  }
}
