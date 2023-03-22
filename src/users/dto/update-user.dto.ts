import { UserRole } from '../user-role.enum';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  role?: UserRole;

  @IsNotEmpty()
  userName?: string;

  @IsNotEmpty()
  firstName?: string;

  @IsNotEmpty()
  lastName?: string;

  @IsNotEmpty()
  email?: string;

  @IsNotEmpty()
  gender?: string;
}
