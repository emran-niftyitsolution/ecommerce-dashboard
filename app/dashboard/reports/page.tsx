"use client";

import {
  BarChartOutlined,
  DownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FilterOutlined,
  LineChartOutlined,
  PieChartOutlined,
  ReloadOutlined,
  RiseOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Column, Line, Pie } from "@ant-design/plots";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tabs,
  Tag,
} from "antd";
import { useState } from "react";

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Dynamic reports data - will be populated from API when reports endpoints are available
  const salesData: Array<{ date: string; sales: number; revenue: number }> = [];
  const regionData: Array<{
    region: string;
    sales: number;
    percentage: number;
  }> = [];
  const performanceData: Array<{
    metric: string;
    value: number;
    change: number;
  }> = [];
  const reportData: Array<{
    name: string;
    type: string;
    lastRun: string;
    status: string;
  }> = [];

  const columns = [
    {
      title: "Report Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span className="font-medium text-gray-900">{text}</span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        const colors: { [key: string]: string } = {
          Financial: "blue",
          Analytics: "green",
          Sales: "orange",
          Marketing: "purple",
        };
        return <Tag color={colors[type]}>{type}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors: { [key: string]: string } = {
          completed: "success",
          processing: "processing",
          failed: "error",
        };
        return (
          <Tag color={colors[status]} className="capitalize">
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Downloads",
      dataIndex: "downloads",
      key: "downloads",
      render: (downloads: number) => (
        <span className="font-medium">{downloads}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: {
        name: string;
        type: string;
        lastRun: string;
        status: string;
      }) => (
        <Space>
          <Button
            type="text"
            icon={<DownloadOutlined />}
            disabled={record.status !== "completed"}
          />
          <Button type="text" icon={<ShareAltOutlined />} />
        </Space>
      ),
    },
  ];

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const kpiCards = [
    {
      title: "Total Revenue",
      value: 2440000,
      prefix: "$",
      suffix: <span className="text-green-600 text-sm ml-2">↗ 12.5%</span>,
      color: "#1890ff",
    },
    {
      title: "Profit Margin",
      value: 23.8,
      suffix: (
        <span>
          % <span className="text-green-600 text-sm ml-1">↗ 2.1%</span>
        </span>
      ),
      color: "#52c41a",
    },
    {
      title: "Customer Growth",
      value: 18.4,
      suffix: (
        <span>
          % <span className="text-green-600 text-sm ml-1">↗ 5.2%</span>
        </span>
      ),
      color: "#faad14",
    },
    {
      title: "Market Share",
      value: 34.7,
      suffix: (
        <span>
          % <span className="text-red-600 text-sm ml-1">↘ 1.3%</span>
        </span>
      ),
      color: "#722ed1",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Reports & Analytics
          </h1>
          <p className="text-gray-600">
            Comprehensive insights and data analysis
          </p>
        </div>
        <Space>
          <Button icon={<FilterOutlined />}>Filters</Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={loading}
          >
            Refresh
          </Button>
          <Button type="primary" icon={<DownloadOutlined />}>
            Export All
          </Button>
        </Space>
      </div>

      {/* Filters */}
      <Card>
        <Row gutter={16} align="middle">
          <Col>
            <span className="text-sm font-medium text-gray-700">
              Date Range:
            </span>
          </Col>
          <Col>
            <RangePicker />
          </Col>
          <Col>
            <span className="text-sm font-medium text-gray-700">Category:</span>
          </Col>
          <Col>
            <Select defaultValue="all" style={{ width: 120 }}>
              <Select.Option value="all">All Reports</Select.Option>
              <Select.Option value="financial">Financial</Select.Option>
              <Select.Option value="sales">Sales</Select.Option>
              <Select.Option value="marketing">Marketing</Select.Option>
            </Select>
          </Col>
          <Col>
            <Button type="primary">Apply Filters</Button>
          </Col>
        </Row>
      </Card>

      {/* KPI Cards */}
      <Row gutter={[24, 24]}>
        {kpiCards.map((kpi, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="hover:shadow-lg transition-shadow">
              <Statistic
                title={kpi.title}
                value={kpi.value}
                precision={kpi.prefix === "$" ? 0 : 1}
                prefix={kpi.prefix}
                suffix={kpi.suffix}
                valueStyle={{
                  color: kpi.color,
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Tabs */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <span>
                <LineChartOutlined /> Sales Trends
              </span>
            }
            key="overview"
          >
            <div className="w-full h-80">
              <Line
                data={salesData}
                xField="month"
                yField="sales"
                smooth
                autoFit
                height={320}
                point={{
                  size: 5,
                  style: {
                    fill: "white",
                    stroke: "#1890ff",
                    lineWidth: 2,
                  },
                }}
                line={{
                  style: {
                    stroke: "#1890ff",
                    strokeWidth: 3,
                  },
                }}
                area={{
                  style: {
                    fill: "l(270) 0:#1890ff 0.5:#69c0ff 1:#bae7ff",
                    fillOpacity: 0.3,
                  },
                }}
              />
            </div>
          </TabPane>

          <TabPane
            tab={
              <span>
                <PieChartOutlined /> Regional Performance
              </span>
            }
            key="regional"
          >
            <div className="w-full h-80 flex items-center justify-center">
              <Pie
                data={regionData}
                angleField="revenue"
                colorField="region"
                radius={0.8}
                innerRadius={0.5}
                autoFit
                height={320}
                label={{
                  type: "outer",
                  content: "{name}: {percentage}",
                }}
                interactions={[{ type: "element-active" }]}
                color={["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"]}
              />
            </div>
          </TabPane>

          <TabPane
            tab={
              <span>
                <BarChartOutlined /> Quarterly Growth
              </span>
            }
            key="quarterly"
          >
            <div className="w-full h-80">
              <Column
                data={performanceData}
                xField="quarter"
                yField="revenue"
                autoFit
                height={320}
                columnStyle={{
                  fill: "linear-gradient(180deg, #1890ff 0%, #096dd9 100%)",
                  radius: [4, 4, 0, 0],
                }}
                label={{
                  position: "middle",
                  style: {
                    fill: "white",
                    fontSize: 12,
                    fontWeight: "bold",
                  },
                }}
              />
            </div>
          </TabPane>
        </Tabs>
      </Card>

      {/* Performance Insights */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Key Performance Indicators">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    Revenue Target Achievement
                  </span>
                  <span className="text-sm font-semibold">92%</span>
                </div>
                <Progress percent={92} strokeColor="#52c41a" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    Customer Retention Rate
                  </span>
                  <span className="text-sm font-semibold">87%</span>
                </div>
                <Progress percent={87} strokeColor="#1890ff" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    Market Penetration
                  </span>
                  <span className="text-sm font-semibold">64%</span>
                </div>
                <Progress percent={64} strokeColor="#faad14" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    Operational Efficiency
                  </span>
                  <span className="text-sm font-semibold">78%</span>
                </div>
                <Progress percent={78} strokeColor="#722ed1" />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Export Options">
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FilePdfOutlined className="text-red-500 text-xl" />
                    <div>
                      <div className="font-medium">PDF Report</div>
                      <div className="text-sm text-gray-500">
                        Complete analytical report
                      </div>
                    </div>
                  </div>
                  <Button type="primary">Download</Button>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileExcelOutlined className="text-green-500 text-xl" />
                    <div>
                      <div className="font-medium">Excel Data</div>
                      <div className="text-sm text-gray-500">
                        Raw data for analysis
                      </div>
                    </div>
                  </div>
                  <Button type="primary">Download</Button>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RiseOutlined className="text-blue-500 text-xl" />
                    <div>
                      <div className="font-medium">Interactive Dashboard</div>
                      <div className="text-sm text-gray-500">
                        Live data visualization
                      </div>
                    </div>
                  </div>
                  <Button type="primary">Open</Button>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Reports Table */}
      <Card title="Generated Reports">
        <Table
          columns={columns}
          dataSource={reportData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          loading={loading}
        />
      </Card>
    </div>
  );
}
