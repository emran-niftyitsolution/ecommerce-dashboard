import { withAuth } from "@/lib/auth";
import { ProductService } from "@/lib/db-utils-mongoose";
import { ApiResponse, UpdateProductRequest } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

// GET /api/products/[id] - Get product by ID
export const GET = withAuth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params;
      const product = await ProductService.findById(id);

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            error: "Product not found",
          } as ApiResponse,
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: product,
      } as ApiResponse);
    } catch (error) {
      console.error("Get product error:", error);
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

// PUT /api/products/[id] - Update product (admin/manager only)
export const PUT = withAuth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params;
      const updateData: UpdateProductRequest = await request.json();

      // Check if product exists
      const existingProduct = await ProductService.findById(id);
      if (!existingProduct) {
        return NextResponse.json(
          {
            success: false,
            error: "Product not found",
          } as ApiResponse,
          { status: 404 }
        );
      }

      // Update product
      const updatedProduct = await ProductService.update(id, updateData);
      if (!updatedProduct) {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to update product",
          } as ApiResponse,
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: updatedProduct,
        message: "Product updated successfully",
      } as ApiResponse);
    } catch (error) {
      console.error("Update product error:", error);
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

// DELETE /api/products/[id] - Delete product (admin only)
export const DELETE = withAuth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params;

      // Check if product exists
      const existingProduct = await ProductService.findById(id);
      if (!existingProduct) {
        return NextResponse.json(
          {
            success: false,
            error: "Product not found",
          } as ApiResponse,
          { status: 404 }
        );
      }

      // Delete product
      const deleted = await ProductService.delete(id);
      if (!deleted) {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to delete product",
          } as ApiResponse,
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Product deleted successfully",
      } as ApiResponse);
    } catch (error) {
      console.error("Delete product error:", error);
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
