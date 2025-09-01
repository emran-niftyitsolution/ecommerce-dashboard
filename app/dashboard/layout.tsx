"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import {
  BarChartOutlined,
  BellOutlined,
  FileTextOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  ConfigProvider,
  Dropdown,
  Input,
  Layout,
  Menu,
  Modal,
} from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);
  const router = useRouter();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      setIsSearchModalVisible(true);
    }
  };

  const handleSearchResultClick = (type: string, id: string) => {
    setIsSearchModalVisible(false);
    setSearchQuery("");
    router.push(`/dashboard/${type}/${id}`);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownVisible(false);
    router.push("/dashboard/profile");
  };

  const handleLogout = () => {
    setIsProfileDropdownVisible(false);
    // Clear any auth tokens/storage here
    router.push("/login");
  };

  const menuItems = [
    {
      key: "/dashboard",
      icon: <HomeOutlined />,
      label: "Overview",
      onClick: () => router.push("/dashboard"),
    },
    {
      key: "/dashboard/analytics",
      icon: <BarChartOutlined />,
      label: "Analytics",
      onClick: () => router.push("/dashboard/analytics"),
    },
    {
      key: "/dashboard/profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => router.push("/dashboard/profile"),
    },
    {
      key: "/dashboard/users",
      icon: <TeamOutlined />,
      label: "Users",
      onClick: () => router.push("/dashboard/users"),
    },
    {
      key: "/dashboard/products",
      icon: <ShoppingCartOutlined />,
      label: "Products",
      onClick: () => router.push("/dashboard/products"),
    },
    {
      key: "/dashboard/orders",
      icon: <ShoppingOutlined />,
      label: "Orders",
      onClick: () => router.push("/dashboard/orders"),
    },
    {
      key: "/dashboard/vendors",
      icon: <ShopOutlined />,
      label: "Vendors",
      onClick: () => router.push("/dashboard/vendors"),
    },
    {
      key: "/dashboard/customers",
      icon: <UserOutlined />,
      label: "Customers",
      onClick: () => router.push("/dashboard/customers"),
    },
    {
      key: "/dashboard/reports",
      icon: <FileTextOutlined />,
      label: "Reports",
      onClick: () => router.push("/dashboard/reports"),
    },
    {
      key: "/dashboard/settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => router.push("/dashboard/settings"),
    },
  ];

  // Mock search data - in a real app, this would come from an API
  const searchData = {
    users: [
      {
        id: "USR-001",
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
      },
      {
        id: "USR-002",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Manager",
      },
      {
        id: "USR-003",
        name: "Mike Johnson",
        email: "mike@example.com",
        role: "User",
      },
    ],
    products: [
      {
        id: "PROD-001",
        name: "Wireless Headphones",
        category: "Electronics",
        price: "$89.99",
      },
      {
        id: "PROD-002",
        name: "Smart Watch",
        category: "Electronics",
        price: "$199.99",
      },
      {
        id: "PROD-003",
        name: "Running Shoes",
        category: "Sports",
        price: "$129.99",
      },
    ],
    orders: [
      {
        id: "ORD-001",
        customer: "John Doe",
        amount: "$299.99",
        status: "Delivered",
      },
      {
        id: "ORD-002",
        customer: "Jane Smith",
        amount: "$149.50",
        status: "Processing",
      },
      {
        id: "ORD-003",
        customer: "Mike Johnson",
        amount: "$89.99",
        status: "Shipped",
      },
    ],
  };

  const filteredSearchResults = () => {
    if (!searchQuery.trim()) return { users: [], products: [], orders: [] };

    const query = searchQuery.toLowerCase();
    return {
      users: searchData.users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      ),
      products: searchData.products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      ),
      orders: searchData.orders.filter(
        (order) =>
          order.customer.toLowerCase().includes(query) ||
          order.id.toLowerCase().includes(query)
      ),
    };
  };

  return (
    <StyleProvider layer>
      <ConfigProvider>
        <div className="min-h-screen bg-gray-50">
          <Layout className="min-h-screen">
            {/* Sidebar */}
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              className="bg-white shadow-xl border-r border-gray-100 fixed left-0 top-0 bottom-0 z-50"
              width={280}
              collapsedWidth={80}
              style={{ height: "100vh", overflowY: "auto" }}
            >
              {/* Brand */}
              <div className="h-16 flex items-center justify-center">
                <div className="text-center">
                  {collapsed ? (
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-black text-lg">D</span>
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-gray-900 font-black text-xl">
                        Dashboard
                      </h1>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="py-4">
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["/dashboard"]}
                  items={menuItems}
                  className="border-none bg-white"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                />
              </div>
            </Sider>

            {/* Main Layout */}
            <Layout
              style={{
                marginLeft: collapsed ? 80 : 280,
                transition: "margin-left 0.2s",
              }}
            >
              {/* Header */}
              <Header
                className="!bg-white !px-6 shadow-sm border-b border-gray-100 !fixed !top-0 !right-0 !z-40"
                style={{ left: collapsed ? 80 : 280, transition: "left 0.2s" }}
              >
                <div className="flex items-center justify-between h-full">
                  <div className="flex items-center gap-4">
                    <Button
                      type="text"
                      icon={
                        collapsed ? (
                          <MenuUnfoldOutlined />
                        ) : (
                          <MenuFoldOutlined />
                        )
                      }
                      onClick={() => setCollapsed(!collapsed)}
                      size="large"
                      className="hover:bg-gray-100"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Search */}
                    <Input
                      placeholder="Search users, products, orders..."
                      prefix={<SearchOutlined />}
                      className="w-64"
                      size="large"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onPressEnter={(e) =>
                        handleSearch((e.target as HTMLInputElement).value)
                      }
                      onFocus={() =>
                        searchQuery.trim() && setIsSearchModalVisible(true)
                      }
                    />

                    {/* Notifications */}
                    <Badge count={3} size="small">
                      <Button
                        type="text"
                        icon={<BellOutlined />}
                        size="large"
                        className="hover:bg-gray-100"
                      />
                    </Badge>

                    {/* Profile Dropdown */}
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: "profile",
                            icon: <UserOutlined />,
                            label: "Profile",
                            onClick: handleProfileClick,
                          },
                          {
                            type: "divider",
                          },
                          {
                            key: "logout",
                            icon: <LogoutOutlined />,
                            label: "Logout",
                            onClick: handleLogout,
                          },
                        ],
                      }}
                      placement="bottomRight"
                      trigger={["click"]}
                      open={isProfileDropdownVisible}
                      onOpenChange={setIsProfileDropdownVisible}
                    >
                      <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <div className="hidden md:block text-right">
                          <div className="text-sm font-medium text-gray-900">
                            John Doe
                          </div>
                          <div className="text-xs text-gray-500">
                            john.doe@example.com
                          </div>
                        </div>
                        <Avatar
                          size={40}
                          className="rounded-full"
                          icon={<UserOutlined />}
                          style={{
                            background:
                              "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                          }}
                        />
                      </div>
                    </Dropdown>
                  </div>
                </div>
              </Header>

              {/* Content */}
              <Content
                className="p-5 bg-gray-50"
                style={{ marginTop: 64, minHeight: "calc(100vh - 64px)" }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </div>

        {/* Global Search Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <SearchOutlined className="text-blue-600" />
              <span>Global Search</span>
            </div>
          }
          open={isSearchModalVisible}
          onCancel={() => {
            setIsSearchModalVisible(false);
            setSearchQuery("");
          }}
          footer={null}
          width={600}
          destroyOnClose
          centered
        >
          <div className="space-y-4">
            {/* Search Input */}
            <Input
              placeholder="Search users, products, orders..."
              prefix={<SearchOutlined />}
              size="large"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onPressEnter={(e) =>
                handleSearch((e.target as HTMLInputElement).value)
              }
              autoFocus
            />

            {/* Search Results */}
            {searchQuery.trim() && (
              <div className="space-y-4">
                {(() => {
                  const results = filteredSearchResults();
                  const totalResults =
                    results.users.length +
                    results.products.length +
                    results.orders.length;

                  if (totalResults === 0) {
                    return (
                      <div className="text-center py-8 text-gray-500">
                        <SearchOutlined className="text-4xl mb-2 text-gray-300" />
                        <p>No results found for &quot;{searchQuery}&quot;</p>
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-4">
                      {/* Users Results */}
                      {results.users.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <TeamOutlined className="text-blue-600" />
                            Users ({results.users.length})
                          </h4>
                          <div className="space-y-2">
                            {results.users.map((user) => (
                              <div
                                key={user.id}
                                className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                onClick={() =>
                                  handleSearchResultClick("users", user.id)
                                }
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {user.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {user.email}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xs text-gray-400">
                                      {user.role}
                                    </div>
                                    <div className="text-xs text-blue-600">
                                      {user.id}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Products Results */}
                      {results.products.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <ShoppingCartOutlined className="text-green-600" />
                            Products ({results.products.length})
                          </h4>
                          <div className="space-y-2">
                            {results.products.map((product) => (
                              <div
                                key={product.id}
                                className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                onClick={() =>
                                  handleSearchResultClick(
                                    "products",
                                    product.id
                                  )
                                }
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {product.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {product.category}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xs text-gray-400">
                                      {product.price}
                                    </div>
                                    <div className="text-xs text-green-600">
                                      {product.id}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Orders Results */}
                      {results.orders.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <ShoppingOutlined className="text-orange-600" />
                            Orders ({results.orders.length})
                          </h4>
                          <div className="space-y-2">
                            {results.orders.map((order) => (
                              <div
                                key={order.id}
                                className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                onClick={() =>
                                  handleSearchResultClick("orders", order.id)
                                }
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {order.customer}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {order.id}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xs text-gray-400">
                                      {order.amount}
                                    </div>
                                    <div className="text-xs text-orange-600">
                                      {order.status}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </Modal>
      </ConfigProvider>
    </StyleProvider>
  );
}
