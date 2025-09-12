import { withAuth } from "@/lib/auth";
import { ProductService } from "@/lib/db-utils-mongoose";
import { ApiResponse, CreateProductRequest } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

// GET /api/products - List all products
export const GET = withAuth(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const isActive = searchParams.get("isActive");

    const filter: Record<string, unknown> = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (isActive !== null && isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    const result = await ProductService.list(page, limit, filter);

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    } as ApiResponse);
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      } as ApiResponse,
      { status: 500 }
    );
  }
}, []);

// POST /api/products - Create new product (admin/manager only)
export const POST = withAuth(
  async (request: NextRequest) => {
    try {
      const productData: CreateProductRequest = await request.json();

      // Validate required fields
      if (
        !productData.name ||
        !productData.price ||
        !productData.category ||
        !productData.sku
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Name, price, category, and SKU are required",
          } as ApiResponse,
          { status: 400 }
        );
      }

      // Check if SKU already exists
      const existingProduct = await ProductService.findBySku(productData.sku);
      if (existingProduct) {
        return NextResponse.json(
          {
            success: false,
            error: "Product with this SKU already exists",
          } as ApiResponse,
          { status: 409 }
        );
      }

      // Create product
      const product = await ProductService.create({
        ...productData,
        stock: productData.stock || 0,
        images: productData.images || [],
        tags: productData.tags || [],
        isActive: true,
      });

      return NextResponse.json(
        {
          success: true,
          data: product,
          message: "Product created successfully",
        } as ApiResponse,
        { status: 201 }
      );
    } catch (error) {
      console.error("Create product error:", error);
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
