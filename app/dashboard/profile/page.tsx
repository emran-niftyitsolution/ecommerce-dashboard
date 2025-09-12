"use client";

import {
  CalendarOutlined,
  CameraOutlined,
  EditOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Form,
  Input,
  Upload,
} from "antd";
import { useState } from "react";

export default function ProfilePage() {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const onFinish = (values: Record<string, unknown>) => {
    console.log("Profile updated:", values);
    setIsEditing(false);
    // Handle profile update logic here
  };

  const profileStats = [
    {
      title: "Projects Completed",
      value: 47,
      icon: <TeamOutlined />,
      color: "#52c41a",
    },
    {
      title: "Team Members",
      value: 12,
      icon: <TeamOutlined />,
      color: "#1890ff",
    },
    {
      title: "Average Rating",
      value: 4.8,
      icon: <UserOutlined />,
      color: "#faad14",
    },
    {
      title: "Years Experience",
      value: 5,
      icon: <CalendarOutlined />,
      color: "#722ed1",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>
        <Button
          type={isEditing ? "default" : "primary"}
          icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <Card className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <Avatar
                size={120}
                icon={<UserOutlined />}
                className="rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "4px solid #fff",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                }}
              />
              {isEditing && (
                <Upload
                  showUploadList={false}
                  beforeUpload={() => false}
                  className="absolute bottom-0 right-0"
                >
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CameraOutlined />}
                    size="small"
                    className="shadow-lg"
                  />
                </Upload>
              )}
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">John Doe</h2>
            <p className="text-gray-500 mb-3">Senior Developer</p>
            <div className="flex justify-center mb-6">
              <Badge status="success" text="Online" />
            </div>

            <Divider className="my-6" />

            <div className="text-left space-y-4">
              <div className="flex items-center gap-2">
                <MailOutlined className="text-gray-400" />
                <span className="text-sm">john.doe@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneOutlined className="text-gray-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <EnvironmentOutlined className="text-gray-400" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarOutlined className="text-gray-400" />
                <span className="text-sm">Joined March 2019</span>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card title="Quick Stats" className="mt-8">
            <div className="grid grid-cols-2 gap-4">
              {profileStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{
                      backgroundColor: `${stat.color}20`,
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-lg font-bold">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.title}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="space-y-8">
            {/* Personal Information */}
            <Card title="Personal Information" className="mb-8">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  firstName: "John",
                  lastName: "Doe",
                  email: "john.doe@example.com",
                  phone: "+1 (555) 123-4567",
                  address: "123 Main St, San Francisco, CA 94105",
                  bio: "Experienced senior developer with expertise in modern web technologies and team leadership.",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item label="First Name" name="firstName">
                    <Input disabled={!isEditing} />
                  </Form.Item>
                  <Form.Item label="Last Name" name="lastName">
                    <Input disabled={!isEditing} />
                  </Form.Item>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item label="Email" name="email">
                    <Input disabled={!isEditing} />
                  </Form.Item>
                  <Form.Item label="Phone" name="phone">
                    <Input disabled={!isEditing} />
                  </Form.Item>
                </div>
                <Form.Item label="Address" name="address">
                  <Input disabled={!isEditing} />
                </Form.Item>
                <Form.Item label="Bio" name="bio">
                  <Input.TextArea rows={3} disabled={!isEditing} />
                </Form.Item>
              </Form>
            </Card>

            {/* Recent Activity */}
            <Card title="Recent Activity" className="mb-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">
                      Completed Project Alpha
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">
                      Updated team documentation
                    </p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">
                      Code review for Feature X
                    </p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">
                      Mentored junior developer
                    </p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
