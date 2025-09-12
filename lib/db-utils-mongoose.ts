import { connectToDatabase } from './mongodb';
import User, { IUser } from './models/User';
import Product, { IProduct } from './models/Product';
import Order, { IOrder } from './models/Order';
import Customer, { ICustomer } from './models/Customer';
import { User as UserType, Product as ProductType, Order as OrderType, Customer as CustomerType, PaginatedResponse } from './types';

// Generic pagination helper
export async function paginate<T>(
  model: any,
  filter: Record<string, unknown> = {},
  page: number = 1,
  limit: number = 10,
  sort: Record<string, unknown> = { createdAt: -1 }
): Promise<PaginatedResponse<T>> {
  await connectToDatabase();
  
  const skip = (page - 1) * limit;
  const total = await model.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  const data = await model
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();

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
  static async create(userData: Partial<UserType>): Promise<IUser> {
    await connectToDatabase();
    const user = new User(userData);
    return await user.save();
  }

  static async findById(id: string): Promise<IUser | null> {
    await connectToDatabase();
    return await User.findById(id).lean();
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    await connectToDatabase();
    return await User.findOne({ email }).lean();
  }

  static async list(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, unknown> = {}
  ): Promise<PaginatedResponse<UserType>> {
    return paginate<UserType>(User, filter, page, limit);
  }

  static async update(id: string, updateData: Partial<UserType>): Promise<IUser | null> {
    await connectToDatabase();
    return await User.findByIdAndUpdate(id, updateData, { new: true }).lean();
  }

  static async delete(id: string): Promise<boolean> {
    await connectToDatabase();
    const result = await User.findByIdAndDelete(id);
    return !!result;
  }

  static async search(searchTerm: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<UserType>> {
    await connectToDatabase();
    const filter = {
      $or: [
        { firstName: { $regex: searchTerm, $options: 'i' } },
        { lastName: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } }
      ]
    };
    return paginate<UserType>(User, filter, page, limit);
  }
}

// Product operations
export class ProductService {
  static async create(productData: Partial<ProductType>): Promise<IProduct> {
    await connectToDatabase();
    const product = new Product(productData);
    return await product.save();
  }

  static async findById(id: string): Promise<IProduct | null> {
    await connectToDatabase();
    return await Product.findById(id).lean();
  }

  static async list(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, unknown> = {}
  ): Promise<PaginatedResponse<ProductType>> {
    return paginate<ProductType>(Product, filter, page, limit);
  }

  static async update(id: string, updateData: Partial<ProductType>): Promise<IProduct | null> {
    await connectToDatabase();
    return await Product.findByIdAndUpdate(id, updateData, { new: true }).lean();
  }

  static async delete(id: string): Promise<boolean> {
    await connectToDatabase();
    const result = await Product.findByIdAndDelete(id);
    return !!result;
  }

  static async search(searchTerm: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<ProductType>> {
    await connectToDatabase();
    const filter = {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } }
      ]
    };
    return paginate<ProductType>(Product, filter, page, limit);
  }
}

// Order operations
export class OrderService {
  static async create(orderData: Partial<OrderType>): Promise<IOrder> {
    await connectToDatabase();
    const order = new Order(orderData);
    return await order.save();
  }

  static async findById(id: string): Promise<IOrder | null> {
    await connectToDatabase();
    return await Order.findById(id).lean();
  }

  static async list(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, unknown> = {}
  ): Promise<PaginatedResponse<OrderType>> {
    return paginate<OrderType>(Order, filter, page, limit);
  }

  static async update(id: string, updateData: Partial<OrderType>): Promise<IOrder | null> {
    await connectToDatabase();
    return await Order.findByIdAndUpdate(id, updateData, { new: true }).lean();
  }

  static async delete(id: string): Promise<boolean> {
    await connectToDatabase();
    const result = await Order.findByIdAndDelete(id);
    return !!result;
  }

  static async getStats(): Promise<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByStatus: Record<string, number>;
  }> {
    await connectToDatabase();
    
    const totalOrders = await Order.countDocuments();
    const revenueResult = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const statusMap: Record<string, number> = {};
    ordersByStatus.forEach((item: any) => {
      statusMap[item._id] = item.count;
    });

    return {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      ordersByStatus: statusMap,
    };
  }
}

// Customer operations
export class CustomerService {
  static async create(customerData: Partial<CustomerType>): Promise<ICustomer> {
    await connectToDatabase();
    const customer = new Customer(customerData);
    return await customer.save();
  }

  static async findById(id: string): Promise<ICustomer | null> {
    await connectToDatabase();
    return await Customer.findById(id).lean();
  }

  static async list(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, unknown> = {}
  ): Promise<PaginatedResponse<CustomerType>> {
    return paginate<CustomerType>(Customer, filter, page, limit);
  }

  static async update(id: string, updateData: Partial<CustomerType>): Promise<ICustomer | null> {
    await connectToDatabase();
    return await Customer.findByIdAndUpdate(id, updateData, { new: true }).lean();
  }

  static async delete(id: string): Promise<boolean> {
    await connectToDatabase();
    const result = await Customer.findByIdAndDelete(id);
    return !!result;
  }

  static async search(searchTerm: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<CustomerType>> {
    await connectToDatabase();
    const filter = {
      $or: [
        { firstName: { $regex: searchTerm, $options: 'i' } },
        { lastName: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { company: { $regex: searchTerm, $options: 'i' } }
      ]
    };
    return paginate<CustomerType>(Customer, filter, page, limit);
  }
}

// Analytics operations
export class AnalyticsService {
  static async getDashboardAnalytics(): Promise<{
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    recentOrders: OrderType[];
    topProducts: ProductType[];
    userGrowth: Array<{ date: string; count: number }>;
  }> {
    await connectToDatabase();

    const [totalUsers, totalProducts, totalOrders] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
    ]);

    const revenueResult = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const topProducts = await Product.find()
      .sort({ stock: -1 })
      .limit(5)
      .lean();

    // User growth over last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const userGrowth = await User.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
      topProducts,
      userGrowth: userGrowth.map((item: any) => ({
        date: item._id,
        count: item.count,
      })),
    };
  }

  static async getRevenueByMonth(): Promise<Array<{ month: string; revenue: number }>> {
    await connectToDatabase();
    
    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          revenue: { $sum: '$total' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return revenueData.map((item: any) => ({
      month: item._id,
      revenue: item.revenue
    }));
  }
}
