import { AuthService } from "@/lib/auth";
import { UserService } from "@/lib/db-utils-mongoose";
import { ApiResponse } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const user = await AuthService.verifyAuth(authHeader);

    // Get fresh user data from database
    const userData = await UserService.findById(user.id);
    if (!userData) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = userData;

    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
    } as ApiResponse);
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
      } as ApiResponse,
      { status: 401 }
    );
  }
}
