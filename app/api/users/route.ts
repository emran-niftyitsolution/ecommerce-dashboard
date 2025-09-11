import { AuthService, withAuth } from "@/lib/auth";
import { UserService } from "@/lib/db-utils";
import { ApiResponse, CreateUserRequest } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

// GET /api/users - List all users (admin only)
export const GET = withAuth(
  async (request: NextRequest) => {
    try {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "10");
      const search = searchParams.get("search") || "";

      let filter = {};
      if (search) {
        filter = {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        };
      }

      const result = await UserService.list(page, limit);

      return NextResponse.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      } as ApiResponse);
    } catch (error) {
      console.error("Get users error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Internal server error",
        } as ApiResponse,
        { status: 500 }
      );
    }
  },
  ["admin", "manager"]
);

// POST /api/users - Create new user (admin only)
export const POST = withAuth(
  async (request: NextRequest) => {
    try {
      const userData: CreateUserRequest = await request.json();

      // Validate required fields
      if (
        !userData.email ||
        !userData.password ||
        !userData.firstName ||
        !userData.lastName
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "All fields are required",
          } as ApiResponse,
          { status: 400 }
        );
      }

      // Check if user already exists
      const existingUser = await UserService.findByEmail(userData.email);
      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            error: "User with this email already exists",
          } as ApiResponse,
          { status: 409 }
        );
      }

      // Hash password
      const hashedPassword = await AuthService.hashPassword(userData.password);

      // Create user
      const user = await UserService.create({
        ...userData,
        password: hashedPassword,
        isActive: true,
      });

      // Return user data without password
      const { password: _, ...userWithoutPassword } = user;

      return NextResponse.json(
        {
          success: true,
          data: userWithoutPassword,
          message: "User created successfully",
        } as ApiResponse,
        { status: 201 }
      );
    } catch (error) {
      console.error("Create user error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Internal server error",
        } as ApiResponse,
        { status: 500 }
      );
    }
  },
  ["admin"]
);
