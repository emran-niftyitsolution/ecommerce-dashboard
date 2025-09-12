import { withAuth } from "@/lib/auth";
import { CustomerService } from "@/lib/db-utils-mongoose";
import { ApiResponse, Customer } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

// GET /api/customers/[id] - Get customer by ID
export const GET = withAuth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params;
      const customer = await CustomerService.findById(id);

      if (!customer) {
        return NextResponse.json(
          {
            success: false,
            error: "Customer not found",
          } as ApiResponse,
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: customer,
      } as ApiResponse);
    } catch (error) {
      console.error("Get customer error:", error);
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

// PUT /api/customers/[id] - Update customer
export const PUT = withAuth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params;
      const updateData: Partial<Customer> = await request.json();

      // Check if customer exists
      const existingCustomer = await CustomerService.findById(id);
      if (!existingCustomer) {
        return NextResponse.json(
          {
            success: false,
            error: "Customer not found",
          } as ApiResponse,
          { status: 404 }
        );
      }

      // Update customer
      const updatedCustomer = await CustomerService.update(id, updateData);
      if (!updatedCustomer) {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to update customer",
          } as ApiResponse,
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: updatedCustomer,
        message: "Customer updated successfully",
      } as ApiResponse);
    } catch (error) {
      console.error("Update customer error:", error);
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

// DELETE /api/customers/[id] - Delete customer (admin only)
export const DELETE = withAuth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params;

      // Check if customer exists
      const existingCustomer = await CustomerService.findById(id);
      if (!existingCustomer) {
        return NextResponse.json(
          {
            success: false,
            error: "Customer not found",
          } as ApiResponse,
          { status: 404 }
        );
      }

      // Delete customer
      const deleted = await CustomerService.delete(id);
      if (!deleted) {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to delete customer",
          } as ApiResponse,
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Customer deleted successfully",
      } as ApiResponse);
    } catch (error) {
      console.error("Delete customer error:", error);
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
