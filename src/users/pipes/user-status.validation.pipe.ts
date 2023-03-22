import { PipeTransform, BadRequestException } from '@nestjs/common';
import { UserRole } from '../user-role.enum';

export class UserStatusValidationPipe implements PipeTransform {
  readonly allowedRoles = [UserRole.ADMIN, UserRole.USER];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isRoleValid(value)) {
      throw new BadRequestException(`"${value}" is not a valid role.`);
    }

    return value;
  }

  private isRoleValid(role: any) {
    const idx = this.allowedRoles.indexOf(role);
    return idx !== -1;
  }
}
