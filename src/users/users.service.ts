import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user: User = new User();
      const hashedPassword = this.hashPassword(createUserDto.password);

      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.email = createUserDto.email;
      user.password = hashedPassword;
      user.totalPurchases = 0;
      const createdUser = await this.usersRepository.save(user);
      delete createdUser.password;
      return createdUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(
          'this email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<User | null> {
    try {
      return await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      return await this.usersRepository.update({ id }, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
