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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UserStatusValidationPipe } from './pipes/user-status.validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Query(ValidationPipe) filterDto: GetUsersFilterDto): User[] {
    if (Object.keys(filterDto).length) {
      return this.usersService.getUsersWithFilter(filterDto);
    }
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  getUsertById(@Param('id') id: string): User {
    return this.usersService.getUserById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.createUser(createUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string): void {
    this.usersService.deleteUser(id);
  }

  @Patch('/:id/role')
  updateUserRole(
    @Param('id') id: string,
    @Body('role', UserStatusValidationPipe) role: UserRole,
  ): User {
    return this.usersService.updateUserRole(id, role);
  }
}
