import { ObjectId } from "mongodb";
import { getCollection } from "./mongodb";
import { Customer, Order, PaginatedResponse, Product, User } from "./types";

// Generic pagination helper
export async function paginate<T>(
  collectionName: string,
  filter: Record<string, unknown> = {},
  page: number = 1,
  limit: number = 10,
  sort: Record<string, unknown> = { createdAt: -1 }
): Promise<PaginatedResponse<T>> {
  const collection = await getCollection(collectionName);

  const skip = (page - 1) * limit;
  const total = await collection.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  const data = (await collection
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray()) as T[];

  return {
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

// User operations
export class UserService {
  static async create(
    userData: Omit<User, "_id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    const collection = await getCollection("users");
    const now = new Date();
    const user: User = {
      ...userData,
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(user);
    return { ...user, _id: result.insertedId };
  }

  static async findById(id: string): Promise<User | null> {
    const collection = await getCollection("users");
    return (await collection.findOne({ _id: new ObjectId(id) })) as User | null;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const collection = await getCollection("users");
    return (await collection.findOne({ email })) as User | null;
  }

  static async update(
    id: string,
    updateData: Partial<User>
  ): Promise<User | null> {
    const collection = await getCollection("users");
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    return result as User | null;
  }

  static async delete(id: string): Promise<boolean> {
    const collection = await getCollection("users");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  static async list(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, unknown> = {}
  ): Promise<PaginatedResponse<User>> {
    return paginate<User>("users", filter, page, limit);
  }
}

// Product operations
export class ProductService {
  static async create(
    productData: Omit<Product, "_id" | "createdAt" | "updatedAt">
  ): Promise<Product> {
    const collection = await getCollection("products");
    const now = new Date();
    const product: Product = {
      ...productData,
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(product);
    return { ...product, _id: result.insertedId };
  }

  static async findById(id: string): Promise<Product | null> {
    const collection = await getCollection("products");
    return (await collection.findOne({
      _id: new ObjectId(id),
    })) as Product | null;
  }

  static async findBySku(sku: string): Promise<Product | null> {
    const collection = await getCollection("products");
    return (await collection.findOne({ sku })) as Product | null;
  }

  static async update(
    id: string,
    updateData: Partial<Product>
  ): Promise<Product | null> {
    const collection = await getCollection("products");
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    return result as Product | null;
  }

  static async delete(id: string): Promise<boolean> {
    const collection = await getCollection("products");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  static async list(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, unknown> = {}
  ): Promise<PaginatedResponse<Product>> {
    return paginate<Product>("products", filter, page, limit);
  }

  static async updateStock(id: string, quantity: number): Promise<boolean> {
    const collection = await getCollection("products");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { stock: quantity }, $set: { updatedAt: new Date() } }
    );
    return result.modifiedCount > 0;
  }
}

// Order operations
export class OrderService {
  static async create(
    orderData: Omit<Order, "_id" | "createdAt" | "updatedAt">
  ): Promise<Order> {
    const collection = await getCollection("orders");
    const now = new Date();
    const order: Order = {
      ...orderData,
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(order);
    return { ...order, _id: result.insertedId };
  }

  static async findById(id: string): Promise<Order | null> {
    const collection = await getCollection("orders");
    return (await collection.findOne({
      _id: new ObjectId(id),
    })) as Order | null;
  }

  static async findByOrderNumber(orderNumber: string): Promise<Order | null> {
    const collection = await getCollection("orders");
    return (await collection.findOne({ orderNumber })) as Order | null;
  }

  static async update(
    id: string,
    updateData: Partial<Order>
  ): Promise<Order | null> {
    const collection = await getCollection("orders");
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    return result as Order | null;
  }

  static async delete(id: string): Promise<boolean> {
    const collection = await getCollection("orders");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  static async list(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, unknown> = {}
  ): Promise<PaginatedResponse<Order>> {
    return paginate<Order>("orders", filter, page, limit);
  }

  static async getOrdersByCustomer(
    customerId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Order>> {
    return paginate<Order>(
      "orders",
      { customerId: new ObjectId(customerId) },
      page,
      limit
    );
  }
}

// Customer operations
export class CustomerService {
  static async create(
    customerData: Omit<Customer, "_id" | "createdAt" | "updatedAt">
  ): Promise<Customer> {
    const collection = await getCollection("customers");
    const now = new Date();
    const customer: Customer = {
      ...customerData,
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(customer);
    return { ...customer, _id: result.insertedId };
  }

  static async findById(id: string): Promise<Customer | null> {
    const collection = await getCollection("customers");
    return (await collection.findOne({
      _id: new ObjectId(id),
    })) as Customer | null;
  }

  static async findByEmail(email: string): Promise<Customer | null> {
    const collection = await getCollection("customers");
    return (await collection.findOne({ email })) as Customer | null;
  }

  static async update(
    id: string,
    updateData: Partial<Customer>
  ): Promise<Customer | null> {
    const collection = await getCollection("customers");
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    return result as Customer | null;
  }

  static async delete(id: string): Promise<boolean> {
    const collection = await getCollection("customers");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  static async list(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, unknown> = {}
  ): Promise<PaginatedResponse<Customer>> {
    return paginate<Customer>("customers", filter, page, limit);
  }
}

// Analytics operations
export class AnalyticsService {
  static async getDashboardStats(): Promise<{
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
    recentOrders: Order[];
    topProducts: Array<{
      productId: ObjectId;
      name: string;
      sales: number;
    }>;
  }> {
    const ordersCollection = await getCollection("orders");
    const customersCollection = await getCollection("customers");
    const productsCollection = await getCollection("products");

    const [
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      recentOrders,
    ] = await Promise.all([
      ordersCollection
        .aggregate([
          { $match: { paymentStatus: "paid" } },
          { $group: { _id: null, total: { $sum: "$total" } } },
        ])
        .toArray(),
      ordersCollection.countDocuments(),
      customersCollection.countDocuments(),
      productsCollection.countDocuments(),
      ordersCollection.find({}).sort({ createdAt: -1 }).limit(5).toArray(),
    ]);

    const topProducts = await ordersCollection
      .aggregate([
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.productId",
            totalSales: { $sum: "$items.quantity" },
          },
        },
        { $sort: { totalSales: -1 } },
        { $limit: 5 },
      ])
      .toArray();

    return {
      totalRevenue: totalRevenue[0]?.total || 0,
      totalOrders,
      totalCustomers,
      totalProducts,
      recentOrders: recentOrders as Order[],
      topProducts,
    };
  }

  static async getRevenueByMonth(): Promise<
    { month: string; revenue: number }[]
  > {
    const ordersCollection = await getCollection("orders");

    const revenueByMonth = await ordersCollection
      .aggregate([
        { $match: { paymentStatus: "paid" } },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            revenue: { $sum: "$total" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ])
      .toArray();

    return revenueByMonth.map((item) => ({
      month: `${item._id.year}-${item._id.month.toString().padStart(2, "0")}`,
      revenue: item.revenue,
    }));
  }
}
