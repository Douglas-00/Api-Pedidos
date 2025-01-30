import { Order } from '../entities/order.entity';

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: number): Promise<Order | null>;
  update(id: number, order: Partial<Order>): Promise<Order>;
  delete(id: number): Promise<string>;
  list(): Promise<Order[]>;
}
