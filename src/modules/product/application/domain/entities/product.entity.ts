export class Product {
  id?: number;
  name: string;
  category: string;
  description: string;
  price: number;
  stockQuantity: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(
    id: number,
    name: string,
    category: string,
    description: string,
    price: number,
    stockQuantity: number,
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.price = price;
    this.stockQuantity = stockQuantity;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
