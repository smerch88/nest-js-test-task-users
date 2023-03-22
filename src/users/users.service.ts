import { Injectable } from '@nestjs/common';
import { User, UserRole } from './users.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  createUser(
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
  ): User {
    const user: User = {
      id: uuidv4(),
      userName,
      firstName,
      lastName,
      email,
      gender,
      role: UserRole.USER,
    };

    this.users.push(user);
    return user;
  }
}
