import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';
import { Purchase } from '../../purchases/entities/purchase.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  totalPurchases: number;

  @OneToMany(() => Purchase, (purchase) => purchase.user_id)
  purchases: Purchase[];
}
