"use client";

import {
  ArrowLeftOutlined,
  SaveOutlined,
  UploadOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Upload,
  message,
} from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Option } = Select;
const { TextArea } = Input;

export default function CreateUserPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

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

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Format the data
      const userData = {
        ...values,
        avatar:
          avatarUrl || values.firstName?.charAt(0) + values.lastName?.charAt(0),
        joinDate: values.joinDate?.format("YYYY-MM-DD"),
        status: values.status ? "active" : "inactive",
        createdAt: new Date().toISOString(),
      };

      console.log("Creating user:", userData);

      message.success("User created successfully!");

      // Reset form
      form.resetFields();
      setAvatarUrl("");

      // Redirect to users list
      router.push("/dashboard/users");
    } catch (error) {
      message.error("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = (info: any) => {
    if (info.file.status === "done") {
      // In a real app, you'd upload to your server and get the URL
      setAvatarUrl(URL.createObjectURL(info.file.originFileObj));
      message.success("Avatar uploaded successfully!");
    } else if (info.file.status === "error") {
      message.error("Avatar upload failed!");
    }
  };

  const uploadProps = {
    name: "avatar",
    showUploadList: false,
    beforeUpload: (file: File) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
        return false;
      }
      return true;
    },
    onChange: handleAvatarUpload,
  };

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
            <UserAddOutlined className="text-2xl text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Create New User
            </h1>
            <p className="text-gray-600">Add a new user to your organization</p>
          </div>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          status: true,
          role: "Developer",
          department: "Engineering",
        }}
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

          <Form.Item label="Avatar" name="avatar">
            <div className="flex items-center gap-4">
              <Avatar
                size={80}
                src={avatarUrl}
                style={{
                  background: avatarUrl
                    ? "transparent"
                    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                {!avatarUrl &&
                  form.getFieldValue("firstName")?.charAt(0) +
                    form.getFieldValue("lastName")?.charAt(0)}
              </Avatar>
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />} size="large">
                  Upload Avatar
                </Button>
              </Upload>
              <div className="text-sm text-gray-500">
                <p>Recommended: 200x200px, max 2MB</p>
                <p>Formats: JPG, PNG, GIF</p>
              </div>
            </div>
          </Form.Item>
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
            Create User
          </Button>
        </div>
      </Form>
    </div>
  );
}
