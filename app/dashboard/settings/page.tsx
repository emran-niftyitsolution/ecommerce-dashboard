"use client";

import {
  ApiOutlined,
  BellOutlined,
  DatabaseOutlined,
  LockOutlined,
  SafetyOutlined,
  SaveOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Tabs,
  Tag,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const { TabPane } = Tabs;

export default function SettingsPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Handle save logic here
    }, 1000);
  };

  const securityAlerts = [
    { type: "info", message: "Your password was last changed 30 days ago" },
    { type: "warning", message: "Two-factor authentication is not enabled" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account preferences and system configuration
          </p>
        </div>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSave}
          loading={loading}
        >
          Save All Changes
        </Button>
      </div>

      {/* Settings Tabs */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab} size="large">
          {/* General Settings */}
          <TabPane
            tab={
              <span>
                <UserOutlined />
                General
              </span>
            }
            key="general"
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card title="Profile Settings" size="small">
                  <Form layout="vertical" form={form}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="First Name" name="firstName">
                          <Input placeholder="John" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Last Name" name="lastName">
                          <Input placeholder="Doe" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item label="Email" name="email">
                      <Input placeholder="john.doe@example.com" />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone">
                      <Input placeholder="+1 (555) 123-4567" />
                    </Form.Item>
                    <Form.Item label="Bio" name="bio">
                      <Input.TextArea
                        rows={3}
                        placeholder="Tell us about yourself..."
                      />
                    </Form.Item>
                  </Form>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card title="Preferences" size="small">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Language</div>
                        <div className="text-sm text-gray-500">
                          Choose your preferred language
                        </div>
                      </div>
                      <Select defaultValue="en" style={{ width: 120 }}>
                        <Select.Option value="en">English</Select.Option>
                        <Select.Option value="es">Spanish</Select.Option>
                        <Select.Option value="fr">French</Select.Option>
                        <Select.Option value="de">German</Select.Option>
                      </Select>
                    </div>

                    <Divider />

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Timezone</div>
                        <div className="text-sm text-gray-500">
                          Your local timezone
                        </div>
                      </div>
                      <Select defaultValue="utc-8" style={{ width: 200 }}>
                        <Select.Option value="utc-8">
                          Pacific Time (UTC-8)
                        </Select.Option>
                        <Select.Option value="utc-5">
                          Eastern Time (UTC-5)
                        </Select.Option>
                        <Select.Option value="utc+0">
                          Greenwich Time (UTC+0)
                        </Select.Option>
                        <Select.Option value="utc+1">
                          Central European (UTC+1)
                        </Select.Option>
                      </Select>
                    </div>

                    <Divider />

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Date Format</div>
                        <div className="text-sm text-gray-500">
                          How dates are displayed
                        </div>
                      </div>
                      <Select defaultValue="mm/dd/yyyy" style={{ width: 120 }}>
                        <Select.Option value="mm/dd/yyyy">
                          MM/DD/YYYY
                        </Select.Option>
                        <Select.Option value="dd/mm/yyyy">
                          DD/MM/YYYY
                        </Select.Option>
                        <Select.Option value="yyyy-mm-dd">
                          YYYY-MM-DD
                        </Select.Option>
                      </Select>
                    </div>

                    <Divider />

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Currency</div>
                        <div className="text-sm text-gray-500">
                          Default currency for displays
                        </div>
                      </div>
                      <Select defaultValue="usd" style={{ width: 120 }}>
                        <Select.Option value="usd">USD ($)</Select.Option>
                        <Select.Option value="eur">EUR (€)</Select.Option>
                        <Select.Option value="gbp">GBP (£)</Select.Option>
                        <Select.Option value="jpy">JPY (¥)</Select.Option>
                      </Select>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>

          {/* Notifications */}
          <TabPane
            tab={
              <span>
                <BellOutlined />
                Notifications
                <Badge count={3} size="small" className="ml-2" />
              </span>
            }
            key="notifications"
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card title="Email Notifications" size="small">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Order Updates</div>
                        <div className="text-sm text-gray-500">
                          Receive emails about order status
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Divider />

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Marketing Emails</div>
                        <div className="text-sm text-gray-500">
                          Promotional content and updates
                        </div>
                      </div>
                      <Switch />
                    </div>

                    <Divider />

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Security Alerts</div>
                        <div className="text-sm text-gray-500">
                          Important security notifications
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Divider />

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Weekly Reports</div>
                        <div className="text-sm text-gray-500">
                          Weekly performance summaries
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card title="Push Notifications" size="small">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Browser Notifications</div>
                        <div className="text-sm text-gray-500">
                          Real-time browser alerts
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Divider />

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Desktop Notifications</div>
                        <div className="text-sm text-gray-500">
                          System notifications on desktop
                        </div>
                      </div>
                      <Switch />
                    </div>

                    <Divider />

                    <div>
                      <div className="font-medium mb-2">Quiet Hours</div>
                      <div className="text-sm text-gray-500 mb-3">
                        Set times when notifications are muted
                      </div>
                      <Space>
                        <TimePicker
                          defaultValue={dayjs("22:00", "HH:mm")}
                          format="HH:mm"
                        />
                        <span>to</span>
                        <TimePicker
                          defaultValue={dayjs("08:00", "HH:mm")}
                          format="HH:mm"
                        />
                      </Space>
                    </div>

                    <Divider />

                    <div>
                      <div className="font-medium mb-2">Notification Sound</div>
                      <Radio.Group defaultValue="default">
                        <Radio value="default">Default</Radio>
                        <Radio value="bell">Bell</Radio>
                        <Radio value="chime">Chime</Radio>
                        <Radio value="none">Silent</Radio>
                      </Radio.Group>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>

          {/* Security */}
          <TabPane
            tab={
              <span>
                <LockOutlined />
                Security
              </span>
            }
            key="security"
          >
            <div className="space-y-6">
              {/* Security Alerts */}
              <div className="space-y-3">
                {securityAlerts.map((alert, index) => (
                  <Alert
                    key={index}
                    type={
                      alert.type as "success" | "info" | "warning" | "error"
                    }
                    message={alert.message}
                    showIcon
                    closable
                  />
                ))}
              </div>

              <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                  <Card title="Password Security" size="small">
                    <Form layout="vertical">
                      <Form.Item
                        label="Current Password"
                        name="currentPassword"
                      >
                        <Input.Password placeholder="Enter current password" />
                      </Form.Item>
                      <Form.Item label="New Password" name="newPassword">
                        <Input.Password placeholder="Enter new password" />
                      </Form.Item>
                      <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                      >
                        <Input.Password placeholder="Confirm new password" />
                      </Form.Item>
                      <Button type="primary" block>
                        Update Password
                      </Button>
                    </Form>

                    <Divider />

                    <div className="space-y-3">
                      <div className="font-medium">
                        Password Strength Requirements:
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• At least 8 characters long</li>
                        <li>• Contains uppercase and lowercase letters</li>
                        <li>• Contains at least one number</li>
                        <li>• Contains at least one special character</li>
                      </ul>
                    </div>
                  </Card>
                </Col>

                <Col xs={24} lg={12}>
                  <Card title="Two-Factor Authentication" size="small">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">SMS Authentication</div>
                          <div className="text-sm text-gray-500">
                            Receive codes via SMS
                          </div>
                        </div>
                        <Switch />
                      </div>

                      <Divider />

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Authenticator App</div>
                          <div className="text-sm text-gray-500">
                            Use Google Authenticator or similar
                          </div>
                        </div>
                        <Switch />
                      </div>

                      <Divider />

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Email Verification</div>
                          <div className="text-sm text-gray-500">
                            Verify logins via email
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Divider />

                      <Button type="primary" block icon={<SafetyOutlined />}>
                        Enable Two-Factor Authentication
                      </Button>
                    </div>
                  </Card>
                </Col>
              </Row>

              <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                  <Card title="Login Activity" size="small">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Current Session</div>
                          <div className="text-sm text-gray-500">
                            Chrome on Windows • Active now
                          </div>
                        </div>
                        <Badge status="success" text="Current" />
                      </div>

                      <Divider />

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Mobile App</div>
                          <div className="text-sm text-gray-500">
                            iPhone • 2 hours ago
                          </div>
                        </div>
                        <Button size="small" danger>
                          Revoke
                        </Button>
                      </div>

                      <Divider />

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Firefox on Mac</div>
                          <div className="text-sm text-gray-500">
                            macOS • 1 day ago
                          </div>
                        </div>
                        <Button size="small" danger>
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col xs={24} lg={12}>
                  <Card title="Privacy Controls" size="small">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Profile Visibility</div>
                          <div className="text-sm text-gray-500">
                            Who can see your profile
                          </div>
                        </div>
                        <Select defaultValue="team" style={{ width: 120 }}>
                          <Select.Option value="public">Public</Select.Option>
                          <Select.Option value="team">Team Only</Select.Option>
                          <Select.Option value="private">Private</Select.Option>
                        </Select>
                      </div>

                      <Divider />

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Activity Tracking</div>
                          <div className="text-sm text-gray-500">
                            Track usage for analytics
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Divider />

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Data Export</div>
                          <div className="text-sm text-gray-500">
                            Download your data
                          </div>
                        </div>
                        <Button icon={<DatabaseOutlined />}>Export</Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>

          {/* Team Settings */}
          <TabPane
            tab={
              <span>
                <TeamOutlined />
                Team
              </span>
            }
            key="team"
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={16}>
                <Card title="Team Members" size="small">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                          JD
                        </div>
                        <div>
                          <div className="font-medium">John Doe</div>
                          <div className="text-sm text-gray-500">
                            john.doe@example.com
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag color="blue">Admin</Tag>
                        <Button size="small">Edit</Button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
                          JS
                        </div>
                        <div>
                          <div className="font-medium">Jane Smith</div>
                          <div className="text-sm text-gray-500">
                            jane.smith@example.com
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag color="green">Editor</Tag>
                        <Button size="small">Edit</Button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium">
                          MB
                        </div>
                        <div>
                          <div className="font-medium">Mike Brown</div>
                          <div className="text-sm text-gray-500">
                            mike.brown@example.com
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag color="orange">Viewer</Tag>
                        <Button size="small">Edit</Button>
                      </div>
                    </div>

                    <Button type="dashed" block icon={<TeamOutlined />}>
                      Invite Team Member
                    </Button>
                  </div>
                </Card>
              </Col>

              <Col xs={24} lg={8}>
                <Card title="Team Permissions" size="small">
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium mb-2">
                        Default Role for New Members
                      </div>
                      <Select defaultValue="viewer" style={{ width: "100%" }}>
                        <Select.Option value="admin">
                          Administrator
                        </Select.Option>
                        <Select.Option value="editor">Editor</Select.Option>
                        <Select.Option value="viewer">Viewer</Select.Option>
                      </Select>
                    </div>

                    <Divider />

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">
                          Allow Self-Registration
                        </div>
                        <div className="text-sm text-gray-500">
                          Team members can join via link
                        </div>
                      </div>
                      <Switch />
                    </div>

                    <Divider />

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Require Approval</div>
                        <div className="text-sm text-gray-500">
                          New members need admin approval
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>

          {/* API Settings */}
          <TabPane
            tab={
              <span>
                <ApiOutlined />
                API
              </span>
            }
            key="api"
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card title="API Keys" size="small">
                  <div className="space-y-4">
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Production API Key</div>
                        <Badge status="success" text="Active" />
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        Created: Jan 15, 2024 • Last used: 2 hours ago
                      </div>
                      <div className="flex items-center gap-2">
                        <Input.Password
                          value="sk_live_••••••••••••••••••••••••••••••••"
                          readOnly
                          size="small"
                        />
                        <Button size="small">Copy</Button>
                        <Button size="small" danger>
                          Revoke
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Development API Key</div>
                        <Badge status="processing" text="Testing" />
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        Created: Dec 20, 2023 • Last used: 1 day ago
                      </div>
                      <div className="flex items-center gap-2">
                        <Input.Password
                          value="sk_test_••••••••••••••••••••••••••••••••"
                          readOnly
                          size="small"
                        />
                        <Button size="small">Copy</Button>
                        <Button size="small" danger>
                          Revoke
                        </Button>
                      </div>
                    </div>

                    <Button type="primary" block>
                      Generate New API Key
                    </Button>
                  </div>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card title="API Configuration" size="small">
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium mb-2">Rate Limiting</div>
                      <div className="text-sm text-gray-500 mb-3">
                        Requests per minute: <strong>1000</strong>
                      </div>
                      <Slider
                        defaultValue={1000}
                        min={100}
                        max={5000}
                        step={100}
                        marks={{
                          100: "100",
                          2500: "2.5K",
                          5000: "5K",
                        }}
                      />
                    </div>

                    <Divider />

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Webhook Notifications</div>
                        <div className="text-sm text-gray-500">
                          Send events to webhook URLs
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Divider />

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">API Logging</div>
                        <div className="text-sm text-gray-500">
                          Log API requests for debugging
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Divider />

                    <div>
                      <div className="font-medium mb-2">Allowed Origins</div>
                      <Input.TextArea
                        rows={3}
                        placeholder="https://yourdomain.com&#10;https://app.yourdomain.com"
                        defaultValue="https://yourdomain.com&#10;https://app.yourdomain.com"
                      />
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
