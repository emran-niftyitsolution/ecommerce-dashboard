"use client";

import { apiClient } from "@/lib/api-client";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LoadingOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
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
  Spin,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const { Search } = Input;
const { Option } = Select;

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Fetch users from API
  const fetchUsers = useCallback(
    async (page = 1, search = "") => {
      try {
        setLoading(true);
        const response = await apiClient.getUsers(
          page,
          pagination.pageSize,
          search
        );

        console.log("Users API Response:", response);

        if (response.success) {
          // Handle the response data - it could be an array directly or nested
          const usersData = Array.isArray(response.data)
            ? response.data
            : response.data?.data || [];
          console.log("Processed users data:", usersData);
          setUsers(usersData);
          setPagination((prev) => ({
            ...prev,
            current: page,
            total: response.pagination?.total || response.data?.total || 0,
          }));

          if (usersData.length === 0 && page === 1) {
            message.info(
              "No users found. Try creating a new user or check if the database is seeded."
            );
          }
        } else {
          message.error(response.error || "Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        message.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    },
    [pagination.pageSize]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns = [
    {
      title: "User",
      dataIndex: "firstName",
      key: "user",
      render: (firstName: string, record: User) => (
        <div className="flex items-center gap-3">
          <Avatar
            size={40}
            className="rounded-full"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            }}
          >
            {firstName.charAt(0).toUpperCase()}
            {record.lastName.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">
              {firstName} {record.lastName}
            </div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        const colors = {
          admin: "red",
          manager: "blue",
          user: "green",
        };
        return (
          <Tag color={colors[role as keyof typeof colors] || "default"}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      render: (isActive: boolean) => (
        <Badge
          status={isActive ? "success" : "error"}
          text={isActive ? "Active" : "Inactive"}
        />
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <span className="text-gray-500 text-sm">
          {new Date(date).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleViewUser(record)}
            />
          </Tooltip>
          <Tooltip title="Edit User">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEditUser(record)}
            />
          </Tooltip>
          <Tooltip
            title={record.isActive ? "Deactivate User" : "Activate User"}
          >
            <Button
              type="text"
              icon={<UserSwitchOutlined />}
              size="small"
              onClick={() => handleStatusToggle(record)}
              style={{
                color: record.isActive ? "#ff4d4f" : "#52c41a",
              }}
            />
          </Tooltip>
          <Tooltip title="Delete User">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDeleteUser(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleEditUser = (user: User) => {
    router.push(`/dashboard/users/edit/${user._id}`);
  };

  const handleDeleteUser = async (user: User) => {
    Modal.confirm({
      title: "Delete User",
      content: `Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          const response = await apiClient.deleteUser(user._id);
          if (response.success) {
            message.success(
              `User ${user.firstName} ${user.lastName} deleted successfully`
            );
            fetchUsers(pagination.current, searchText);
          } else {
            message.error(response.error || "Failed to delete user");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          message.error("Failed to delete user");
        }
      },
    });
  };

  const handleStatusToggle = async (user: User) => {
    try {
      const response = await apiClient.updateUser(user._id, {
        isActive: !user.isActive,
      });

      if (response.success) {
        message.success(
          `User ${user.firstName} ${user.lastName} status updated to ${
            !user.isActive ? "active" : "inactive"
          }`
        );
        fetchUsers(pagination.current, searchText);
      } else {
        message.error(response.error || "Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      message.error("Failed to update user status");
    }
  };

  const handleRefresh = () => {
    fetchUsers(pagination.current, searchText);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    fetchUsers(1, value);
  };

  const handleTableChange = (pagination: {
    current: number;
    pageSize: number;
  }) => {
    fetchUsers(pagination.current, searchText);
  };

  const handleFilterChange = () => {
    // Refresh data when filters change
    fetchUsers(1, searchText);
  };

  // Client-side filtering for status and role (since API doesn't support these filters yet)
  const filteredUsers = users.filter((user) => {
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesStatus && matchesRole;
  });

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: <TeamOutlined />,
      color: "blue",
    },
    {
      title: "Active Users",
      value: users.filter((u) => u.isActive).length,
      icon: <UserAddOutlined />,
      color: "green",
    },
    {
      title: "Inactive Users",
      value: users.filter((u) => !u.isActive).length,
      icon: <TeamOutlined />,
      color: "orange",
    },
  ];

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Spin
            size="large"
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
          />
          <div className="mt-4 text-gray-600">Loading users...</div>
        </div>
      </div>
    );
  }

  // Debug info
  console.log("Current users state:", users);
  console.log("Current pagination state:", pagination);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            User Management
          </h1>
          <p className="text-gray-600">
            Manage your team members and user accounts
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            icon={<ReloadOutlined />}
            size="large"
            onClick={handleRefresh}
            loading={loading}
            className="border-gray-300"
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => router.push("/dashboard/users/create")}
            className="bg-blue-600 hover:bg-blue-700 border-blue-600"
          >
            Create New User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-6">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  stat.color === "blue"
                    ? "bg-blue-100"
                    : stat.color === "green"
                    ? "bg-green-100"
                    : "bg-orange-100"
                }`}
              >
                <span
                  className={`text-xl ${
                    stat.color === "blue"
                      ? "text-blue-600"
                      : stat.color === "green"
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {stat.icon}
                </span>
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
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Search
              placeholder="Search users by name or email..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select
              placeholder="Status"
              size="large"
              style={{ width: 120 }}
              value={statusFilter}
              onChange={(value) => {
                setStatusFilter(value);
                handleFilterChange();
              }}
            >
              <Option value="all">All Status</Option>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
            <Select
              placeholder="Role"
              size="large"
              style={{ width: 120 }}
              value={roleFilter}
              onChange={(value) => {
                setRoleFilter(value);
                handleFilterChange();
              }}
            >
              <Option value="all">All Roles</Option>
              <Option value="admin">Admin</Option>
              <Option value="manager">Manager</Option>
              <Option value="user">User</Option>
            </Select>
          </div>
        </div>

        {/* Users Table */}
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="_id"
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} users`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 800 }}
          locale={{
            emptyText: (
              <div className="text-center py-8">
                <TeamOutlined className="text-4xl text-gray-400 mb-4" />
                <p className="text-gray-500 text-lg">No users found</p>
                <p className="text-gray-400 text-sm">
                  {searchText || statusFilter !== "all" || roleFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Create your first user to get started"}
                </p>
              </div>
            ),
          }}
        />
      </Card>

      {/* User Details Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <UserAddOutlined className="text-blue-600" />
            <span>User Details</span>
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            key="edit"
            type="primary"
            onClick={() => {
              setIsModalVisible(false);
              handleEditUser(selectedUser!);
            }}
          >
            Edit User
          </Button>,
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar
                size={80}
                className="rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                }}
              >
                {selectedUser.firstName.charAt(0).toUpperCase()}
                {selectedUser.lastName.charAt(0).toUpperCase()}
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h3>
                <p className="text-gray-600 mb-2">{selectedUser.email}</p>
                <div className="flex gap-2">
                  <Tag
                    color={selectedUser.isActive ? "green" : "red"}
                    className="text-sm"
                  >
                    {selectedUser.isActive ? "Active" : "Inactive"}
                  </Tag>
                  <Tag color="blue" className="text-sm capitalize">
                    {selectedUser.role}
                  </Tag>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500 block mb-1">
                  User ID
                </label>
                <p className="text-gray-900 font-mono text-sm">
                  {selectedUser._id}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 block mb-1">
                  Role
                </label>
                <p className="text-gray-900 capitalize font-medium">
                  {selectedUser.role}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 block mb-1">
                  Created Date
                </label>
                <p className="text-gray-900">
                  {new Date(selectedUser.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 block mb-1">
                  Last Updated
                </label>
                <p className="text-gray-900">
                  {new Date(selectedUser.updatedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Button
                  icon={<EditOutlined />}
                  onClick={() => {
                    setIsModalVisible(false);
                    handleEditUser(selectedUser);
                  }}
                >
                  Edit User
                </Button>
                <Button
                  icon={<UserSwitchOutlined />}
                  onClick={() => {
                    setIsModalVisible(false);
                    handleStatusToggle(selectedUser);
                  }}
                  style={{
                    color: selectedUser.isActive ? "#ff4d4f" : "#52c41a",
                    borderColor: selectedUser.isActive ? "#ff4d4f" : "#52c41a",
                  }}
                >
                  {selectedUser.isActive ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
