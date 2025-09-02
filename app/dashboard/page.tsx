"use client";

import {
  DollarOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Column, Line, Pie } from "@ant-design/plots";
import { Card, Col, Row, Statistic } from "antd";

export default function DashboardPage() {
  // Ecommerce-specific data
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

  const vendorPerformance = [
    {
      vendor: "TechCorp",
      revenue: 125000,
      orders: 1250,
      rating: 4.8,
      products: 89,
    },
    {
      vendor: "FashionHub",
      revenue: 98000,
      orders: 980,
      rating: 4.6,
      products: 156,
    },
    {
      vendor: "HomeStyle",
      revenue: 87000,
      orders: 870,
      rating: 4.7,
      products: 234,
    },
    {
      vendor: "SportMax",
      revenue: 72000,
      orders: 720,
      rating: 4.5,
      products: 67,
    },
    {
      vendor: "BeautyCare",
      revenue: 58000,
      orders: 580,
      rating: 4.4,
      products: 123,
    },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Smith",
      amount: 299.99,
      status: "delivered",
      vendor: "TechCorp",
      date: "2 hours ago",
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      amount: 189.5,
      status: "shipped",
      vendor: "FashionHub",
      date: "4 hours ago",
    },
    {
      id: "ORD-003",
      customer: "Mike Wilson",
      amount: 450.0,
      status: "processing",
      vendor: "HomeStyle",
      date: "6 hours ago",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      amount: 129.99,
      status: "pending",
      vendor: "SportMax",
      date: "8 hours ago",
    },
    {
      id: "ORD-005",
      customer: "David Brown",
      amount: 899.99,
      status: "delivered",
      vendor: "TechCorp",
      date: "12 hours ago",
    },
  ];

  const topProducts = [
    {
      name: "Wireless Bluetooth Headphones",
      vendor: "TechCorp",
      sales: 156,
      revenue: 14038.44,
      rating: 4.8,
    },
    {
      name: "Smart Fitness Watch",
      vendor: "TechCorp",
      sales: 98,
      revenue: 19599.02,
      rating: 4.6,
    },
    {
      name: "Professional Running Shoes",
      vendor: "SportMax",
      sales: 87,
      revenue: 11309.13,
      rating: 4.7,
    },
    {
      name: "Premium Coffee Maker",
      vendor: "HomeStyle",
      sales: 76,
      revenue: 22799.24,
      rating: 4.9,
    },
    {
      name: "Designer Handbag",
      vendor: "FashionHub",
      sales: 65,
      revenue: 19499.35,
      rating: 4.5,
    },
  ];

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
      value: "$156.80",
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
      title: "Vendor Satisfaction",
      value: "4.6/5",
      change: "+0.2",
      trend: "up",
      color: "orange",
    },
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
      formatter: (datum: any) => ({
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
      formatter: (datum: any) => ({
        name: datum.category,
        value: `${datum.sales}% ($${datum.revenue.toLocaleString()})`,
      }),
    },
    color: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"],
  };

  const vendorConfig = {
    data: vendorPerformance,
    xField: "vendor",
    yField: "revenue",
    seriesField: "vendor",
    yAxis: {
      label: {
        formatter: (v: string) => `$${(Number(v) / 1000).toFixed(0)}k`,
      },
    },
    tooltip: {
      formatter: (datum: any) => ({
        name: "Revenue",
        value: `$${datum.revenue.toLocaleString()}`,
      }),
    },
    color: "#10b981",
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Multi-Vendor Ecommerce Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Monitor your marketplace performance, vendor activities, and business
          metrics
        </p>
      </div>

      {/* Key Metrics */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <Statistic
              title="Total Revenue"
              value={3100000}
              precision={0}
              valueStyle={{ color: "#3b82f6", fontSize: "24px" }}
              prefix={<DollarOutlined />}
              suffix=""
            />
            <div className="text-sm text-gray-500 mt-2">
              +12.5% from last month
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
            <Statistic
              title="Total Orders"
              value={31800}
              precision={0}
              valueStyle={{ color: "#10b981", fontSize: "24px" }}
              prefix={<ShoppingCartOutlined />}
            />
            <div className="text-sm text-gray-500 mt-2">
              +8.3% from last month
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
            <Statistic
              title="Active Vendors"
              value={156}
              precision={0}
              valueStyle={{ color: "#8b5cf6", fontSize: "24px" }}
              prefix={<ShopOutlined />}
            />
            <div className="text-sm text-gray-500 mt-2">+5 new this month</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
            <Statistic
              title="Total Customers"
              value={22800}
              precision={0}
              valueStyle={{ color: "#f59e0b", fontSize: "24px" }}
              prefix={<UserOutlined />}
            />
            <div className="text-sm text-gray-500 mt-2">
              +15.2% from last month
            </div>
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

      {/* Vendor Performance */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} lg={12}>
          <Card title="Top Vendor Performance" className="h-96">
            <Column {...vendorConfig} height={300} />
          </Card>
        </Col>
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
      </Row>

      {/* Recent Orders & Top Products */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Recent Orders">
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShoppingCartOutlined className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {order.customer}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.vendor}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">
                      ${order.amount}
                    </div>
                    <div className="text-xs text-gray-500">{order.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Top Products">
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.vendor}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">
                      ${product.revenue.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {product.sales} sales • ⭐ {product.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
