import { User } from '../entities/user.entity';

export interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<Partial<User>>;
  update(Id: number, user: Partial<User>): Promise<User>;
  delete(id: number): Promise<string>;
  list(): Promise<Partial<User>[]>;
}
