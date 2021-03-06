import * as bcrypt from 'bcrypt';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Friend } from './Friend';
import { Message } from './Message';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @OneToMany(
      (type) => Friend,
      (friend) => friend.followingId
    )
    @OneToMany(
      (type) => Message,
      (message) => message.targetUserId
    )
    id: number;

    @Column({default: null})
    name: string;

    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;

    @Column({default: null})
    profileImageUri: string;

    @Column({default: null})
    backgroundImageUri: string;

    @Column({default: null})
    comment: string;

    @OneToMany(
      (type) => Friend,
      (friend) => friend.user
    )
    following: Friend[];

    @OneToMany(
      (type) => Message,
      (msg) => msg.user
    )
    messages: Message[];

    @CreateDateColumn({ name: 'created_at', type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: "timestamp" })
    updatedAt!: Date;

    public hashPassword() {
      this.password = bcrypt.hashSync(this.password, 8);
    }

    public isPasswordCorrect(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
  }
