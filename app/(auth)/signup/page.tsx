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
import { MdEmail, MdLock, MdPerson } from "react-icons/md";

// Note: Metadata is handled in the layout or a parent server component
// since this is now a client component

export default function SignUpPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agree?: boolean;
  }) => {
    try {
      setLoading(true);
      setError(null);

      // Split name into firstName and lastName
      const nameParts = values.name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || "";

      const response = await apiClient.register({
        email: values.email,
        password: values.password,
        firstName,
        lastName,
        role: "user",
      });

      if (response.success) {
        message.success("Account created successfully!");
        // Set the token and redirect to dashboard
        apiClient.setToken(response.data.token);
        router.push("/dashboard");
      } else {
        setError(response.error || "Registration failed");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      setError(errorMessage);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left side - Illustration */}
        <div className="hidden lg:flex items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-indigo-600/20"></div>

          {/* Custom SVG Illustration for Sign Up */}
          <div className="relative z-10 max-w-lg">
            <svg
              className="w-full h-auto drop-shadow-2xl"
              viewBox="0 0 400 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background circles */}
              <circle
                cx="350"
                cy="50"
                r="30"
                fill="url(#gradient1)"
                opacity="0.3"
              />
              <circle
                cx="50"
                cy="300"
                r="40"
                fill="url(#gradient2)"
                opacity="0.2"
              />

              {/* Main illustration - User creation/registration */}
              <rect
                x="80"
                y="80"
                width="240"
                height="200"
                rx="20"
                fill="url(#cardGradient)"
              />

              {/* Form elements */}
              <rect
                x="100"
                y="120"
                width="200"
                height="12"
                rx="6"
                fill="#E2E8F0"
              />
              <rect
                x="100"
                y="140"
                width="160"
                height="12"
                rx="6"
                fill="#E2E8F0"
              />
              <rect
                x="100"
                y="160"
                width="180"
                height="12"
                rx="6"
                fill="#E2E8F0"
              />
              <rect
                x="100"
                y="180"
                width="140"
                height="12"
                rx="6"
                fill="#E2E8F0"
              />

              {/* Submit button */}
              <rect
                x="100"
                y="220"
                width="200"
                height="30"
                rx="15"
                fill="url(#buttonGradient)"
              />
              <text
                x="200"
                y="240"
                textAnchor="middle"
                className="fill-white text-sm font-medium"
              >
                Create Account
              </text>

              {/* User avatar */}
              <circle cx="200" cy="50" r="25" fill="url(#avatarGradient)" />
              <circle cx="200" cy="45" r="8" fill="white" opacity="0.9" />
              <path
                d="M185 60 Q200 70 215 60"
                stroke="white"
                strokeWidth="3"
                fill="none"
                opacity="0.9"
              />

              {/* Success checkmark */}
              <circle cx="330" cy="120" r="20" fill="#10B981" />
              <path
                d="M322 120 L328 126 L338 114"
                stroke="white"
                strokeWidth="3"
                fill="none"
              />

              {/* Decorative elements */}
              <rect
                x="60"
                y="320"
                width="280"
                height="8"
                rx="4"
                fill="url(#gradient3)"
                opacity="0.4"
              />

              <defs>
                <linearGradient
                  id="gradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient
                  id="gradient2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
                <linearGradient
                  id="gradient3"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
                <linearGradient
                  id="cardGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F8FAFC" />
                </linearGradient>
                <linearGradient
                  id="buttonGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
                <linearGradient
                  id="avatarGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>

            <div className="mt-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Join Our Community
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Create your account and start building amazing experiences with
                our platform.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Sign up form */}
        <div className="flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Create Account
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Join thousands of users already using our platform
              </p>
            </div>

            {/* Social Sign Up */}
            <div className="flex gap-x-3 mb-6">
              <Button
                type="default"
                size="large"
                icon={<GoogleOutlined />}
                className="w-full h-12 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
              >
                Continue with Google
              </Button>
              <Button
                type="default"
                size="large"
                icon={<GithubOutlined />}
                className="w-full h-12 border-gray-200 hover:border-gray-400 hover:text-gray-700 transition-all duration-200"
              >
                Continue with GitHub
              </Button>
            </div>

            <Divider className="my-6">
              <span className="text-gray-500 text-sm px-4">
                or continue with email
              </span>
            </Divider>

            {/* Error Alert */}
            {error && (
              <Alert
                message="Registration Error"
                description={error}
                type="error"
                showIcon
                className="mb-6"
              />
            )}

            {/* Sign Up Form */}
            <Form
              form={form}
              name="signup"
              onFinish={onFinish}
              layout="vertical"
              requiredMark={false}
              className="space-y-1"
            >
              {/* Full Name Field */}
              <div className="space-y-2">
                <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                  Full Name
                </label>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your full name!",
                    },
                    {
                      min: 2,
                      message: "Name must be at least 2 characters!",
                    },
                  ]}
                  className="mb-0"
                >
                  <Input
                    prefix={<MdPerson className="text-gray-400" />}
                    placeholder="John Doe"
                    autoComplete="name"
                    size="large"
                    className="h-12"
                  />
                </Form.Item>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                  Email Address
                </label>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email!",
                    },
                  ]}
                  className="mb-0"
                >
                  <Input
                    prefix={<MdEmail className="text-gray-400" />}
                    placeholder="you@example.com"
                    autoComplete="email"
                    size="large"
                    className="h-12"
                  />
                </Form.Item>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                  Password
                </label>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters!",
                    },
                  ]}
                  className="mb-0"
                >
                  <Input.Password
                    prefix={<MdLock className="text-gray-400" />}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    size="large"
                    className="h-12"
                  />
                </Form.Item>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                  Confirm Password
                </label>
                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The passwords do not match!")
                        );
                      },
                    }),
                  ]}
                  className="mb-0"
                >
                  <Input.Password
                    prefix={<MdLock className="text-gray-400" />}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    size="large"
                    className="h-12"
                  />
                </Form.Item>
              </div>

              {/* Terms Agreement */}
              <Form.Item
                name="agree"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Please accept the terms and conditions!")
                          ),
                  },
                ]}
                className="mt-4"
              >
                <Checkbox className="text-sm">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Privacy Policy
                  </Link>
                </Checkbox>
              </Form.Item>

              {/* Submit Button */}
              <Form.Item className="mt-6 mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  disabled={loading}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <LoadingOutlined className="mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </Form.Item>
            </Form>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
