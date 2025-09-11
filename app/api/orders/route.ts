import { AuthService, withAuth } from "@/lib/auth";
import { CustomerService, OrderService, ProductService } from "@/lib/db-utils";
import { ApiResponse, CreateOrderRequest } from "@/lib/types";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// GET /api/orders - List all orders
export const GET = withAuth(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") || "";
    const customerId = searchParams.get("customerId") || "";

    const filter: Record<string, unknown> = {};

    if (status) {
      filter.status = status;
    }

    if (customerId) {
      filter.customerId = new ObjectId(customerId);
    }

    const result = await OrderService.list(page, limit, filter);

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    } as ApiResponse);
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      } as ApiResponse,
      { status: 500 }
    );
  }
}, []);

// POST /api/orders - Create new order
export const POST = withAuth(async (request: NextRequest) => {
  try {
    const orderData: CreateOrderRequest = await request.json();

    // Validate required fields
    if (
      !orderData.customerId ||
      !orderData.items ||
      !orderData.shippingAddress ||
      !orderData.billingAddress
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Customer ID, items, shipping address, and billing address are required",
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Validate items
    if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "At least one item is required",
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Check if customer exists
    const customer = await CustomerService.findById(orderData.customerId);
    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer not found",
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Validate products and calculate total
    let total = 0;
    const validatedItems = [];

    for (const item of orderData.items) {
      const product = await ProductService.findById(item.productId);
      if (!product) {
        return NextResponse.json(
          {
            success: false,
            error: `Product with ID ${item.productId} not found`,
          } as ApiResponse,
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            error: `Insufficient stock for product ${product.name}`,
          } as ApiResponse,
          { status: 400 }
        );
      }

      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      validatedItems.push({
        ...item,
        name: product.name,
      });
    }

    // Create order
    const order = await OrderService.create({
      orderNumber: AuthService.generateOrderNumber(),
      customerId: new ObjectId(orderData.customerId),
      items: validatedItems,
      total,
      status: "pending",
      shippingAddress: orderData.shippingAddress,
      billingAddress: orderData.billingAddress,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: "pending",
      notes: orderData.notes,
    });

    // Update product stock
    for (const item of orderData.items) {
      await ProductService.updateStock(item.productId, -item.quantity);
    }

    return NextResponse.json(
      {
        success: true,
        data: order,
        message: "Order created successfully",
      } as ApiResponse,
      { status: 201 }
    );
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      } as ApiResponse,
      { status: 500 }
    );
  }
}, []);
