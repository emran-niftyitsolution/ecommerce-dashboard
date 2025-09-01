"use client";

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
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
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Search } = Input;
const { Option } = Select;

export default function UsersPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState([
    {
      key: "1",
      id: "USR-001",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "active",
      department: "Engineering",
      lastActive: "2 hours ago",
      avatar: "JD",
      joinDate: "2023-01-15",
      phone: "+1-555-0123",
      location: "San Francisco, CA",
      timezone: "UTC-8",
      bio: "Senior Software Engineer with 5+ years of experience",
      jobTitle: "Senior Software Engineer",
      employeeId: "EMP001",
      username: "johndoe",
      notes: "Team lead for backend development",
    },
    {
      key: "2",
      id: "USR-002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Manager",
      status: "active",
      department: "Marketing",
      lastActive: "1 day ago",
      avatar: "JS",
      joinDate: "2023-02-20",
      phone: "+1-555-0124",
      location: "New York, NY",
      timezone: "UTC-5",
      bio: "Marketing Manager with expertise in digital campaigns",
      jobTitle: "Marketing Manager",
      employeeId: "EMP002",
      username: "janesmith",
      notes: "Leads all marketing initiatives",
    },
    {
      key: "3",
      id: "USR-003",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "Developer",
      status: "inactive",
      department: "Engineering",
      lastActive: "1 week ago",
      avatar: "MJ",
      joinDate: "2023-03-10",
      phone: "+1-555-0125",
      location: "Austin, TX",
      timezone: "UTC-6",
      bio: "Full-stack developer specializing in React and Node.js",
      jobTitle: "Full Stack Developer",
      employeeId: "EMP003",
      username: "mikejohnson",
      notes: "On leave until further notice",
    },
    {
      key: "4",
      id: "USR-004",
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      role: "Designer",
      status: "active",
      department: "Design",
      lastActive: "3 hours ago",
      avatar: "SW",
      joinDate: "2023-04-05",
      phone: "+1-555-0126",
      location: "Seattle, WA",
      timezone: "UTC-8",
      bio: "UI/UX Designer with focus on user-centered design",
      jobTitle: "Senior UI/UX Designer",
      employeeId: "EMP004",
      username: "sarahwilson",
      notes: "Leads design system development",
    },
    {
      key: "5",
      id: "USR-005",
      name: "David Brown",
      email: "david.brown@example.com",
      role: "Developer",
      status: "active",
      department: "Engineering",
      lastActive: "5 hours ago",
      avatar: "DB",
      joinDate: "2023-05-15",
      phone: "+1-555-0127",
      location: "Boston, MA",
      timezone: "UTC-5",
      bio: "Backend developer with expertise in Python and Django",
      jobTitle: "Backend Developer",
      employeeId: "EMP005",
      username: "davidbrown",
      notes: "Specializes in API development",
    },
  ]);

  const columns = [
    {
      title: "User",
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
            {record.avatar}
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{text}</div>
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
        const colorMap: { [key: string]: string } = {
          Admin: "red",
          Manager: "blue",
          Developer: "green",
          Designer: "purple",
          Sales: "orange",
        };
        return <Tag color={colorMap[role]}>{role}</Tag>;
      },
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (department: string) => (
        <span className="text-gray-700">{department}</span>
      ),
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
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
      render: (lastActive: string) => (
        <span className="text-gray-500 text-sm">{lastActive}</span>
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
            title={`Toggle ${
              record.status === "active" ? "Inactive" : "Active"
            }`}
          >
            <Button
              type="text"
              icon={
                record.status === "active" ? <UserOutlined /> : <TeamOutlined />
              }
              size="small"
              onClick={() => handleStatusToggle(record)}
              className={
                record.status === "active"
                  ? "text-orange-600"
                  : "text-green-600"
              }
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

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleEditUser = (user: any) => {
    // Navigate to edit page with user data
    router.push(`/dashboard/users/edit/${user.id}`);
  };

  const handleDeleteUser = (user: any) => {
    Modal.confirm({
      title: "Delete User",
      content: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        // Remove user from the list
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
        message.success(`User ${user.name} deleted successfully`);
      },
    });
  };

  const handleStatusToggle = (user: any) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === user.id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
    message.success(
      `User ${user.name} status updated to ${
        user.status === "active" ? "inactive" : "active"
      }`
    );
  };

  const addNewUser = (userData: any) => {
    const newUser = {
      ...userData,
      key: (users.length + 1).toString(),
      id: `USR-${String(users.length + 1).padStart(3, "0")}`,
      lastActive: "Just now",
      avatar:
        userData.avatar ||
        userData.firstName?.charAt(0) + userData.lastName?.charAt(0),
    };
    setUsers((prevUsers) => [newUser, ...prevUsers]);
    message.success(
      `User ${userData.firstName} ${userData.lastName} added successfully!`
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
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
      value: users.filter((u) => u.status === "active").length,
      icon: <UserAddOutlined />,
      color: "green",
    },
    {
      title: "Inactive Users",
      value: users.filter((u) => u.status === "inactive").length,
      icon: <TeamOutlined />,
      color: "orange",
    },
  ];

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
              placeholder="Search users..."
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
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
          <Col xs={24} sm={4}>
            <Select
              placeholder="Role"
              value={roleFilter}
              onChange={setRoleFilter}
              className="w-full"
            >
              <Option value="all">All Roles</Option>
              <Option value="Admin">Admin</Option>
              <Option value="Manager">Manager</Option>
              <Option value="Developer">Developer</Option>
              <Option value="Designer">Designer</Option>
              <Option value="Sales">Sales</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8} className="text-right">
            <Space>
              <Button
                icon={<FilterOutlined />}
                onClick={() => {
                  setSearchText("");
                  setStatusFilter("all");
                  setRoleFilter("all");
                }}
              >
                Clear Filters
              </Button>
              <Button type="primary">Export</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Users Table */}
      <Card title={`Users (${filteredUsers.length})`}>
        <Table
          columns={columns}
          dataSource={filteredUsers}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} users`,
          }}
          size="middle"
          className="hover:shadow-sm"
        />
      </Card>

      {/* User Details Modal */}
      <Modal
        title="User Details"
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
              handleEditUser(selectedUser);
            }}
          >
            Edit User
          </Button>,
        ]}
        width={600}
        centered
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar
                size={80}
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                {selectedUser.avatar}
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedUser.name}
                </h3>
                <p className="text-gray-600">{selectedUser.email}</p>
                <div className="flex gap-2 mt-2">
                  <Tag color="blue">{selectedUser.role}</Tag>
                  <Badge
                    status={
                      selectedUser.status === "active" ? "success" : "default"
                    }
                    text={selectedUser.status}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  User ID
                </label>
                <p className="text-gray-900">{selectedUser.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Employee ID
                </label>
                <p className="text-gray-900">
                  {selectedUser.employeeId || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Department
                </label>
                <p className="text-gray-900">{selectedUser.department}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Job Title
                </label>
                <p className="text-gray-900">
                  {selectedUser.jobTitle || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Join Date
                </label>
                <p className="text-gray-900">{selectedUser.joinDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Last Active
                </label>
                <p className="text-gray-900">{selectedUser.lastActive}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Phone
                </label>
                <p className="text-gray-900">{selectedUser.phone || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Location
                </label>
                <p className="text-gray-900">
                  {selectedUser.location || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Timezone
                </label>
                <p className="text-gray-900">
                  {selectedUser.timezone || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Username
                </label>
                <p className="text-gray-900">
                  {selectedUser.username || "N/A"}
                </p>
              </div>
            </div>

            {selectedUser.bio && (
              <div>
                <label className="text-sm font-medium text-gray-500">Bio</label>
                <p className="text-gray-900 mt-1">{selectedUser.bio}</p>
              </div>
            )}

            {selectedUser.notes && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Notes
                </label>
                <p className="text-gray-900 mt-1">{selectedUser.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
