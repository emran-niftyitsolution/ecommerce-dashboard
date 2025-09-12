import { ObjectId } from "mongodb";
import { AuthService } from "../lib/auth";
import { getDatabase } from "../lib/mongodb";
import { Customer, Order, Product, User } from "../lib/types";

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    const db = await getDatabase();

    // Clear existing data
    await db.collection("users").deleteMany({});
    await db.collection("products").deleteMany({});
    await db.collection("customers").deleteMany({});
    await db.collection("orders").deleteMany({});

    console.log("🗑️ Cleared existing data");

    // Create admin user
    const adminPassword = await AuthService.hashPassword("admin123");
    const adminUser: User = {
      email: "admin@dashboard.com",
      password: adminPassword,
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("users").insertOne(adminUser);
    console.log("👤 Created admin user");

    // Create manager user
    const managerPassword = await AuthService.hashPassword("manager123");
    const managerUser: User = {
      email: "manager@dashboard.com",
      password: managerPassword,
      firstName: "Manager",
      lastName: "User",
      role: "manager",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("users").insertOne(managerUser);
    console.log("👤 Created manager user");

    // Create regular user
    const userPassword = await AuthService.hashPassword("user123");
    const regularUser: User = {
      email: "user@dashboard.com",
      password: userPassword,
      firstName: "Regular",
      lastName: "User",
      role: "user",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("users").insertOne(regularUser);
    console.log("👤 Created regular user");

    // Create sample products
    const products: Product[] = [
      {
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 199.99,
        category: "Electronics",
        sku: "WH-001",
        stock: 50,
        images: ["/images/headphones-1.jpg"],
        isActive: true,
        tags: ["wireless", "audio", "electronics"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Smart Watch",
        description: "Advanced smartwatch with health monitoring features",
        price: 299.99,
        category: "Electronics",
        sku: "SW-002",
        stock: 30,
        images: ["/images/smartwatch-1.jpg"],
        isActive: true,
        tags: ["smartwatch", "health", "fitness"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Laptop Backpack",
        description: "Durable laptop backpack with multiple compartments",
        price: 79.99,
        category: "Accessories",
        sku: "LB-003",
        stock: 100,
        images: ["/images/backpack-1.jpg"],
        isActive: true,
        tags: ["backpack", "laptop", "travel"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Coffee Maker",
        description: "Automatic coffee maker with programmable settings",
        price: 149.99,
        category: "Appliances",
        sku: "CM-004",
        stock: 25,
        images: ["/images/coffee-maker-1.jpg"],
        isActive: true,
        tags: ["coffee", "appliance", "kitchen"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with excellent sound quality",
        price: 89.99,
        category: "Electronics",
        sku: "BS-005",
        stock: 75,
        images: ["/images/speaker-1.jpg"],
        isActive: true,
        tags: ["bluetooth", "speaker", "portable"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const productResults = await db.collection("products").insertMany(products);
    console.log("📦 Created sample products");

    // Create sample customers
    const customers: Customer[] = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@email.com",
        phone: "+1-555-0123",
        address: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA",
        },
        dateOfBirth: new Date("1990-01-15"),
        isActive: true,
        totalOrders: 3,
        totalSpent: 459.97,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@email.com",
        phone: "+1-555-0456",
        address: {
          street: "456 Oak Ave",
          city: "Los Angeles",
          state: "CA",
          zipCode: "90210",
          country: "USA",
        },
        dateOfBirth: new Date("1985-05-20"),
        isActive: true,
        totalOrders: 2,
        totalSpent: 389.98,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Mike",
        lastName: "Johnson",
        email: "mike.johnson@email.com",
        phone: "+1-555-0789",
        address: {
          street: "789 Pine Rd",
          city: "Chicago",
          state: "IL",
          zipCode: "60601",
          country: "USA",
        },
        isActive: true,
        totalOrders: 1,
        totalSpent: 199.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const customerResults = await db
      .collection("customers")
      .insertMany(customers);
    console.log("👥 Created sample customers");

    // Create sample orders
    const productIds = Object.values(productResults.insertedIds);
    const customerIds = Object.values(customerResults.insertedIds);

    const orders: Order[] = [
      {
        orderNumber: "ORD-001",
        customerId: customerIds[0] as ObjectId,
        items: [
          {
            productId: productIds[0] as ObjectId,
            quantity: 1,
            price: 199.99,
            name: "Wireless Headphones",
          },
          {
            productId: productIds[2] as ObjectId,
            quantity: 1,
            price: 79.99,
            name: "Laptop Backpack",
          },
        ],
        total: 279.98,
        status: "delivered",
        shippingAddress: customers[0].address,
        billingAddress: customers[0].address,
        paymentMethod: "credit_card",
        paymentStatus: "paid",
        notes: "Please deliver during business hours",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        orderNumber: "ORD-002",
        customerId: customerIds[1] as ObjectId,
        items: [
          {
            productId: productIds[1] as ObjectId,
            quantity: 1,
            price: 299.99,
            name: "Smart Watch",
          },
        ],
        total: 299.99,
        status: "shipped",
        shippingAddress: customers[1].address,
        billingAddress: customers[1].address,
        paymentMethod: "paypal",
        paymentStatus: "paid",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        orderNumber: "ORD-003",
        customerId: customerIds[2] as ObjectId,
        items: [
          {
            productId: productIds[4] as ObjectId,
            quantity: 1,
            price: 89.99,
            name: "Bluetooth Speaker",
          },
        ],
        total: 89.99,
        status: "processing",
        shippingAddress: customers[2].address,
        billingAddress: customers[2].address,
        paymentMethod: "credit_card",
        paymentStatus: "paid",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ];

    await db.collection("orders").insertMany(orders);
    console.log("📋 Created sample orders");

    console.log("✅ Database seeding completed successfully!");
    console.log("\n📝 Login credentials:");
    console.log("Admin: admin@dashboard.com / admin123");
    console.log("Manager: manager@dashboard.com / manager123");
    console.log("User: user@dashboard.com / user123");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log("🎉 Seeding process finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Seeding failed:", error);
    process.exit(1);
  });
