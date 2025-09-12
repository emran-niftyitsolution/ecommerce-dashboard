"use client";

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  ShopOutlined,
  StarOutlined,
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
// import { useRouter } from "next/navigation"; // Unused for now
import { useEffect, useState } from "react";

const { Option } = Select;

export default function VendorsPage() {
  const [loading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedVendor, setSelectedVendor] = useState<{
    name: string;
    email: string;
    phone: string;
    status: string;
  } | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const router = useRouter(); // Unused for now

  // Dynamic vendors data (will be populated from API when vendor endpoints are available)
  const [vendors, setVendors] = useState<
    Array<{
      name: string;
      email: string;
      phone: string;
      status: string;
      category: string;
      totalOrders: number;
      totalRevenue: number;
      rating: number;
      lastOrder: string;
    }>
  >([]);

  useEffect(() => {
    // TODO: Implement vendor API integration when endpoints are available
    // For now, we'll use empty array to ensure no static data
    setVendors([]);
  }, []);

  // Helper functions for UI

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "green";
      case "pending":
        return "orange";
      case "suspended":
        return "red";
      case "inactive":
        return "gray";
      default:
        return "default";
    }
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      Electronics: "blue",
      Fashion: "pink",
      "Home & Garden": "green",
      Sports: "orange",
      Beauty: "purple",
      Books: "cyan",
      Toys: "red",
      Automotive: "geekblue",
    };
    return colorMap[category] || "default";
  };

  const handleViewVendor = (vendor: {
    name: string;
    email: string;
    phone: string;
    status: string;
  }) => {
    setSelectedVendor(vendor);
    setIsModalVisible(true);
  };

  const handleEditVendor = (_vendor: {
    name: string;
    email: string;
    phone: string;
    status: string;
  }) => {
    message.info("Edit functionality would be implemented here");
  };

  const handleDeleteVendor = (vendor: {
    name: string;
    email: string;
    phone: string;
    status: string;
  }) => {
    Modal.confirm({
      title: "Delete Vendor",
      content: `Are you sure you want to delete vendor ${vendor.name}? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setVendors(vendors.filter((v) => v.key !== vendor.key));
        message.success("Vendor deleted successfully");
      },
    });
  };

  const handleStatusChange = (vendorId: string, newStatus: string) => {
    setVendors(
      vendors.map((vendor) =>
        vendor.key === vendorId ? { ...vendor, status: newStatus } : vendor
      )
    );
    message.success(`Vendor status updated to ${newStatus}`);
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      vendor.owner?.toLowerCase().includes(searchText.toLowerCase()) ||
      vendor.email?.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || vendor.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || vendor.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const columns = [
    {
      title: "Vendor",
      dataIndex: "name",
      key: "name",
      render: (
        text: string,
        record: {
          name: string;
          email: string;
          phone: string;
          status: string;
          category: string;
          totalOrders: number;
          totalRevenue: number;
          rating: number;
          lastOrder: string;
        }
      ) => (
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
            <div className="text-sm text-gray-500">{record.owner}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => (
        <Tag color={getCategoryColor(category)}>{category}</Tag>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <div className="flex items-center gap-1">
          <StarOutlined className="text-yellow-500" />
          <span className="font-medium">{rating || "N/A"}</span>
        </div>
      ),
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (products: number) => (
        <span className="font-medium text-gray-700">{products}</span>
      ),
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      render: (revenue: number) => (
        <span className="font-semibold text-green-600">
          ${revenue.toLocaleString()}
        </span>
      ),
      sorter: (a: { revenue: number }, b: { revenue: number }) =>
        a.revenue - b.revenue,
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
        { text: "Pending", value: "pending" },
        { text: "Suspended", value: "suspended" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value: string, record: { status: string }) =>
        record.status === value,
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      render: (commission: string) => (
        <span className="font-medium text-blue-600">{commission}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (
        _: unknown,
        record: { name: string; email: string; phone: string; status: string }
      ) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                icon: <EyeOutlined />,
                label: "View Details",
                onClick: () => handleViewVendor(record),
              },
              {
                key: "edit",
                icon: <EditOutlined />,
                label: "Edit Vendor",
                onClick: () => handleEditVendor(record),
              },
              {
                type: "divider",
              },
              {
                key: "delete",
                icon: <DeleteOutlined />,
                label: "Delete Vendor",
                danger: true,
                onClick: () => handleDeleteVendor(record),
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
      title: "Total Vendors",
      value: vendors.length,
      icon: <ShopOutlined />,
      color: "blue",
    },
    {
      title: "Active Vendors",
      value: vendors.filter((v) => v.status === "active").length,
      icon: <ShopOutlined />,
      color: "green",
    },
    {
      title: "Pending Approval",
      value: vendors.filter((v) => v.status === "pending").length,
      icon: <ShopOutlined />,
      color: "orange",
    },
    {
      title: "Total Revenue",
      value: `$${vendors
        .reduce((sum, v) => sum + v.revenue, 0)
        .toLocaleString()}`,
      icon: <ShopOutlined />,
      color: "purple",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Vendors Management
          </h1>
          <p className="text-gray-600">
            Manage your marketplace vendors and partnerships
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() =>
            message.info("Add vendor functionality would be implemented here")
          }
          className="bg-blue-600 hover:bg-blue-700 border-blue-600"
        >
          Add Vendor
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
                        : stat.color === "orange"
                        ? "#f59e0b"
                        : "#8b5cf6"
                    }20`,
                    color:
                      stat.color === "blue"
                        ? "#3b82f6"
                        : stat.color === "green"
                        ? "#10b981"
                        : stat.color === "orange"
                        ? "#f59e0b"
                        : "#8b5cf6",
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
              placeholder="Search vendors..."
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
              <Option value="pending">Pending</Option>
              <Option value="suspended">Suspended</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Category"
              value={categoryFilter}
              onChange={setCategoryFilter}
              className="w-full"
              allowClear
            >
              <Option value="all">All Categories</Option>
              <Option value="Electronics">Electronics</Option>
              <Option value="Fashion">Fashion</Option>
              <Option value="Home & Garden">Home & Garden</Option>
              <Option value="Sports">Sports</Option>
              <Option value="Beauty">Beauty</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Button
              icon={<FilterOutlined />}
              onClick={() => {
                setSearchText("");
                setStatusFilter("all");
                setCategoryFilter("all");
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Vendors Table */}
      <Card title={`Vendors (${filteredVendors.length})`} className="shadow-sm">
        <Table
          columns={columns}
          dataSource={filteredVendors}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} vendors`,
          }}
          size="middle"
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Vendor Details Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <ShopOutlined className="text-blue-600" />
            <span>Vendor Details - {selectedVendor?.name}</span>
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
              handleEditVendor(selectedVendor);
            }}
          >
            Edit Vendor
          </Button>,
        ]}
        width={900}
        destroyOnHidden
        centered
      >
        {selectedVendor && (
          <div className="space-y-6">
            {/* Vendor Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar
                  size={80}
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  {selectedVendor.name.charAt(0)}
                </Avatar>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedVendor.name}
                  </h3>
                  <p className="text-gray-600">{selectedVendor.description}</p>
                  <div className="flex gap-2 mt-2">
                    <Tag color={getCategoryColor(selectedVendor.category)}>
                      {selectedVendor.category}
                    </Tag>
                    <Tag color={getStatusColor(selectedVendor.status)}>
                      {selectedVendor.status.toUpperCase()}
                    </Tag>
                    {selectedVendor.featured && (
                      <Tag color="gold">Featured</Tag>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Commission Rate</div>
                <div className="text-2xl font-bold text-blue-600">
                  {selectedVendor.commission}
                </div>
              </div>
            </div>

            {/* Vendor Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-500">Owner:</span>
                    <span className="ml-2 font-medium">
                      {selectedVendor.owner}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <span className="ml-2">{selectedVendor.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <span className="ml-2">{selectedVendor.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Address:</span>
                    <span className="ml-2">{selectedVendor.address}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Business Information
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-500">Vendor ID:</span>
                    <span className="ml-2 font-mono">{selectedVendor.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Join Date:</span>
                    <span className="ml-2">{selectedVendor.joinDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Payment Method:</span>
                    <span className="ml-2">{selectedVendor.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Rating:</span>
                    <span className="ml-2">
                      ⭐ {selectedVendor.rating || "N/A"}
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
                    {selectedVendor.products}
                  </div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedVendor.orders}
                  </div>
                  <div className="text-sm text-gray-600">Orders</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    ${selectedVendor.revenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Revenue</div>
                </div>
              </div>
            </div>

            {/* Documents */}
            {selectedVendor.documents &&
              selectedVendor.documents.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Documents
                  </h3>
                  <div className="flex gap-2">
                    {selectedVendor.documents.map(
                      (doc: string, index: number) => (
                        <Tag key={index} color="blue" className="text-sm">
                          {doc}
                        </Tag>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* Status Update */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Update Vendor Status
              </h3>
              <Space>
                <Select
                  value={selectedVendor.status}
                  onChange={(value) =>
                    handleStatusChange(selectedVendor.key, value)
                  }
                  style={{ width: 150 }}
                >
                  <Option value="active">Active</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="suspended">Suspended</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
                <Button
                  type="primary"
                  icon={<ShopOutlined />}
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
