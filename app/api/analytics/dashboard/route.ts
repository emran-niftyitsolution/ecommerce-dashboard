import { withAuth } from "@/lib/auth";
import { AnalyticsService } from "@/lib/db-utils";
import { ApiResponse } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

// GET /api/analytics/dashboard - Get dashboard analytics
export const GET = withAuth(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "overview";

    let data;

    switch (type) {
      case "overview":
        data = await AnalyticsService.getDashboardStats();
        break;
      case "revenue":
        data = await AnalyticsService.getRevenueByMonth();
        break;
      default:
        data = await AnalyticsService.getDashboardStats();
    }

    return NextResponse.json({
      success: true,
      data,
    } as ApiResponse);
  } catch (error) {
    console.error("Get analytics error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      } as ApiResponse,
      { status: 500 }
    );
  }
}, []);
