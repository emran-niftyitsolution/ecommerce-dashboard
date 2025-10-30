"use client";

import { apiClient } from "@/lib/api-client";
import { Order, Product } from "@/lib/types";
import {
  DollarOutlined,
  LoadingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Line, Pie } from "@ant-design/plots";
import { Alert, Card, Col, Row, Spin, Statistic } from "antd";
import { useEffect, useState } from "react";

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  recentOrders: Order[];
  topProducts: Product[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if user is authenticated by trying to get current user first
        const userResponse = await apiClient.getCurrentUser();
        if (!userResponse.success) {
          // User not authenticated, redirect will be handled by layout
          setLoading(false);
          return;
        }

        const response = await apiClient.getDashboardStats();

        if (response.success) {
          setStats(response.data);
        } else {
          setError(response.error || "Failed to fetch dashboard data");
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        // Check if it's an authentication error
        if (err instanceof Error && err.message.includes("Unauthorized")) {
          setError("Please log in to view dashboard data");
        } else {
          setError(
            "Failed to connect to the server. Please make sure MongoDB is running and the database is seeded."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Spin
          size="large"
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
        <span className="ml-3 text-lg">Loading dashboard data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert
          message="Dashboard Error"
          description={error}
          type="error"
          showIcon
          action={
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          }
        />
        <div className="text-center text-gray-500">
          <p>Make sure you have:</p>
          <ul className="list-disc list-inside mt-2">
            <li>MongoDB running locally on port 27017</li>
            <li>
              Run{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">
                bun run seed
              </code>{" "}
              to populate the database
            </li>
            <li>
              Check your .env.local file for correct MongoDB connection string
            </li>
          </ul>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <Alert
        message="No Data Available"
        description="Dashboard data could not be loaded."
        type="warning"
        showIcon
      />
    );
  }

  // Sample data for charts (in a real app, you'd fetch this from the API too)
  const salesData = [
    { month: "Jan", revenue: 125000, orders: 1250, customers: 890 },
    { month: "Feb", revenue: 138000, orders: 1420, customers: 920 },
    { month: "Mar", revenue: 152000, orders: 1580, customers: 1050 },
    { month: "Apr", revenue: 168000, orders: 1720, customers: 1180 },
    { month: "May", revenue: 185000, orders: 1890, customers: 1320 },
    { month: "Jun", revenue: 198000, orders: 2030, customers: 1450 },
    { month: "Jul", revenue: 212000, orders: 2180, customers: 1580 },
    { month: "Aug", revenue: 228000, orders: 2340, customers: 1720 },
    { month: "Sep", revenue: 245000, orders: 2510, customers: 1850 },
    { month: "Oct", revenue: 262000, orders: 2680, customers: 1980 },
    { month: "Nov", revenue: 285000, orders: 2920, customers: 2120 },
    { month: "Dec", revenue: 310000, orders: 3180, customers: 2280 },
  ];

  const categoryData = [
    { category: "Electronics", sales: 35, revenue: 108500, percentage: 35 },
    { category: "Fashion", sales: 28, revenue: 86800, percentage: 28 },
    { category: "Home & Garden", sales: 18, revenue: 55800, percentage: 18 },
    { category: "Sports", sales: 12, revenue: 37200, percentage: 12 },
    { category: "Beauty", sales: 7, revenue: 21700, percentage: 7 },
  ];

  const salesConfig = {
    data: salesData,
    xField: "month",
    yField: "revenue",
    seriesField: "type",
    yAxis: {
      label: {
        formatter: (v: string) => `$${(Number(v) / 1000).toFixed(0)}k`,
      },
    },
    tooltip: {
      formatter: (datum: { revenue: number }) => ({
        name: "Revenue",
        value: `$${datum.revenue.toLocaleString()}`,
      }),
    },
    color: "#3b82f6",
    smooth: true,
    lineStyle: {
      lineWidth: 3,
    },
  };

  const categoryConfig = {
    data: categoryData,
    angleField: "sales",
    colorField: "category",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name}: {percentage}",
    },
    tooltip: {
      formatter: (datum: {
        category: string;
        sales: number;
        revenue: number;
      }) => ({
        name: datum.category,
        value: `${datum.sales}% ($${datum.revenue.toLocaleString()})`,
      }),
    },
    color: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"],
  };

  const ecommerceMetrics = [
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.4%",
      trend: "up",
      color: "green",
    },
    {
      title: "Average Order Value",
      value: `$${
        stats.totalOrders > 0
          ? (stats.totalRevenue / stats.totalOrders).toFixed(2)
          : "0.00"
      }`,
      change: "+$12.40",
      trend: "up",
      color: "blue",
    },
    {
      title: "Customer Retention",
      value: "78.5%",
      change: "+2.1%",
      trend: "up",
      color: "purple",
    },
    {
      title: "Product Count",
      value: stats.totalProducts.toString(),
      change: "+5 new",
      trend: "up",
      color: "orange",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Multi-Vendor Ecommerce Dashboard (test)
        </h1>
        <p className="text-gray-600 text-lg">
          Monitor your marketplace performance, vendor activities, and business
          metrics
        </p>
        <div className="mt-2 text-sm text-green-600">
          ✅ Connected to MongoDB - Real-time data
        </div>
      </div>

      {/* Key Metrics */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <Statistic
              title="Total Revenue"
              value={stats.totalRevenue}
              precision={2}
              valueStyle={{ color: "#3b82f6", fontSize: "24px" }}
              prefix={<DollarOutlined />}
              suffix=""
            />
            <div className="text-sm text-gray-500 mt-2">
              From {stats.totalOrders} orders
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
            <Statistic
              title="Total Orders"
              value={stats.totalOrders}
              precision={0}
              valueStyle={{ color: "#10b981", fontSize: "24px" }}
              prefix={<ShoppingCartOutlined />}
            />
            <div className="text-sm text-gray-500 mt-2">
              Across {stats.totalCustomers} customers
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
            <Statistic
              title="Total Products"
              value={stats.totalProducts}
              precision={0}
              valueStyle={{ color: "#8b5cf6", fontSize: "24px" }}
              prefix={<ShopOutlined />}
            />
            <div className="text-sm text-gray-500 mt-2">Active products</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
            <Statistic
              title="Total Customers"
              value={stats.totalCustomers}
              precision={0}
              valueStyle={{ color: "#f59e0b", fontSize: "24px" }}
              prefix={<UserOutlined />}
            />
            <div className="text-sm text-gray-500 mt-2">Registered users</div>
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} lg={16}>
          <Card title="Revenue Trend" className="h-96">
            <Line {...salesConfig} height={300} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Sales by Category" className="h-96">
            <Pie {...categoryConfig} height={300} />
          </Card>
        </Col>
      </Row>

      {/* Metrics and Recent Orders */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Ecommerce Metrics" className="h-96">
            <div className="grid grid-cols-2 gap-4 h-full">
              {ecommerceMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600 text-center mb-2">
                    {metric.title}
                  </div>
                  <div
                    className={`text-xs font-medium ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metric.change}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Recent Orders">
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {stats.recentOrders.length > 0 ? (
                stats.recentOrders.map((order: Order, index: number) => (
                  <div
                    key={order._id || index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <ShoppingCartOutlined className="text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Order #{order.orderNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.status} •{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        ${order.total.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.items?.length || 0} items
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No recent orders found
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
