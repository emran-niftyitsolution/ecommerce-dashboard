import { withAuth } from "@/lib/auth";
import { UserService } from "@/lib/db-utils-mongoose";
import { ApiResponse, UpdateUserRequest } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

// GET /api/users/[id] - Get user by ID
export const GET = withAuth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params;
      const user = await UserService.findById(id);

      if (!user) {
        return NextResponse.json(
          {
            success: false,
            error: "User not found",
          } as ApiResponse,
          { status: 404 }
        );
      }

      // Return user data without password
      const { password: _password, ...userWithoutPassword } = user;

      return NextResponse.json({
        success: true,
        data: userWithoutPassword,
      } as ApiResponse);
    } catch (error) {
      console.error("Get user error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Internal server error",
        } as ApiResponse,
        { status: 500 }
      );
    }
  },
  []
);

// PUT /api/users/[id] - Update user
export const PUT = withAuth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params;
      const updateData: UpdateUserRequest = await request.json();

      // Check if user exists
      const existingUser = await UserService.findById(id);
      if (!existingUser) {
        return NextResponse.json(
          {
            success: false,
            error: "User not found",
          } as ApiResponse,
          { status: 404 }
        );
      }

      // Update user
      const updatedUser = await UserService.update(id, updateData);
      if (!updatedUser) {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to update user",
          } as ApiResponse,
          { status: 500 }
        );
      }

      // Return user data without password
      const { password: _password, ...userWithoutPassword } = updatedUser;

      return NextResponse.json({
        success: true,
        data: userWithoutPassword,
        message: "User updated successfully",
      } as ApiResponse);
    } catch (error) {
      console.error("Update user error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Internal server error",
        } as ApiResponse,
        { status: 500 }
      );
    }
  },
  []
);

// DELETE /api/users/[id] - Delete user (admin only)
export const DELETE = withAuth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params;

      // Check if user exists
      const existingUser = await UserService.findById(id);
      if (!existingUser) {
        return NextResponse.json(
          {
            success: false,
            error: "User not found",
          } as ApiResponse,
          { status: 404 }
        );
      }

      // Delete user
      const deleted = await UserService.delete(id);
      if (!deleted) {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to delete user",
          } as ApiResponse,
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "User deleted successfully",
      } as ApiResponse);
    } catch (error) {
      console.error("Delete user error:", error);
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
