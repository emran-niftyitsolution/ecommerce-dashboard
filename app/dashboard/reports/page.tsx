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

  // Sample data for various charts
  const salesData = [
    { month: "Jan", sales: 125000, target: 120000 },
    { month: "Feb", sales: 132000, target: 125000 },
    { month: "Mar", sales: 118000, target: 130000 },
    { month: "Apr", sales: 145000, target: 135000 },
    { month: "May", sales: 167000, target: 140000 },
    { month: "Jun", sales: 189000, target: 150000 },
    { month: "Jul", sales: 203000, target: 160000 },
    { month: "Aug", sales: 198000, target: 170000 },
  ];

  const regionData = [
    {
      region: "North America",
      revenue: 350000,
      color: "#3b82f6",
      percentage: 25.2,
    },
    { region: "Europe", revenue: 280000, color: "#10b981", percentage: 20.1 },
    {
      region: "Asia Pacific",
      revenue: 420000,
      color: "#f59e0b",
      percentage: 30.2,
    },
    {
      region: "Latin America",
      revenue: 190000,
      color: "#8b5cf6",
      percentage: 13.7,
    },
    {
      region: "Middle East",
      revenue: 140000,
      color: "#ef4444",
      percentage: 10.1,
    },
  ];

  const performanceData = [
    { quarter: "Q1", revenue: 420000, profit: 89000, customers: 1250 },
    { quarter: "Q2", revenue: 560000, profit: 125000, customers: 1680 },
    { quarter: "Q3", revenue: 680000, profit: 156000, customers: 1950 },
    { quarter: "Q4", revenue: 780000, profit: 198000, customers: 2340 },
  ];

  const reportData = [
    {
      key: "1",
      name: "Q3 Financial Report",
      type: "Financial",
      status: "completed",
      date: "2024-01-15",
      size: "2.4 MB",
      downloads: 45,
    },
    {
      key: "2",
      name: "Customer Analytics",
      type: "Analytics",
      status: "processing",
      date: "2024-01-14",
      size: "1.8 MB",
      downloads: 23,
    },
    {
      key: "3",
      name: "Sales Performance",
      type: "Sales",
      status: "completed",
      date: "2024-01-13",
      size: "3.1 MB",
      downloads: 67,
    },
    {
      key: "4",
      name: "Marketing ROI Analysis",
      type: "Marketing",
      status: "failed",
      date: "2024-01-12",
      size: "0 MB",
      downloads: 0,
    },
  ];

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
      render: (record: any) => (
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
