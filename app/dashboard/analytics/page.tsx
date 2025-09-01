"use client";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Area, Pie } from "@ant-design/plots";
import {
  Card,
  Col,
  DatePicker,
  Progress,
  Row,
  Select,
  Statistic,
  Table,
} from "antd";

const { RangePicker } = DatePicker;

export default function AnalyticsPage() {
  // Sample data for analytics
  const trafficData = [
    { date: "2024-01-01", visitors: 1200, pageviews: 3400, sessions: 1100 },
    { date: "2024-01-02", visitors: 1350, pageviews: 3800, sessions: 1250 },
    { date: "2024-01-03", visitors: 1180, pageviews: 3200, sessions: 1080 },
    { date: "2024-01-04", visitors: 1420, pageviews: 4100, sessions: 1320 },
    { date: "2024-01-05", visitors: 1680, pageviews: 4800, sessions: 1580 },
    { date: "2024-01-06", visitors: 1520, pageviews: 4300, sessions: 1420 },
    { date: "2024-01-07", visitors: 1780, pageviews: 5200, sessions: 1680 },
  ];

  const deviceData = [
    { device: "Desktop", users: 45, color: "#3b82f6" },
    { device: "Mobile", users: 35, color: "#10b981" },
    { device: "Tablet", users: 20, color: "#f59e0b" },
  ];

  const channelData = [
    { channel: "Organic Search", visitors: 3200, percentage: 40 },
    { channel: "Direct", visitors: 2400, percentage: 30 },
    { channel: "Social Media", visitors: 1600, percentage: 20 },
    { channel: "Email", visitors: 800, percentage: 10 },
  ];

  const topPages = [
    { page: "/dashboard", views: 12500, bounce: 35, time: "3:45" },
    { page: "/products", views: 8900, bounce: 42, time: "2:30" },
    { page: "/about", views: 5600, bounce: 28, time: "4:20" },
    { page: "/contact", views: 3400, bounce: 65, time: "1:15" },
    { page: "/blog", views: 2800, bounce: 38, time: "5:10" },
  ];

  const conversionFunnelData = [
    { stage: "Visitors", count: 10000, percentage: 100 },
    { stage: "Product Views", count: 6500, percentage: 65 },
    { stage: "Add to Cart", count: 2600, percentage: 26 },
    { stage: "Checkout", count: 1300, percentage: 13 },
    { stage: "Purchase", count: 780, percentage: 7.8 },
  ];

  const columns = [
    {
      title: "Page",
      dataIndex: "page",
      key: "page",
      render: (text: string) => (
        <span className="font-mono text-blue-600">{text}</span>
      ),
    },
    {
      title: "Page Views",
      dataIndex: "views",
      key: "views",
      render: (views: number) => (
        <span className="font-semibold">{views.toLocaleString()}</span>
      ),
      sorter: (a: any, b: any) => a.views - b.views,
    },
    {
      title: "Bounce Rate",
      dataIndex: "bounce",
      key: "bounce",
      render: (bounce: number) => (
        <div className="flex items-center gap-2">
          <Progress
            percent={bounce}
            size="small"
            strokeColor={
              bounce > 50 ? "#ef4444" : bounce > 35 ? "#f59e0b" : "#10b981"
            }
            showInfo={false}
            className="w-16"
          />
          <span className="text-sm">{bounce}%</span>
        </div>
      ),
      sorter: (a: any, b: any) => a.bounce - b.bounce,
    },
    {
      title: "Avg. Time",
      dataIndex: "time",
      key: "time",
      render: (time: string) => <span className="text-gray-600">{time}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive analytics and performance insights
          </p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="7d" style={{ width: 120 }}>
            <Select.Option value="1d">Last 24h</Select.Option>
            <Select.Option value="7d">Last 7 days</Select.Option>
            <Select.Option value="30d">Last 30 days</Select.Option>
            <Select.Option value="90d">Last 90 days</Select.Option>
          </Select>
          <RangePicker />
        </div>
      </div>

      {/* Key Metrics */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="Total Visitors"
              value={28450}
              valueStyle={{
                color: "#3b82f6",
                fontSize: "24px",
                fontWeight: "600",
              }}
              prefix={<TeamOutlined />}
              suffix={
                <span className="text-sm text-green-600 ml-2">
                  <ArrowUpOutlined /> 18.2%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="Page Views"
              value={125680}
              valueStyle={{
                color: "#10b981",
                fontSize: "24px",
                fontWeight: "600",
              }}
              prefix={<EyeOutlined />}
              suffix={
                <span className="text-sm text-green-600 ml-2">
                  <ArrowUpOutlined /> 12.5%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="Conversions"
              value={3420}
              valueStyle={{
                color: "#f59e0b",
                fontSize: "24px",
                fontWeight: "600",
              }}
              prefix={<ShoppingCartOutlined />}
              suffix={
                <span className="text-sm text-red-600 ml-2">
                  <ArrowDownOutlined /> 2.1%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="Revenue"
              value={89250}
              precision={0}
              valueStyle={{
                color: "#8b5cf6",
                fontSize: "24px",
                fontWeight: "600",
              }}
              prefix="$"
              suffix={
                <span className="text-sm text-green-600 ml-2">
                  <ArrowUpOutlined /> 24.3%
                </span>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Traffic Trends */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title="Traffic Overview" className="h-96">
            <div className="w-full h-80">
              <Area
                data={trafficData}
                xField="date"
                yField="pageviews"
                smooth
                autoFit
                height={320}
                areaStyle={{
                  fill: "l(270) 0:#3b82f6 0.5:#60a5fa 1:#93c5fd",
                  fillOpacity: 0.6,
                }}
                line={{
                  style: {
                    stroke: "#3b82f6",
                    strokeWidth: 3,
                  },
                }}
                point={{
                  size: 5,
                  style: {
                    fill: "white",
                    stroke: "#3b82f6",
                    lineWidth: 2,
                  },
                }}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Device Breakdown" className="h-96">
            <div className="w-full h-80 flex items-center justify-center">
              <Pie
                data={deviceData}
                angleField="users"
                colorField="device"
                radius={0.8}
                innerRadius={0.5}
                autoFit
                height={320}
                label={{
                  type: "inner",
                  offset: "-30%",
                  content: "{percentage}",
                  style: {
                    fontSize: 14,
                    fontWeight: "bold",
                    fill: "white",
                  },
                }}
                legend={{
                  position: "bottom",
                }}
                color={["#3b82f6", "#10b981", "#f59e0b"]}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Performance Metrics */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card title="Real-time Metrics">
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  1,247
                </div>
                <div className="text-sm text-gray-500">Active Users</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-green-600">
                    892
                  </div>
                  <div className="text-xs text-gray-500">Desktop</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-blue-600">355</div>
                  <div className="text-xs text-gray-500">Mobile</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Session Duration</span>
                  <span className="font-medium">4:32</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pages per Session</span>
                  <span className="font-medium">3.2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bounce Rate</span>
                  <span className="font-medium">42.5%</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Traffic Sources">
            <div className="space-y-4">
              {channelData.map((channel, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      {channel.channel}
                    </span>
                    <span className="text-sm text-gray-500">
                      {channel.visitors.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    percent={channel.percentage}
                    strokeColor={
                      index === 0
                        ? "#3b82f6"
                        : index === 1
                        ? "#10b981"
                        : index === 2
                        ? "#f59e0b"
                        : "#8b5cf6"
                    }
                    showInfo={false}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Conversion Funnel">
            <div className="space-y-3">
              {conversionFunnelData.map((stage, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-24 text-xs text-gray-600">
                    {stage.stage}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        {stage.count.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {stage.percentage}%
                      </span>
                    </div>
                    <Progress
                      percent={stage.percentage}
                      strokeColor={`rgba(59, 130, 246, ${1 - index * 0.15})`}
                      showInfo={false}
                      size="small"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Geographic and Top Pages */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Top Pages">
            <Table
              columns={columns}
              dataSource={topPages}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Geographic Distribution">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">United States</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">45.2%</span>
                  <span className="text-xs text-gray-500">12,850 users</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">United Kingdom</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">18.7%</span>
                  <span className="text-xs text-gray-500">5,320 users</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Canada</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">12.1%</span>
                  <span className="text-xs text-gray-500">3,440 users</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Australia</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">8.9%</span>
                  <span className="text-xs text-gray-500">2,530 users</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Germany</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">7.3%</span>
                  <span className="text-xs text-gray-500">2,070 users</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Others</span>
                  <span className="text-sm text-gray-500">
                    7.8% (2,220 users)
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
