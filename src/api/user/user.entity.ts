import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../common/enums/roles.enum';
import { encryptPassword } from '../../service/password.crypt';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  firstName: string;

  @Column({ length: 60 })
  lastName: string;

  @Column({ length: 200 })
  userName: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: number;

  @Column({
    name: 'password',
    length: 200,
    transformer: {
      to(value) {
        return encryptPassword(value);
      },
      from(value) {
        return value;
      },
    },
  })
  password: string;
}
