import { AuthService } from "@/lib/auth";
import { UserService } from "@/lib/db-utils-mongoose";
import { ApiResponse } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password are required",
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Find user by email
    const user = await UserService.findByEmail(email);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid credentials",
        } as ApiResponse,
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await AuthService.verifyPassword(
      password,
      user.password
    );
    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid credentials",
        } as ApiResponse,
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: "Account is deactivated",
        } as ApiResponse,
        { status: 401 }
      );
    }

    // Update last login
    await UserService.update(user._id!.toString(), { lastLogin: new Date() });

    // Generate token
    const token = AuthService.generateToken(user);

    // Return user data without password
    const { password: _password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
      message: "Login successful",
    } as ApiResponse);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      } as ApiResponse,
      { status: 500 }
    );
  }
}
