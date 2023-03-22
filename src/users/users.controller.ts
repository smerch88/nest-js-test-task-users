import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UserStatusValidationPipe } from './pipes/user-status.validation.pipe';
import { User } from './user.entity';
import { UserRole } from './user-role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(
    @Query(ValidationPipe) filterDto: GetUsersFilterDto,
  ): Promise<User[]> {
    return this.usersService.getUsers(filterDto);
  }

  @Get('/:id')
  getUsertById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  @Patch('/:id/update')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { role, userName, firstName, lastName, email, gender } =
      updateUserDto;
    return this.usersService.updateUser(
      id,
      role,
      userName,
      firstName,
      lastName,
      email,
      gender,
    );
  }
}
