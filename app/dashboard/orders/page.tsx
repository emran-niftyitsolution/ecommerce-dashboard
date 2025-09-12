"use client";

import { apiClient } from "@/lib/api-client";
import { Order } from "@/lib/types";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  MoreOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
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
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

interface Order {
  key: string;
  id: string;
  customer: string;
  email: string;
  phone: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  shippingAddress: string;
  billingAddress: string;
  orderDate: string;
  deliveryDate: string | null;
  trackingNumber: string | null;
  vendor: string;
  notes: string;
}

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function OrdersPage() {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null
  );
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  // const router = useRouter(); // Unused for now

  // Fetch orders data from API
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.getOrders(
        pagination.current,
        pagination.pageSize
      );

      if (response.success && response.data) {
        setOrders(response.data.data || []);
        setPagination((prev) => ({
          ...prev,
          total: response.data?.pagination?.total || 0,
        }));
      } else {
        message.error(response.error || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      message.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [pagination.current, pagination.pageSize, statusFilter, dateRange]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Helper functions for UI

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "orange";
      case "processing":
        return "blue";
      case "shipped":
        return "cyan";
      case "delivered":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "default";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "green";
      case "pending":
        return "orange";
      case "failed":
        return "red";
      case "refunded":
        return "purple";
      default:
        return "default";
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleEditOrder = (_order: Order) => {
    message.info("Edit functionality would be implemented here");
  };

  const handleDeleteOrder = async (order: Order) => {
    Modal.confirm({
      title: "Delete Order",
      content: `Are you sure you want to delete order ${order.id}? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const response = await apiClient.deleteOrder(order._id);
          if (response.success) {
            message.success("Order deleted successfully");
            fetchOrders(); // Refresh the list
          } else {
            message.error(response.error || "Failed to delete order");
          }
        } catch (error) {
          console.error("Error deleting order:", error);
          message.error("Failed to delete order");
        }
      },
    });
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await apiClient.updateOrder(orderId, {
        status: newStatus,
      });
      if (response.success) {
        message.success(`Order status updated to ${newStatus}`);
        fetchOrders(); // Refresh the list
      } else {
        message.error(response.error || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error("Failed to update order status");
    }
  };

  const handleTableChange = (pagination: {
    current?: number;
    pageSize?: number;
  }) => {
    setPagination((prev) => ({
      ...prev,
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    }));
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id?.toLowerCase().includes(searchText.toLowerCase()) ||
      order.customer?.toLowerCase().includes(searchText.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      order.vendor?.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    const matchesDate =
      !dateRange ||
      (dayjs(order.orderDate).isAfter(dateRange[0], "day") &&
        dayjs(order.orderDate).isBefore(dateRange[1], "day"));

    return matchesSearch && matchesStatus && matchesDate;
  });

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => (
        <span className="font-mono font-semibold text-blue-600">{text}</span>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (text: string, record: Order) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (products: Order["products"]) => (
        <div className="max-w-xs">
          {products.map((product, index) => (
            <div key={index} className="text-sm">
              {product.quantity}x {product.name}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total: number) => (
        <span className="font-semibold text-green-600">
          ${total.toFixed(2)}
        </span>
      ),
      sorter: (a: Order, b: Order) => a.total - b.total,
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
        { text: "Pending", value: "pending" },
        { text: "Processing", value: "processing" },
        { text: "Shipped", value: "shipped" },
        { text: "Delivered", value: "delivered" },
        { text: "Cancelled", value: "cancelled" },
      ],
      onFilter: (value: string | number | boolean, record: Order) =>
        record.status === value,
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string, record: Order) => (
        <div>
          <Tag color={getPaymentStatusColor(status)} className="capitalize">
            {status}
          </Tag>
          <div className="text-xs text-gray-500 mt-1">
            {record.paymentMethod}
          </div>
        </div>
      ),
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      render: (vendor: string) => (
        <Tag color="blue" className="font-medium">
          {vendor}
        </Tag>
      ),
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date: string) => (
        <div className="text-sm">
          {dayjs(date).format("MMM DD, YYYY")}
          <div className="text-xs text-gray-500">
            {dayjs(date).format("HH:mm")}
          </div>
        </div>
      ),
      sorter: (a: Order, b: Order) =>
        dayjs(a.orderDate).unix() - dayjs(b.orderDate).unix(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Order) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                icon: <EyeOutlined />,
                label: "View Details",
                onClick: () => handleViewOrder(record),
              },
              {
                key: "edit",
                icon: <EditOutlined />,
                label: "Edit Order",
                onClick: () => handleEditOrder(record),
              },
              {
                type: "divider",
              },
              {
                key: "delete",
                icon: <DeleteOutlined />,
                label: "Delete Order",
                danger: true,
                onClick: () => handleDeleteOrder(record),
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage and track customer orders</p>
        </div>
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          className="bg-blue-600 hover:bg-blue-700 border-blue-600"
        >
          Create Order
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-sm">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Search orders..."
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
              <Option value="pending">Pending</Option>
              <Option value="processing">Processing</Option>
              <Option value="shipped">Shipped</Option>
              <Option value="delivered">Delivered</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <RangePicker
              placeholder={["Start Date", "End Date"]}
              value={dateRange}
              onChange={(dates) =>
                setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)
              }
              className="w-full"
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Button
              icon={<FilterOutlined />}
              onClick={() => {
                setSearchText("");
                setStatusFilter("all");
                setDateRange(null);
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Orders Table */}
      <Card title={`Orders (${filteredOrders.length})`} className="shadow-sm">
        <Table
          columns={columns}
          dataSource={filteredOrders}
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} orders`,
          }}
          onChange={handleTableChange}
          size="middle"
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Order Details Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <ShoppingCartOutlined className="text-blue-600" />
            <span>Order Details - {selectedOrder?.id}</span>
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
              handleEditOrder(selectedOrder);
            }}
          >
            Edit Order
          </Button>,
        ]}
        width={900}
        destroyOnHidden
        centered
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-500">Order Status</div>
                <Tag color={getStatusColor(selectedOrder.status)}>
                  {selectedOrder.status.toUpperCase()}
                </Tag>
              </div>
              <div>
                <div className="text-sm text-gray-500">Payment Status</div>
                <Tag color={getPaymentStatusColor(selectedOrder.paymentStatus)}>
                  {selectedOrder.paymentStatus.toUpperCase()}
                </Tag>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Total Amount</div>
                <div className="text-2xl font-bold text-green-600">
                  ${selectedOrder.total.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Customer Information
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-500">Name:</span>
                    <span className="ml-2 font-medium">
                      {selectedOrder.customer}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <span className="ml-2">{selectedOrder.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <span className="ml-2">{selectedOrder.phone}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Order Information
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-500">Order ID:</span>
                    <span className="ml-2 font-mono">{selectedOrder.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Order Date:</span>
                    <span className="ml-2">
                      {dayjs(selectedOrder.orderDate).format(
                        "MMM DD, YYYY HH:mm"
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Vendor:</span>
                    <span className="ml-2">
                      <Tag color="blue">{selectedOrder.vendor}</Tag>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Products
              </h3>
              <div className="border border-gray-200 rounded-lg">
                {selectedOrder.products.map(
                  (
                    product: { name: string; price: number; quantity: number },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className={`p-4 ${
                        index !== selectedOrder.products.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            Quantity: {product.quantity}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">
                            ${(product.price * product.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            ${product.price.toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Shipping & Billing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Shipping Address
                </h3>
                <div className="p-3 bg-gray-50 rounded-lg">
                  {selectedOrder.shippingAddress}
                </div>
                {selectedOrder.trackingNumber && (
                  <div className="mt-3">
                    <span className="text-gray-500">Tracking:</span>
                    <span className="ml-2 font-mono text-blue-600">
                      {selectedOrder.trackingNumber}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Billing Address
                </h3>
                <div className="p-3 bg-gray-50 rounded-lg">
                  {selectedOrder.billingAddress}
                </div>
                <div className="mt-3">
                  <span className="text-gray-500">Payment Method:</span>
                  <span className="ml-2 font-medium">
                    {selectedOrder.paymentMethod}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            {selectedOrder.notes && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Notes
                </h3>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  {selectedOrder.notes}
                </div>
              </div>
            )}

            {/* Status Update */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Update Order Status
              </h3>
              <Space>
                <Select
                  value={selectedOrder.status}
                  onChange={(value) =>
                    handleStatusChange(selectedOrder.key, value)
                  }
                  style={{ width: 150 }}
                >
                  <Option value="pending">Pending</Option>
                  <Option value="processing">Processing</Option>
                  <Option value="shipped">Shipped</Option>
                  <Option value="delivered">Delivered</Option>
                  <Option value="cancelled">Cancelled</Option>
                </Select>
                <Button
                  type="primary"
                  icon={<TruckOutlined />}
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
