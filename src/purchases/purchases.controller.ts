import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Delete } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { Purchase } from './entities';
import { CreatePurchaseDto, UpdatePurchaseDto } from './dto';
import { UpdateResult } from 'typeorm';

@Controller('purchases')
export class PurchasesController {
    constructor(private purchasesService: PurchasesService) {}

    @Post()
    async create(@Body() CreatePurchaseDto: CreatePurchaseDto): Promise<Purchase> {
      return this.purchasesService.create(CreatePurchaseDto);
    }
  
    @Get()
    async findAll(): Promise<Purchase[]> {
      return this.purchasesService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Purchase> {
      return this.purchasesService.findOne(id);
    }
  
    @Patch(':id')
    async updateOne(
      @Param('id', ParseIntPipe) id: number,
      @Body() updatePurchaseDto: UpdatePurchaseDto,
    ): Promise<UpdateResult> {
      return this.purchasesService.update(id, updatePurchaseDto);
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.purchasesService.remove(id);
    }
}
