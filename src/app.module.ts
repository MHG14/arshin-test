import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PurchasesModule } from './purchases/purchases.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './purchases/entities/purchase.entity';
import { User } from './users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as joi from 'joi';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('HOST'),
        port: configService.getOrThrow('PORT'),
        username: configService.getOrThrow('USERNAME'),
        password: configService.getOrThrow('PASSWORD'),
        database: configService.getOrThrow('DATABASE'),
        entities: [User, Purchase],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      validationSchema: joi.object({
        HOST: joi.string().required(),
        PORT: joi.number().required(),
        USERNAME: joi.string().required(),
        PASSWORD: joi.string().required(),
        DATABASE: joi.string().required(),
      }),
    }),
    UsersModule,
    PurchasesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
