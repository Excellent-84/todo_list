import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { unique: true, nullable: false, length: 50 })
  email!: string;

  @Column('varchar', { length: 255, nullable: false })
  password!: string;

  @Column('varchar', { length: 100 })
  name!: string;
}
