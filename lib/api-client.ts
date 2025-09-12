import {
  ApiResponse,
  CreateCustomerRequest,
  CreateOrderRequest,
  CreateProductRequest,
  CreateUserRequest,
  Customer,
  Order,
  PaginatedResponse,
  Product,
  UpdateCustomerRequest,
  UpdateOrderRequest,
  UpdateProductRequest,
  UpdateUserRequest,
  User,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;

    // Get token from localStorage if available (client-side)
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token");
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
  }) {
    const response = await this.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async getCurrentUser() {
    return this.request("/api/auth/me");
  }

  async logout() {
    this.clearToken();
  }

  // Users endpoints
  async getUsers(page: number = 1, limit: number = 10, search?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    return this.request<PaginatedResponse<User>>(`/api/users?${params}`);
  }

  async getUser(id: string) {
    return this.request(`/api/users/${id}`);
  }

  async createUser(userData: CreateUserRequest) {
    return this.request("/api/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: string, userData: UpdateUserRequest) {
    return this.request(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string) {
    return this.request(`/api/users/${id}`, {
      method: "DELETE",
    });
  }

  // Products endpoints
  async getProducts(
    page: number = 1,
    limit: number = 10,
    filters?: Record<string, string>
  ) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    });

    return this.request<PaginatedResponse<Product>>(`/api/products?${params}`);
  }

  async getProduct(id: string) {
    return this.request(`/api/products/${id}`);
  }

  async createProduct(productData: CreateProductRequest) {
    return this.request("/api/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id: string, productData: UpdateProductRequest) {
    return this.request(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/api/products/${id}`, {
      method: "DELETE",
    });
  }

  // Orders endpoints
  async getOrders(
    page: number = 1,
    limit: number = 10,
    filters?: Record<string, string>
  ) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    });

    return this.request<PaginatedResponse<Order>>(`/api/orders?${params}`);
  }

  async getOrder(id: string) {
    return this.request(`/api/orders/${id}`);
  }

  async createOrder(orderData: CreateOrderRequest) {
    return this.request("/api/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  async updateOrder(id: string, orderData: UpdateOrderRequest) {
    return this.request(`/api/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(orderData),
    });
  }

  async deleteOrder(id: string) {
    return this.request(`/api/orders/${id}`, {
      method: "DELETE",
    });
  }

  // Customers endpoints
  async getCustomers(page: number = 1, limit: number = 10, search?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    return this.request<PaginatedResponse<Customer>>(
      `/api/customers?${params}`
    );
  }

  async getCustomer(id: string) {
    return this.request(`/api/customers/${id}`);
  }

  async createCustomer(customerData: CreateCustomerRequest) {
    return this.request("/api/customers", {
      method: "POST",
      body: JSON.stringify(customerData),
    });
  }

  async updateCustomer(id: string, customerData: UpdateCustomerRequest) {
    return this.request(`/api/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(customerData),
    });
  }

  async deleteCustomer(id: string) {
    return this.request(`/api/customers/${id}`, {
      method: "DELETE",
    });
  }

  // Analytics endpoints
  async getDashboardStats() {
    return this.request("/api/analytics/dashboard");
  }

  async getRevenueData() {
    return this.request("/api/analytics/dashboard?type=revenue");
  }
}

// Create a singleton instance
export const apiClient = new ApiClient();

// Export the class for custom instances
export default ApiClient;
