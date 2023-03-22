import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserRole } from './users.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUsersWithFilter(filterDto: GetUsersFilterDto): User[] {
    const { role, search } = filterDto;

    let users = this.getAllUsers();

    if (role) {
      users = users.filter((user) => user.role === role);
    }

    if (search) {
      users = users.filter(
        (user) =>
          user.userName.includes(search) ||
          user.firstName.includes(search) ||
          user.lastName.includes(search) ||
          user.email.includes(search) ||
          user.gender.includes(search),
      );
    }

    return users;
  }

  getUserById(id: string): User {
    const found = this.users.find((u) => u.id === id);

    if (!found) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return found;
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

  deleteUser(id: string): void {
    const found = this.getUserById(id);
    this.users = this.users.filter((user) => user.id !== found.id);
  }

  updateUserRole(id: string, role: UserRole): User {
    const user = this.getUserById(id);
    user.role = role;
    return user;
  }
}
