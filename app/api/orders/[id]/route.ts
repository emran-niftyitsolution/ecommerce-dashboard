import { withAuth } from "@/lib/auth";
import { OrderService } from "@/lib/db-utils-mongoose";
import { ApiResponse, UpdateOrderRequest } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

// GET /api/orders/[id] - Get order by ID
export const GET = withAuth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params;
      const order = await OrderService.findById(id);

      if (!order) {
        return NextResponse.json(
          {
            success: false,
            error: "Order not found",
          } as ApiResponse,
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: order,
      } as ApiResponse);
    } catch (error) {
      console.error("Get order error:", error);
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

// PUT /api/orders/[id] - Update order (admin/manager only)
export const PUT = withAuth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params;
      const updateData: UpdateOrderRequest = await request.json();

      // Check if order exists
      const existingOrder = await OrderService.findById(id);
      if (!existingOrder) {
        return NextResponse.json(
          {
            success: false,
            error: "Order not found",
          } as ApiResponse,
          { status: 404 }
        );
      }

      // Update order
      const updatedOrder = await OrderService.update(id, updateData);
      if (!updatedOrder) {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to update order",
          } as ApiResponse,
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: updatedOrder,
        message: "Order updated successfully",
      } as ApiResponse);
    } catch (error) {
      console.error("Update order error:", error);
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

// DELETE /api/orders/[id] - Delete order (admin only)
export const DELETE = withAuth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params;

      // Check if order exists
      const existingOrder = await OrderService.findById(id);
      if (!existingOrder) {
        return NextResponse.json(
          {
            success: false,
            error: "Order not found",
          } as ApiResponse,
          { status: 404 }
        );
      }

      // Delete order
      const deleted = await OrderService.delete(id);
      if (!deleted) {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to delete order",
          } as ApiResponse,
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Order deleted successfully",
      } as ApiResponse);
    } catch (error) {
      console.error("Delete order error:", error);
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
