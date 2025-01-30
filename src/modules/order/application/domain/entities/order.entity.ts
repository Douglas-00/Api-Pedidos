export class Order {
  id?: number;
  userId: number;
  totalAmount: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  products?: { productId: number; quantity: number }[];

  constructor(
    id: number,
    userId: number,
    totalAmount: number,
    status: string,
    products: { productId: number; quantity: number }[] = [],
  ) {
    this.id = id;
    this.userId = userId;
    this.totalAmount = totalAmount;
    this.status = status;
    this.products = products;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
