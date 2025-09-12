"use client";

import { apiClient } from "@/lib/api-client";
import {
  ArrowLeftOutlined,
  HomeOutlined,
  LoadingOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Typography,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "manager" | "admin";
  isActive: boolean;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences?: {
    theme: "light" | "dark";
    language: string;
    notifications: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences?: {
    theme: string;
    language: string;
    notifications: boolean;
  };
}

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const userId = params.id as string;

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId, fetchUser]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getUser(userId);

      if (response.success && response.data) {
        const userData = response.data as User;
        setUser(userData);

        // Set form values
        form.setFieldsValue({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          role: userData.role,
          isActive: userData.isActive,
          phone: userData.phone || "",
          address: {
            street: userData.address?.street || "",
            city: userData.address?.city || "",
            state: userData.address?.state || "",
            zipCode: userData.address?.zipCode || "",
            country: userData.address?.country || "",
          },
          preferences: {
            theme: userData.preferences?.theme || "light",
            language: userData.preferences?.language || "en",
            notifications: userData.preferences?.notifications ?? true,
          },
        });
      } else {
        message.error(response.error || "Failed to fetch user");
        router.push("/dashboard/users");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      message.error("Failed to fetch user");
      router.push("/dashboard/users");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (values: FormValues) => {
    try {
      setSaving(true);

      const updateData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        role: values.role,
        isActive: values.isActive,
        phone: values.phone || undefined,
        address: values.address?.street
          ? {
              street: values.address.street,
              city: values.address.city,
              state: values.address.state,
              zipCode: values.address.zipCode,
              country: values.address.country,
            }
          : undefined,
        preferences: {
          theme: values.preferences?.theme || "light",
          language: values.preferences?.language || "en",
          notifications: values.preferences?.notifications ?? true,
        },
      };

      const response = await apiClient.updateUser(userId, updateData);

      if (response.success) {
        message.success("User updated successfully");
        router.push("/dashboard/users");
      } else {
        message.error(response.error || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      message.error("Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/users");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Spin
            size="large"
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
          />
          <div className="mt-4 text-gray-600">Loading user data...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <Text type="danger">User not found</Text>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={handleCancel}
            type="text"
          >
            Back to Users
          </Button>
        </Space>
        <Title level={2} className="mt-4 mb-2">
          <UserOutlined className="mr-2" />
          Edit User: {user.firstName} {user.lastName}
        </Title>
        <Text type="secondary">Update user information and preferences</Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        className="space-y-6"
      >
        <Card title="Basic Information" className="mb-6">
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter first name" },
                  {
                    min: 2,
                    message: "First name must be at least 2 characters",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter first name"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter last name" },
                  {
                    min: 2,
                    message: "Last name must be at least 2 characters",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter last name"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Enter email address"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    pattern: /^[\+]?[1-9][\d]{0,15}$/,
                    message: "Please enter a valid phone number",
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Enter phone number"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select placeholder="Select user role">
                  <Option value="user">User</Option>
                  <Option value="manager">Manager</Option>
                  <Option value="admin">Admin</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Status" name="isActive" valuePropName="checked">
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Address Information" className="mb-6">
          <Row gutter={16}>
            <Col xs={24}>
              <Form.Item label="Street Address" name={["address", "street"]}>
                <Input
                  prefix={<HomeOutlined />}
                  placeholder="Enter street address"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item label="City" name={["address", "city"]}>
                <Input placeholder="Enter city" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="State" name={["address", "state"]}>
                <Input placeholder="Enter state" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="ZIP Code" name={["address", "zipCode"]}>
                <Input placeholder="Enter ZIP code" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Country" name={["address", "country"]}>
                <Input placeholder="Enter country" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Preferences" className="mb-6">
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item label="Theme" name={["preferences", "theme"]}>
                <Select placeholder="Select theme">
                  <Option value="light">Light</Option>
                  <Option value="dark">Dark</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="Language" name={["preferences", "language"]}>
                <Select placeholder="Select language">
                  <Option value="en">English</Option>
                  <Option value="es">Spanish</Option>
                  <Option value="fr">French</Option>
                  <Option value="de">German</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Notifications"
                name={["preferences", "notifications"]}
                valuePropName="checked"
              >
                <Switch checkedChildren="On" unCheckedChildren="Off" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Divider />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button size="large" onClick={handleCancel} disabled={saving}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<SaveOutlined />}
            loading={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
