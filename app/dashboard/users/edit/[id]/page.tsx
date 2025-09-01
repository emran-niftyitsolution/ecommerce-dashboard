"use client";

import {
  ArrowLeftOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Switch,
  message,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const { Option } = Select;
const { TextArea } = Input;

export default function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Unwrap params using React.use()
  const { id } = use(params);

  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "Design",
    "Product",
    "HR",
    "Finance",
    "Operations",
    "Support",
    "Research",
  ];

  const roles = [
    "Admin",
    "Manager",
    "Developer",
    "Designer",
    "Analyst",
    "Coordinator",
    "Specialist",
    "Intern",
  ];

  // Simulate fetching user data
  useEffect(() => {
    // In a real app, you'd fetch user data from API
    const mockUser = {
      id: id,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1-555-0123",
      bio: "Senior Software Engineer with 5+ years of experience",
      role: "Admin",
      department: "Engineering",
      employeeId: "EMP001",
      joinDate: "2023-01-15",
      jobTitle: "Senior Software Engineer",
      username: "johndoe",
      status: true,
      location: "San Francisco, CA",
      timezone: "UTC-8",
      notes: "Team lead for backend development",
    };

    setUser(mockUser);
    form.setFieldsValue({
      ...mockUser,
      joinDate: dayjs(mockUser.joinDate),
    });
  }, [id, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Updating user:", values);

      message.success("User updated successfully!");

      // Redirect to users list
      router.push("/dashboard/users");
    } catch (error) {
      message.error("Failed to update user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          className="mb-4"
        >
          Back to Users
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <UserOutlined className="text-2xl text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
            <p className="text-gray-600">Update user information</p>
          </div>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-6"
      >
        {/* Basic Information */}
        <Card title="Basic Information" className="mb-6">
          <Row gutter={24}>
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
                <Input placeholder="Enter first name" size="large" />
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
                <Input placeholder="Enter last name" size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Please enter email address" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter email address" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  { required: true, message: "Please enter phone number" },
                  {
                    pattern: /^[\+]?[1-9][\d]{0,15}$/,
                    message: "Please enter a valid phone number",
                  },
                ]}
              >
                <Input placeholder="Enter phone number" size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Bio"
            name="bio"
            rules={[{ max: 500, message: "Bio cannot exceed 500 characters" }]}
          >
            <TextArea
              rows={3}
              placeholder="Tell us about this user..."
              maxLength={500}
              showCount
            />
          </Form.Item>
        </Card>

        {/* Work Information */}
        <Card title="Work Information" className="mb-6">
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select placeholder="Select role" size="large">
                  {roles.map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[
                  { required: true, message: "Please select a department" },
                ]}
              >
                <Select placeholder="Select department" size="large">
                  {departments.map((dept) => (
                    <Option key={dept} value={dept}>
                      {dept}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Employee ID"
                name="employeeId"
                rules={[
                  { required: true, message: "Please enter employee ID" },
                ]}
              >
                <Input placeholder="Enter employee ID" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Join Date"
                name="joinDate"
                rules={[{ required: true, message: "Please select join date" }]}
              >
                <DatePicker
                  placeholder="Select join date"
                  size="large"
                  className="w-full"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Job Title"
            name="jobTitle"
            rules={[{ required: true, message: "Please enter job title" }]}
          >
            <Input placeholder="Enter job title" size="large" />
          </Form.Item>
        </Card>

        {/* Account Settings */}
        <Card title="Account Settings" className="mb-6">
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please enter username" },
                  { min: 3, message: "Username must be at least 3 characters" },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message:
                      "Username can only contain letters, numbers, and underscores",
                  },
                ]}
              >
                <Input placeholder="Enter username" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Status" name="status" valuePropName="checked">
                <Switch
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                  size="default"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Additional Information */}
        <Card title="Additional Information" className="mb-6">
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item label="Location" name="location">
                <Input placeholder="Enter location" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Time Zone" name="timezone">
                <Select placeholder="Select timezone" size="large">
                  <Option value="UTC-8">Pacific Time (UTC-8)</Option>
                  <Option value="UTC-7">Mountain Time (UTC-7)</Option>
                  <Option value="UTC-6">Central Time (UTC-6)</Option>
                  <Option value="UTC-5">Eastern Time (UTC-5)</Option>
                  <Option value="UTC+0">UTC</Option>
                  <Option value="UTC+1">Central European Time (UTC+1)</Option>
                  <Option value="UTC+5:30">
                    India Standard Time (UTC+5:30)
                  </Option>
                  <Option value="UTC+8">China Standard Time (UTC+8)</Option>
                  <Option value="UTC+9">Japan Standard Time (UTC+9)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Notes" name="notes">
            <TextArea
              rows={3}
              placeholder="Any additional notes about this user..."
              maxLength={1000}
              showCount
            />
          </Form.Item>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <Button size="large" onClick={() => router.back()} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<SaveOutlined />}
            htmlType="submit"
            loading={loading}
          >
            Update User
          </Button>
        </div>
      </Form>
    </div>
  );
}
