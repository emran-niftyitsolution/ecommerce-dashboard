import { withAuth } from "@/lib/auth";
import { CustomerService } from "@/lib/db-utils";
import { ApiResponse, Customer } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

// GET /api/customers - List all customers
export const GET = withAuth(async (request: NextRequest) => {
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

    const result = await CustomerService.list(page, limit, filter);

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    } as ApiResponse);
  } catch (error) {
    console.error("Get customers error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      } as ApiResponse,
      { status: 500 }
    );
  }
}, []);

// POST /api/customers - Create new customer
export const POST = withAuth(async (request: NextRequest) => {
  try {
    const customerData: Omit<Customer, "_id" | "createdAt" | "updatedAt"> =
      await request.json();

    // Validate required fields
    if (
      !customerData.firstName ||
      !customerData.lastName ||
      !customerData.email
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "First name, last name, and email are required",
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Check if customer already exists
    const existingCustomer = await CustomerService.findByEmail(
      customerData.email
    );
    if (existingCustomer) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer with this email already exists",
        } as ApiResponse,
        { status: 409 }
      );
    }

    // Create customer
    const customer = await CustomerService.create({
      ...customerData,
      totalOrders: 0,
      totalSpent: 0,
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        data: customer,
        message: "Customer created successfully",
      } as ApiResponse,
      { status: 201 }
    );
  } catch (error) {
    console.error("Create customer error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      } as ApiResponse,
      { status: 500 }
    );
  }
}, []);
