"use client";

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Option } = Select;

export default function CustomersPage() {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  // Mock customers data
  const [customers, setCustomers] = useState([
    {
      key: "1",
      id: "CUST-001",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      tier: "gold",
      totalOrders: 45,
      totalSpent: 12500.5,
      lastOrder: "2024-01-15",
      joinDate: "2022-03-15",
      address: "123 Main St, New York, NY 10001",
      favoriteCategories: ["Electronics", "Sports"],
      avgOrderValue: 277.79,
      lifetimeValue: 12500.5,
      reviews: 12,
      rating: 4.8,
      tags: ["VIP", "Early Adopter"],
    },
    {
      key: "2",
      id: "CUST-002",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 987-6543",
      status: "active",
      tier: "silver",
      totalOrders: 28,
      totalSpent: 8900.75,
      lastOrder: "2024-01-18",
      joinDate: "2022-06-20",
      address: "456 Oak Ave, Los Angeles, CA 90210",
      favoriteCategories: ["Fashion", "Beauty"],
      avgOrderValue: 317.88,
      lifetimeValue: 8900.75,
      reviews: 8,
      rating: 4.6,
      tags: ["Fashionista"],
    },
    {
      key: "3",
      id: "CUST-003",
      name: "Mike Wilson",
      email: "mike.w@email.com",
      phone: "+1 (555) 456-7890",
      status: "active",
      tier: "platinum",
      totalOrders: 67,
      totalSpent: 18900.25,
      lastOrder: "2024-01-20",
      joinDate: "2021-11-10",
      address: "789 Pine St, Chicago, IL 60601",
      favoriteCategories: ["Home & Garden", "Electronics"],
      avgOrderValue: 282.09,
      lifetimeValue: 18900.25,
      reviews: 23,
      rating: 4.9,
      tags: ["VIP", "Power User", "Early Adopter"],
    },
    {
      key: "4",
      id: "CUST-004",
      name: "Emily Davis",
      email: "emily.d@email.com",
      phone: "+1 (555) 321-0987",
      status: "inactive",
      tier: "bronze",
      totalOrders: 8,
      totalSpent: 1200.0,
      lastOrder: "2023-08-15",
      joinDate: "2023-01-15",
      address: "321 Elm St, Miami, FL 33101",
      favoriteCategories: ["Beauty"],
      avgOrderValue: 150.0,
      lifetimeValue: 1200.0,
      reviews: 3,
      rating: 4.3,
      tags: ["New Customer"],
    },
    {
      key: "5",
      id: "CUST-005",
      name: "David Brown",
      email: "david.b@email.com",
      phone: "+1 (555) 654-3210",
      status: "active",
      tier: "gold",
      totalOrders: 52,
      totalSpent: 15600.8,
      lastOrder: "2024-01-22",
      joinDate: "2022-01-20",
      address: "654 Maple Dr, Seattle, WA 98101",
      favoriteCategories: ["Electronics", "Gaming"],
      avgOrderValue: 300.02,
      lifetimeValue: 15600.8,
      reviews: 18,
      rating: 4.7,
      tags: ["VIP", "Tech Enthusiast"],
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "green";
      case "inactive":
        return "red";
      case "suspended":
        return "orange";
      default:
        return "default";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "purple";
      case "gold":
        return "gold";
      case "silver":
        return "silver";
      case "bronze":
        return "orange";
      default:
        return "default";
    }
  };

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setIsModalVisible(true);
  };

  const handleEditCustomer = (customer: any) => {
    message.info("Edit functionality would be implemented here");
  };

  const handleDeleteCustomer = (customer: any) => {
    Modal.confirm({
      title: "Delete Customer",
      content: `Are you sure you want to delete customer ${customer.name}? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setCustomers(customers.filter((c) => c.key !== customer.key));
        message.success("Customer deleted successfully");
      },
    });
  };

  const handleStatusChange = (customerId: string, newStatus: string) => {
    setCustomers(
      customers.map((customer) =>
        customer.key === customerId
          ? { ...customer, status: newStatus }
          : customer
      )
    );
    message.success(`Customer status updated to ${newStatus}`);
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    const matchesTier = tierFilter === "all" || customer.tier === tierFilter;

    return matchesSearch && matchesStatus && matchesTier;
  });

  const columns = [
    {
      title: "Customer",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div className="flex items-center gap-3">
          <Avatar
            size={40}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            {record.name.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{text}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Tier",
      dataIndex: "tier",
      key: "tier",
      render: (tier: string) => (
        <Tag color={getTierColor(tier)} className="capitalize font-medium">
          {tier}
        </Tag>
      ),
    },
    {
      title: "Orders",
      dataIndex: "totalOrders",
      key: "totalOrders",
      render: (orders: number) => (
        <div className="flex items-center gap-2">
          <ShoppingCartOutlined className="text-blue-500" />
          <span className="font-medium">{orders}</span>
        </div>
      ),
      sorter: (a: any, b: any) => a.totalOrders - b.totalOrders,
    },
    {
      title: "Total Spent",
      dataIndex: "totalSpent",
      key: "totalSpent",
      render: (amount: number) => (
        <span className="font-semibold text-green-600">
          ${amount.toLocaleString()}
        </span>
      ),
      sorter: (a: any, b: any) => a.totalSpent - b.totalSpent,
    },
    {
      title: "Avg Order",
      dataIndex: "avgOrderValue",
      key: "avgOrderValue",
      render: (amount: number) => (
        <span className="font-medium text-gray-700">${amount.toFixed(2)}</span>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <div className="flex items-center gap-1">
          <StarOutlined className="text-yellow-500" />
          <span className="font-medium">{rating}</span>
        </div>
      ),
      sorter: (a: any, b: any) => a.rating - b.rating,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)} className="capitalize">
          {status}
        </Tag>
      ),
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
        { text: "Suspended", value: "suspended" },
      ],
      onFilter: (value: string, record: any) => record.status === value,
    },
    {
      title: "Last Order",
      dataIndex: "lastOrder",
      key: "lastOrder",
      render: (date: string) => (
        <span className="text-sm text-gray-600">{date}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                icon: <EyeOutlined />,
                label: "View Details",
                onClick: () => handleViewCustomer(record),
              },
              {
                key: "edit",
                icon: <EditOutlined />,
                label: "Edit Customer",
                onClick: () => handleEditCustomer(record),
              },
              {
                type: "divider",
              },
              {
                key: "delete",
                icon: <DeleteOutlined />,
                label: "Delete Customer",
                danger: true,
                onClick: () => handleDeleteCustomer(record),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const stats = [
    {
      title: "Total Customers",
      value: customers.length,
      icon: <UserOutlined />,
      color: "blue",
    },
    {
      title: "Active Customers",
      value: customers.filter((c) => c.status === "active").length,
      icon: <UserOutlined />,
      color: "green",
    },
    {
      title: "VIP Customers",
      value: customers.filter((c) => c.tier === "platinum" || c.tier === "gold")
        .length,
      icon: <UserOutlined />,
      color: "purple",
    },
    {
      title: "Total Revenue",
      value: `$${customers
        .reduce((sum, c) => sum + c.totalSpent, 0)
        .toLocaleString()}`,
      icon: <UserOutlined />,
      color: "orange",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Customer Management
          </h1>
          <p className="text-gray-600">
            Manage your customer base and loyalty programs
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() =>
            message.info("Add customer functionality would be implemented here")
          }
          className="bg-blue-600 hover:bg-blue-700 border-blue-600"
        >
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-6">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${
                      stat.color === "blue"
                        ? "#3b82f6"
                        : stat.color === "green"
                        ? "#10b981"
                        : stat.color === "purple"
                        ? "#8b5cf6"
                        : "#f59e0b"
                    }20`,
                    color:
                      stat.color === "blue"
                        ? "#3b82f6"
                        : stat.color === "green"
                        ? "#10b981"
                        : stat.color === "purple"
                        ? "#8b5cf6"
                        : "#f59e0b",
                  }}
                >
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.title}</div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Filters */}
      <Card className="shadow-sm">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Search customers..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Status"
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full"
              allowClear
            >
              <Option value="all">All Statuses</Option>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="suspended">Suspended</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Tier"
              value={tierFilter}
              onChange={setTierFilter}
              className="w-full"
              allowClear
            >
              <Option value="all">All Tiers</Option>
              <Option value="platinum">Platinum</Option>
              <Option value="gold">Gold</Option>
              <Option value="silver">Silver</Option>
              <Option value="bronze">Bronze</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Button
              icon={<FilterOutlined />}
              onClick={() => {
                setSearchText("");
                setStatusFilter("all");
                setTierFilter("all");
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Customers Table */}
      <Card
        title={`Customers (${filteredCustomers.length})`}
        className="shadow-sm"
      >
        <Table
          columns={columns}
          dataSource={filteredCustomers}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} customers`,
          }}
          size="middle"
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Customer Details Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <UserOutlined className="text-blue-600" />
            <span>Customer Details - {selectedCustomer?.name}</span>
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsModalVisible(false);
              handleEditCustomer(selectedCustomer);
            }}
          >
            Edit Customer
          </Button>,
        ]}
        width={900}
        destroyOnClose
        centered
      >
        {selectedCustomer && (
          <div className="space-y-6">
            {/* Customer Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar
                  size={80}
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  {selectedCustomer.name.charAt(0)}
                </Avatar>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedCustomer.name}
                  </h3>
                  <p className="text-gray-600">{selectedCustomer.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Tag color={getTierColor(selectedCustomer.tier)}>
                      {selectedCustomer.tier.toUpperCase()}
                    </Tag>
                    <Tag color={getStatusColor(selectedCustomer.status)}>
                      {selectedCustomer.status.toUpperCase()}
                    </Tag>
                    {selectedCustomer.tags.map((tag: string, index: number) => (
                      <Tag key={index} color="blue" className="text-xs">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Lifetime Value</div>
                <div className="text-2xl font-bold text-green-600">
                  ${selectedCustomer.lifetimeValue.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-500">Customer ID:</span>
                    <span className="ml-2 font-mono">
                      {selectedCustomer.id}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <span className="ml-2">{selectedCustomer.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Address:</span>
                    <span className="ml-2">{selectedCustomer.address}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Join Date:</span>
                    <span className="ml-2">{selectedCustomer.joinDate}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Shopping Behavior
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-500">Total Orders:</span>
                    <span className="ml-2 font-medium">
                      {selectedCustomer.totalOrders}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Average Order Value:</span>
                    <span className="ml-2 font-medium">
                      ${selectedCustomer.avgOrderValue.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Order:</span>
                    <span className="ml-2">{selectedCustomer.lastOrder}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Reviews:</span>
                    <span className="ml-2">
                      {selectedCustomer.reviews} (⭐ {selectedCustomer.rating})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Performance Metrics
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedCustomer.totalOrders}
                  </div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    ${selectedCustomer.totalSpent.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    ${selectedCustomer.avgOrderValue.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Avg Order</div>
                </div>
              </div>
            </div>

            {/* Favorite Categories */}
            {selectedCustomer.favoriteCategories &&
              selectedCustomer.favoriteCategories.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Favorite Categories
                  </h3>
                  <div className="flex gap-2">
                    {selectedCustomer.favoriteCategories.map(
                      (category: string, index: number) => (
                        <Tag key={index} color="green" className="text-sm">
                          {category}
                        </Tag>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* Status Update */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Update Customer Status
              </h3>
              <Space>
                <Select
                  value={selectedCustomer.status}
                  onChange={(value) =>
                    handleStatusChange(selectedCustomer.key, value)
                  }
                  style={{ width: 150 }}
                >
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                  <Option value="suspended">Suspended</Option>
                </Select>
                <Button
                  type="primary"
                  icon={<UserOutlined />}
                  className="bg-blue-600 hover:bg-blue-700 border-blue-600"
                >
                  Update Status
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
