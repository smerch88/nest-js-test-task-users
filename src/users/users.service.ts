import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRole } from './user-role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    const { role, search } = filterDto;
    const query = this.userRepository.createQueryBuilder('user');

    if (role) {
      query.andWhere('user.role = :role', { role });
    }

    if (search) {
      query.andWhere(
        '(user.userName LIKE :search OR user.firstName LIKE :search OR user.lastName LIKE :search OR user.email LIKE :search OR user.gender LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const users = await query.getMany();
    return users;
  }

  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return found;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { userName, firstName, lastName, email, gender } = createUserDto;

    const user = new User();

    (user.userName = userName),
      (user.firstName = firstName),
      (user.lastName = lastName),
      (user.email = email),
      (user.gender = gender),
      (user.role = UserRole.USER),
      await user.save();

    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    const { role, userName, firstName, lastName, email, gender } =
      updateUserDto;
    if (role) {
      user.role = role;
    }
    if (userName) {
      user.userName = userName;
    }
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (email) {
      user.email = email;
    }
    if (gender) {
      user.gender = gender;
    }
    await user.save();
    return user;
  }
}
