import { Injectable } from '@nestjs/common';
import {
  InjectConnection,
  InjectDataSource,
  InjectRepository,
} from '@nestjs/typeorm';
import { Connection, DataSource, Repository, UpdateResult } from 'typeorm';
import { CreatePurchaseDto, UpdatePurchaseDto } from './dto';
import { Purchase } from './entities';
import { UsersService } from '../users/users.service';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
    private usersService: UsersService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    try {
      const purchase: Purchase = new Purchase();

      purchase.amount = createPurchaseDto.amount;
      purchase.user_id = createPurchaseDto.user_id;

      return this.purchasesRepository.save(purchase);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Purchase[]> {
    try {
      return await this.purchasesRepository.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Purchase | null> {
    try {
      return await this.purchasesRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    id: number,
    updatePurchaseDto: UpdatePurchaseDto,
  ): Promise<UpdateResult> {
    try {
      return await this.purchasesRepository.update({ id }, updatePurchaseDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.purchasesRepository.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
