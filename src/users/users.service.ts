import { Injectable } from '@nestjs/common';
import { User, UserRole } from './users.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  createUser(createUserDto: CreateUserDto): User {
    const { userName, firstName, lastName, email, gender } = createUserDto;

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
