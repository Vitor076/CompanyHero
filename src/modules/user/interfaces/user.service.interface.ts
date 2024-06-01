import { UserInput } from '../dtos/input.dto';

export interface IUserService {
  getMusicRecommended(userInput: UserInput): Promise<any>;
}
