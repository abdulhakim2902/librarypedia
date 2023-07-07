import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { capitalize } from 'lodash';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ name: 'id', default: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ name: 'username', default: 'johndoe' })
  @Column({ type: 'varchar', name: 'username', unique: true })
  username: string;

  @ApiProperty({ name: 'email', default: 'johndoe@mail.com' })
  @Column({ type: 'varchar', name: 'email', unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @ApiProperty({ name: 'password', default: 'password' })
  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @ApiProperty({ name: 'firstName', default: 'John' })
  @Column({ type: 'varchar', name: 'firstName' })
  firstName: string;

  @ApiProperty({ name: 'lastName', default: 'Doe' })
  @Column({ type: 'varchar', name: 'lastName', nullable: true })
  lastName: string;

  @ApiProperty({ name: 'profileImageURL', default: 'https://image.net' })
  @Column({ type: 'varchar', name: 'profileImageURL', nullable: true })
  profileImageURL: string;

  @ApiProperty({ name: 'address', default: 'Unknown address' })
  @Column({ type: 'varchar', name: 'address', nullable: true })
  address: string;

  @ApiProperty({ name: 'phoneNumber', default: '+6281200000000' })
  @Column({ type: 'varchar', name: 'phoneNumber', nullable: true })
  phoneNumber: string;

  @ApiProperty({ name: 'createdAt', default: new Date() })
  @CreateDateColumn({ type: 'date', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ name: 'updatedAt', default: new Date() })
  @UpdateDateColumn({ type: 'date', name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  insertName() {
    if (this.firstName) {
      const firstName = this.firstName.toLowerCase();
      this.firstName = capitalize(firstName);
    }

    if (this.lastName) {
      const lastName = this.lastName.toLowerCase();
      this.lastName = capitalize(lastName);
    }
  }

  @BeforeUpdate()
  updateName() {
    if (this.firstName) {
      const firstName = this.firstName.toLowerCase();
      this.firstName = capitalize(firstName);
    }

    if (this.lastName) {
      const lastName = this.lastName.toLowerCase();
      this.lastName = capitalize(lastName);
    }
  }

  get fullName(): string {
    const lastName = this.lastName ?? '';
    return `${capitalize(this.firstName)} ${capitalize(lastName)}`.trim();
  }
}
