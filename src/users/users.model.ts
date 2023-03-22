export interface User {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  gender: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
