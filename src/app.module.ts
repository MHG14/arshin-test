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
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        username: configService.getOrThrow('POSTGRES_USERNAME'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        database: configService.getOrThrow('POSTGRES_DATABASE'),
        entities: [User, Purchase],
        autoLoadEntities: true,
        // should not be true in production environment
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      // doing validation on .env file variables
      validationSchema: joi.object({
        POSTGRES_HOST: joi.string().required(),
        POSTGRES_PORT: joi.number().required(),
        PORT: joi.number().required(),
        POSTGRES_USERNAME: joi.string().required(),
        POSTGRES_PASSWORD: joi.string().required(),
        POSTGRES_DATABASE: joi.string().required(),
      }),
    }),
    UsersModule,
    PurchasesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
