"use client";

import { Button, Form, Input } from "antd";
import Link from "next/link";
import { MdArrowBack, MdEmail } from "react-icons/md";

// Note: Metadata is handled in the layout or a parent server component
// since this is now a client component

export default function ForgotPasswordPage() {
  const [form] = Form.useForm();

  const onFinish = (values: { email: string }) => {
    console.log("Success:", values);
    // Handle forgot password logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left side - Illustration */}
        <div className="hidden lg:flex items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-indigo-600/20"></div>

          {/* Custom SVG Illustration for Password Reset */}
          <div className="relative z-10 max-w-lg">
            <svg
              className="w-full h-auto drop-shadow-2xl"
              viewBox="0 0 400 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background elements */}
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

              {/* Main illustration - Lock and key */}
              <rect
                x="150"
                y="120"
                width="100"
                height="120"
                rx="15"
                fill="url(#lockGradient)"
              />

              {/* Lock body */}
              <rect
                x="170"
                y="160"
                width="60"
                height="60"
                rx="8"
                fill="#374151"
              />

              {/* Lock shackle */}
              <path
                d="M180 160 Q180 140 200 140 Q220 140 220 160"
                stroke="#6B7280"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />

              {/* Keyhole */}
              <circle cx="200" cy="185" r="6" fill="#9CA3AF" />
              <rect x="198" y="185" width="4" height="15" fill="#9CA3AF" />

              {/* Email envelope */}
              <rect
                x="90"
                y="80"
                width="80"
                height="50"
                rx="8"
                fill="url(#envelopeGradient)"
              />
              <path
                d="M90 90 L130 110 L170 90"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />

              {/* Reset arrow */}
              <path
                d="M280 180 Q320 160 320 200 Q320 240 280 220"
                stroke="url(#arrowGradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                markerEnd="url(#arrowhead)"
              />

              {/* Success indicator */}
              <circle cx="320" cy="100" r="18" fill="#10B981" />
              <path
                d="M312 100 L318 106 L328 94"
                stroke="white"
                strokeWidth="3"
                fill="none"
              />

              {/* Decorative dots */}
              <circle
                cx="60"
                cy="180"
                r="4"
                fill="url(#gradient1)"
                opacity="0.6"
              />
              <circle
                cx="80"
                cy="200"
                r="3"
                fill="url(#gradient2)"
                opacity="0.6"
              />
              <circle
                cx="340"
                cy="260"
                r="5"
                fill="url(#gradient1)"
                opacity="0.6"
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
                  id="lockGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F1F5F9" />
                </linearGradient>
                <linearGradient
                  id="envelopeGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
                <linearGradient
                  id="arrowGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="10"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="url(#arrowGradient)"
                  />
                </marker>
              </defs>
            </svg>

            <div className="mt-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Reset Your Password
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                No worries! Enter your email and we&apos;ll send you a reset
                link to get back into your account.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Forgot password form */}
        <div className="flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            {/* Back to Login */}
            <div className="mb-8">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <MdArrowBack className="mr-2" />
                Back to login
              </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Forgot Password?
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your email address and we&apos;ll send you a link to reset
                your password.
              </p>
            </div>

            {/* Forgot Password Form */}
            <Form
              form={form}
              name="forgot-password"
              onFinish={onFinish}
              layout="vertical"
              requiredMark={false}
              className="space-y-1"
            >
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

              {/* Submit Button */}
              <Form.Item className="mt-6 mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Send Reset Link
                </Button>
              </Form.Item>
            </Form>

            {/* Help Text */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Having trouble?</strong> If you don&apos;t receive an
                email within a few minutes, check your spam folder or{" "}
                <Link href="/contact" className="underline hover:no-underline">
                  contact support
                </Link>
                .
              </p>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
