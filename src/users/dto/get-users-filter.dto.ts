import { UserRole } from '../users.model';

export class GetUsersFilterDto {
  role: UserRole;
  search: string;
}
