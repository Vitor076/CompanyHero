import { UserInput } from '../dtos/input.dto';

export interface IUserService {
  getWeatherService(userInput: UserInput): Promise<any>;
}
