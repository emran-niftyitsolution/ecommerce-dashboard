"use client";

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Search } = Input;
const { Option } = Select;

export default function ProductsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [vendorFilter, setVendorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [products, setProducts] = useState([
    {
      key: "1",
      id: "PROD-001",
      name: "Wireless Bluetooth Headphones",
      vendor: "TechCorp",
      category: "Electronics",
      price: 89.99,
      stock: 45,
      status: "active",
      rating: 4.8,
      sales: 156,
      revenue: 14038.44,
      image: "🎧",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop",
      ],
      description:
        "High-quality wireless headphones with noise cancellation technology. Features include 30-hour battery life, premium sound quality, and comfortable over-ear design.",
      sku: "WH-001",
      weight: "0.3kg",
      dimensions: "20x15x8cm",
      colors: ["Black", "White", "Blue"],
      warranty: "2 years",
      shipping: "Free shipping",
      returnPolicy: "30-day return policy",
    },
    {
      key: "2",
      id: "PROD-002",
      name: "Smart Fitness Watch",
      vendor: "TechCorp",
      category: "Electronics",
      price: 199.99,
      stock: 23,
      status: "active",
      rating: 4.6,
      sales: 98,
      revenue: 19599.02,
      image: "⌚",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
      ],
      description:
        "Advanced fitness tracking smartwatch with heart rate monitor, GPS tracking, and 7-day battery life. Water-resistant and compatible with iOS and Android.",
      sku: "SFW-002",
      weight: "0.05kg",
      dimensions: "4x4x1cm",
      colors: ["Black", "Silver", "Rose Gold"],
      warranty: "1 year",
      shipping: "Free shipping",
      returnPolicy: "30-day return policy",
    },
    {
      key: "3",
      id: "PROD-003",
      name: "Professional Running Shoes",
      vendor: "SportMax",
      category: "Sports",
      price: 129.99,
      stock: 67,
      status: "active",
      rating: 4.7,
      sales: 87,
      revenue: 11309.13,
      image: "👟",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      ],
      description:
        "Professional-grade running shoes designed for athletes. Features lightweight design, superior cushioning, and excellent traction for all weather conditions.",
      sku: "PRS-003",
      weight: "0.8kg",
      dimensions: "30x25x15cm",
      colors: ["White", "Black", "Red"],
      warranty: "6 months",
      shipping: "Free shipping",
      returnPolicy: "30-day return policy",
    },
    {
      key: "4",
      id: "PROD-004",
      name: "Premium Coffee Maker",
      vendor: "HomeStyle",
      category: "Home & Garden",
      price: 299.99,
      stock: 12,
      status: "active",
      rating: 4.9,
      sales: 76,
      revenue: 22799.24,
      image: "☕",
      description: "Automatic coffee maker with programmable settings",
      sku: "PCM-004",
      weight: "2.5kg",
      dimensions: "35x25x40cm",
    },
    {
      key: "5",
      id: "PROD-005",
      name: "Yoga Mat Premium",
      vendor: "SportMax",
      category: "Sports",
      price: 29.99,
      stock: 89,
      status: "active",
      rating: 4.5,
      sales: 65,
      revenue: 1949.35,
      image: "🧘",
      description: "Non-slip yoga mat with carrying strap",
      sku: "YMP-005",
      weight: "1.2kg",
      dimensions: "180x60x0.5cm",
    },
  ]);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Beauty",
    "Books",
    "Toys",
    "Automotive",
  ];

  const vendors = [
    "TechCorp",
    "SportMax",
    "HomeStyle",
    "FashionHub",
    "BeautyCare",
    "BookWorld",
    "ToyLand",
    "AutoParts",
  ];

  const columns = [
    {
      title: "Product",
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
            {record.image}
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{text}</div>
            <div className="text-sm text-gray-500">{record.vendor}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => {
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
        return <Tag color={colorMap[category]}>{category}</Tag>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <span className="font-semibold text-green-600">${price}</span>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number) => (
        <span
          className={`font-medium ${
            stock < 20
              ? "text-red-600"
              : stock < 50
              ? "text-orange-600"
              : "text-green-600"
          }`}
        >
          {stock}
        </span>
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
    },
    {
      title: "Sales",
      dataIndex: "sales",
      key: "sales",
      render: (sales: number) => <span className="text-gray-700">{sales}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          status={status === "active" ? "success" : "default"}
          text={<span className="capitalize text-gray-700">{status}</span>}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: any) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleViewProduct(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Product">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEditProduct(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Product">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDeleteProduct(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setSelectedImageIndex(0);
    setIsModalVisible(true);
  };

  const handleEditProduct = (product: any) => {
    router.push(`/dashboard/products/edit/${product.id}`);
  };

  const handleDeleteProduct = (product: any) => {
    Modal.confirm({
      title: "Delete Product",
      content: `Are you sure you want to delete ${product.name}? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== product.id)
        );
        message.success(`Product ${product.name} deleted successfully`);
      },
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesVendor =
      vendorFilter === "all" || product.vendor === vendorFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesVendor && matchesStatus;
  });

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: <ShoppingCartOutlined />,
      color: "blue",
    },
    {
      title: "Active Products",
      value: products.filter((p) => p.status === "active").length,
      icon: <ShoppingCartOutlined />,
      color: "green",
    },
    {
      title: "Low Stock",
      value: products.filter((p) => p.stock < 20).length,
      icon: <ShoppingCartOutlined />,
      color: "orange",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Products Management
          </h1>
          <p className="text-gray-600">
            Manage your product catalog and inventory
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => router.push("/dashboard/products/create")}
          className="bg-blue-600 hover:bg-blue-700 border-blue-600"
        >
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-6">
        {stats.map((stat, index) => (
          <Col xs={24} sm={8} key={index}>
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
                        : "#f59e0b"
                    }20`,
                    color:
                      stat.color === "blue"
                        ? "#3b82f6"
                        : stat.color === "green"
                        ? "#10b981"
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

      {/* Filters and Search */}
      <Card className="mb-6">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <Search
              placeholder="Search products..."
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col xs={24} sm={4}>
            <Select
              placeholder="Category"
              value={categoryFilter}
              onChange={setCategoryFilter}
              className="w-full"
            >
              <Option value="all">All Categories</Option>
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={4}>
            <Select
              placeholder="Vendor"
              value={vendorFilter}
              onChange={setVendorFilter}
              className="w-full"
            >
              <Option value="all">All Vendors</Option>
              {vendors.map((vendor) => (
                <Option key={vendor} value={vendor}>
                  {vendor}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={4}>
            <Select
              placeholder="Status"
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full"
            >
              <Option value="all">All Status</Option>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Col>
          <Col xs={24} sm={4} className="text-right">
            <Space>
              <Button
                icon={<FilterOutlined />}
                onClick={() => {
                  setSearchText("");
                  setCategoryFilter("all");
                  setVendorFilter("all");
                  setStatusFilter("all");
                }}
              >
                Clear Filters
              </Button>
              <Button type="primary">Export</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Products Table */}
      <Card title={`Products (${filteredProducts.length})`}>
        <Table
          columns={columns}
          dataSource={filteredProducts}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} products`,
          }}
          size="middle"
        />
      </Card>

      {/* Product Details Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <ShoppingCartOutlined className="text-blue-600" />
            <span>Product Details</span>
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
              handleEditProduct(selectedProduct);
            }}
          >
            Edit Product
          </Button>,
        ]}
        width={900}
        destroyOnHidden
        centered
      >
        {selectedProduct && (
          <div className="space-y-6">
            {/* Product Header */}
            <div className="flex items-start gap-6">
              {/* Main Product Image */}
              <div className="w-80 h-80 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={
                    selectedProduct.images?.[selectedImageIndex] ||
                    selectedProduct.image
                  }
                  alt={selectedProduct.name}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320"><rect width="320" height="320" fill="%23f3f4f6"/><text x="160" y="160" font-family="Arial" font-size="24" fill="%236b7280" text-anchor="middle" dy=".3em">${selectedProduct.image}</text></svg>`;
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedProduct.name}
                  </h2>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      <StarOutlined className="text-yellow-500" />
                      <span className="font-medium">
                        {selectedProduct.rating}
                      </span>
                      <span className="text-gray-500">
                        ({selectedProduct.sales} reviews)
                      </span>
                    </div>
                    <Tag color="blue">{selectedProduct.category}</Tag>
                    <Badge
                      status={
                        selectedProduct.status === "active"
                          ? "success"
                          : "default"
                      }
                      text={selectedProduct.status}
                    />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Price and Stock */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-green-600">
                      ${selectedProduct.price}
                    </div>
                    <div className="text-sm text-gray-500">
                      SKU: {selectedProduct.sku}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Stock:</span>
                      <span
                        className={`font-medium ${
                          selectedProduct.stock < 20
                            ? "text-red-600"
                            : selectedProduct.stock < 50
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}
                      >
                        {selectedProduct.stock} units
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {selectedProduct.id}
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">
                      {selectedProduct.sales}
                    </div>
                    <div className="text-xs text-gray-500">Total Sales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">
                      ${selectedProduct.revenue.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">
                      {selectedProduct.vendor}
                    </div>
                    <div className="text-xs text-gray-500">Vendor</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            {selectedProduct.images && selectedProduct.images.length > 1 && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Product Images
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {selectedProduct.images.map(
                    (image: string, index: number) => (
                      <div
                        key={index}
                        className={`w-20 h-20 rounded-lg overflow-visible cursor-pointer border-2 transition-all ${
                          selectedImageIndex === index
                            ? "border-blue-500"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <Image
                          src={image}
                          alt={`${selectedProduct.name} - Image ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="%23f3f4f6"/><text x="40" y="40" font-family="Arial" font-size="12" fill="%236b7280" text-anchor="middle" dy=".3em">Image ${
                              index + 1
                            }</text></svg>`;
                          }}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Product Details Grid */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Product Specifications
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Weight
                  </label>
                  <p className="text-gray-900 font-medium">
                    {selectedProduct.weight}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Dimensions
                  </label>
                  <p className="text-gray-900 font-medium">
                    {selectedProduct.dimensions}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Warranty
                  </label>
                  <p className="text-gray-900 font-medium">
                    {selectedProduct.warranty || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Shipping
                  </label>
                  <p className="text-gray-900 font-medium">
                    {selectedProduct.shipping || "Standard"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Return Policy
                  </label>
                  <p className="text-gray-900 font-medium">
                    {selectedProduct.returnPolicy || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Colors
                  </label>
                  <div className="flex gap-2 mt-1">
                    {selectedProduct.colors?.map(
                      (color: string, index: number) => (
                        <Tag key={index} color="blue" className="text-xs">
                          {color}
                        </Tag>
                      )
                    ) || <span className="text-gray-500">N/A</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
