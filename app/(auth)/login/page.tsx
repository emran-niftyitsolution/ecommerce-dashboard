"use client";

import { apiClient } from "@/lib/api-client";
import {
  GithubOutlined,
  GoogleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Alert, Button, Checkbox, Divider, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";

// Note: Metadata is handled in the layout or a parent server component
// since this is now a client component

export default function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onFinish = async (values: {
    email: string;
    password: string;
    remember?: boolean;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.login(values.email, values.password);

      if (response.success) {
        message.success("Login successful!");
        router.push("/dashboard");
      } else {
        setError(response.error || "Login failed");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left Panel - Illustration */}
        <div className="relative hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-lg">
            {/* Professional Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Enterprise Ready
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                Dashboard Pro
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-blue-100 leading-relaxed max-w-md">
              Access your professional workspace with enterprise-grade security
              and seamless collaboration tools.
            </p>

            {/* Custom SVG Illustration */}
            <div className="mt-8 w-80 h-80">
              <svg
                viewBox="0 0 320 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Background Circle */}
                <circle
                  cx="160"
                  cy="160"
                  r="150"
                  fill="url(#gradient1)"
                  opacity="0.3"
                />

                {/* Main Dashboard Frame */}
                <rect
                  x="80"
                  y="100"
                  width="160"
                  height="120"
                  rx="12"
                  fill="url(#gradient2)"
                  stroke="white"
                  strokeWidth="2"
                />

                {/* Header Bar */}
                <rect
                  x="80"
                  y="100"
                  width="160"
                  height="24"
                  rx="12"
                  fill="white"
                  opacity="0.9"
                />

                {/* Menu Dots */}
                <circle cx="140" cy="112" r="2" fill="#64748b" />
                <circle cx="150" cy="112" r="2" fill="#64748b" />
                <circle cx="160" cy="112" r="2" fill="#64748b" />

                {/* Content Grid */}
                <rect
                  x="90"
                  y="140"
                  width="40"
                  height="30"
                  rx="6"
                  fill="white"
                  opacity="0.7"
                />
                <rect
                  x="140"
                  y="140"
                  width="40"
                  height="30"
                  rx="6"
                  fill="white"
                  opacity="0.7"
                />
                <rect
                  x="190"
                  y="140"
                  width="40"
                  height="30"
                  rx="6"
                  fill="white"
                  opacity="0.7"
                />
                <rect
                  x="90"
                  y="180"
                  width="40"
                  height="30"
                  rx="6"
                  fill="white"
                  opacity="0.7"
                />
                <rect
                  x="140"
                  y="180"
                  width="40"
                  height="30"
                  rx="6"
                  fill="white"
                  opacity="0.7"
                />
                <rect
                  x="190"
                  y="180"
                  width="40"
                  height="30"
                  rx="6"
                  fill="white"
                  opacity="0.7"
                />

                {/* Floating Elements */}
                <circle
                  cx="60"
                  cy="80"
                  r="8"
                  fill="url(#gradient3)"
                  opacity="0.8"
                />
                <circle
                  cx="260"
                  cy="120"
                  r="6"
                  fill="url(#gradient4)"
                  opacity="0.6"
                />
                <circle
                  cx="280"
                  cy="200"
                  r="10"
                  fill="url(#gradient5)"
                  opacity="0.7"
                />

                {/* Connection Lines */}
                <path
                  d="M60 88 L80 100"
                  stroke="white"
                  strokeWidth="2"
                  opacity="0.6"
                />
                <path
                  d="M260 126 L240 100"
                  stroke="white"
                  strokeWidth="2"
                  opacity="0.6"
                />
                <path
                  d="M280 190 L240 220"
                  stroke="white"
                  strokeWidth="2"
                  opacity="0.6"
                />

                {/* Gradients */}
                <defs>
                  <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient
                    id="gradient2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#1e40af" />
                    <stop offset="100%" stopColor="#3730a3" />
                  </linearGradient>
                  <linearGradient
                    id="gradient3"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient
                    id="gradient4"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <linearGradient
                    id="gradient5"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-blue-100">Secure</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-blue-100">Fast</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-blue-100">Team</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-6 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to your account to continue
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
              {error && (
                <Alert
                  message="Login Error"
                  description={error}
                  type="error"
                  showIcon
                  className="mb-6"
                />
              )}

              <Form
                form={form}
                name="login"
                onFinish={onFinish}
                layout="vertical"
                size="large"
                className="space-y-6"
              >
                <Form.Item
                  name="email"
                  label={
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Email address
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    prefix={<MdEmail className="text-gray-400" />}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="h-12 rounded-xl border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  />
                </Form.Item>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    className="mb-0"
                  >
                    <Input.Password
                      prefix={<MdLock className="text-gray-400" />}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="h-12 rounded-xl border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  className="mb-6"
                >
                  <Checkbox className="text-gray-700 dark:text-gray-300">
                    Remember me for 30 days
                  </Checkbox>
                </Form.Item>

                <Form.Item className="mb-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 border-0 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {loading ? (
                      <>
                        <LoadingOutlined className="mr-2" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in to account"
                    )}
                  </Button>
                </Form.Item>
              </Form>

              {/* Divider */}
              <Divider plain className="text-gray-500 dark:text-gray-400">
                <span className="px-4 bg-white dark:bg-gray-800 text-sm">
                  or continue with
                </span>
              </Divider>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  icon={<GoogleOutlined />}
                  className="h-12 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-200"
                >
                  Google
                </Button>
                <Button
                  icon={<GithubOutlined />}
                  className="h-12 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-200"
                >
                  GitHub
                </Button>
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Demo Credentials
              </h4>
              <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                <div>
                  <strong>Admin:</strong> admin@dashboard.com / admin123
                </div>
                <div>
                  <strong>Manager:</strong> manager@dashboard.com / manager123
                </div>
                <div>
                  <strong>User:</strong> user@dashboard.com / user123
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Create one now
                </Link>
              </p>
            </div>

            {/* Terms */}
            <div className="text-center mt-6">
              <p className="text-xs text-gray-500 dark:text-gray-500">
                By continuing, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
