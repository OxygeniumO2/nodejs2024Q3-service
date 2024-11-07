import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from 'src/db/db';
import { User } from 'src/interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private checkUserExists(id: string) {
    const user = users.get(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  private getUserWithoutPassword(user: User) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  create(createUserDto: CreateUserDto) {
    users.forEach((user) => {
      if (user.login === createUserDto.login) {
        throw new HttpException(
          `User with login '${createUserDto.login}' already exists`,
          HttpStatus.CONFLICT,
        );
      }
    });

    const currDate = Date.now();

    const userObj: User = {
      ...createUserDto,
      id: uuidv4(),
      createdAt: currDate,
      updatedAt: currDate,
      version: 1,
    };

    users.set(userObj.id, userObj);

    return this.getUserWithoutPassword(userObj);
  }

  findAll() {
    return Array.from(users.values()).map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword,
    );
  }

  findOne(id: string) {
    const user = this.checkUserExists(id);

    return this.getUserWithoutPassword(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.checkUserExists(id);

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException(
        'Old password is incorrect',
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedUser = {
      ...user,
      password: updateUserDto.newPassword,
      updatedAt: Date.now(),
      version: user.version + 1,
    };

    users.set(id, updatedUser);

    return this.getUserWithoutPassword(updatedUser);
  }

  remove(id: string) {
    this.checkUserExists(id);

    users.delete(id);
  }
}
