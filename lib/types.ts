import { ObjectId } from "mongodb";

// Base interface for all documents
export interface BaseDocument {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// User model
export interface User extends BaseDocument {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user" | "manager";
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
}

// Product model
export interface Product extends BaseDocument {
  name: string;
  description: string;
  price: number;
  category: string;
  sku: string;
  stock: number;
  images: string[];
  isActive: boolean;
  tags: string[];
}

// Order model
export interface Order extends BaseDocument {
  orderNumber: string;
  customerId: ObjectId;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  notes?: string;
}

// Order item model
export interface OrderItem {
  productId: ObjectId;
  quantity: number;
  price: number;
  name: string;
}

// Address model
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Customer model
export interface Customer extends BaseDocument {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: Address;
  dateOfBirth?: Date;
  isActive: boolean;
  totalOrders: number;
  totalSpent: number;
}

// Vendor model
export interface Vendor extends BaseDocument {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: Address;
  products: ObjectId[];
  isActive: boolean;
  rating: number;
}

// Analytics model
export interface Analytics extends BaseDocument {
  date: Date;
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  topProducts: {
    productId: ObjectId;
    name: string;
    sales: number;
  }[];
  revenueByCategory: {
    category: string;
    revenue: number;
  }[];
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Request types
export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user" | "manager";
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  role?: "admin" | "user" | "manager";
  isActive?: boolean;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  sku: string;
  stock: number;
  images?: string[];
  tags?: string[];
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
  images?: string[];
  isActive?: boolean;
  tags?: string[];
}

export interface CreateOrderRequest {
  customerId: string;
  items: Array<Omit<OrderItem, "name">>;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  notes?: string;
}

export interface UpdateOrderRequest {
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus?: "pending" | "paid" | "failed" | "refunded";
  notes?: string;
}
