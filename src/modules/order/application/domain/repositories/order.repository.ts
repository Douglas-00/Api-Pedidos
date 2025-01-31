import { ListOrdersResponseDto } from 'src/modules/order/infra/dto/list/response.dto';
import { Order } from '../entities/order.entity';

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: number, userId: number): Promise<Partial<Order>>;
  update(id: number, order: Partial<Order>, userId: number): Promise<Order>;
  delete(id: number, userId: number): Promise<string>;
  list(userId: number): Promise<ListOrdersResponseDto[]>;
}
