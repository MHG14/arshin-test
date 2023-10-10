import { Module } from '@nestjs/common';
import { Purchase } from './entities/purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Purchase]), UsersModule],
    providers: [PurchasesService],
    controllers: [PurchasesController]
})
export class PurchasesModule {}
