import { AuthService } from "../lib/auth";
import Customer from "../lib/models/Customer";
import Order from "../lib/models/Order";
import Product from "../lib/models/Product";
import User from "../lib/models/User";
import { connectToDatabase } from "../lib/mongodb";

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding with Mongoose...");

    // Connect to database
    await connectToDatabase();

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
      Customer.deleteMany({}),
    ]);

    // Create users
    console.log("👥 Creating users...");
    const hashedPassword = await AuthService.hashPassword("abcd1234");

    const users = await User.insertMany([
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: hashedPassword,
        role: "admin",
        isActive: true,
        phone: "+1234567890",
        address: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA",
        },
        preferences: {
          theme: "light",
          language: "en",
          notifications: true,
        },
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        password: hashedPassword,
        role: "manager",
        isActive: true,
        phone: "+1234567891",
        address: {
          street: "456 Oak Ave",
          city: "Los Angeles",
          state: "CA",
          zipCode: "90210",
          country: "USA",
        },
        preferences: {
          theme: "dark",
          language: "en",
          notifications: true,
        },
      },
      {
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob.johnson@example.com",
        password: hashedPassword,
        role: "user",
        isActive: true,
        phone: "+1234567892",
        preferences: {
          theme: "light",
          language: "en",
          notifications: false,
        },
      },
      {
        firstName: "Alice",
        lastName: "Brown",
        email: "alice.brown@example.com",
        password: hashedPassword,
        role: "user",
        isActive: false,
        phone: "+1234567893",
        preferences: {
          theme: "light",
          language: "en",
          notifications: true,
        },
      },
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create products
    console.log("📦 Creating products...");
    const products = await Product.insertMany([
      {
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 199.99,
        category: "Electronics",
        stock: 50,
        sku: "WH-001",
        images: ["headphones1.jpg", "headphones2.jpg"],
        tags: ["wireless", "audio", "electronics"],
        isActive: true,
        weight: 0.3,
        dimensions: {
          length: 20,
          width: 15,
          height: 8,
        },
      },
      {
        name: "Smart Watch",
        description: "Advanced smartwatch with health monitoring features",
        price: 299.99,
        category: "Electronics",
        stock: 30,
        sku: "SW-002",
        images: ["watch1.jpg", "watch2.jpg"],
        tags: ["smartwatch", "health", "fitness"],
        isActive: true,
        weight: 0.05,
        dimensions: {
          length: 4,
          width: 4,
          height: 1,
        },
      },
      {
        name: "Laptop Stand",
        description: "Adjustable aluminum laptop stand for better ergonomics",
        price: 79.99,
        category: "Accessories",
        stock: 100,
        sku: "LS-003",
        images: ["stand1.jpg"],
        tags: ["laptop", "ergonomics", "accessories"],
        isActive: true,
        weight: 0.8,
        dimensions: {
          length: 30,
          width: 20,
          height: 15,
        },
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with blue switches",
        price: 149.99,
        category: "Accessories",
        stock: 25,
        sku: "MK-004",
        images: ["keyboard1.jpg", "keyboard2.jpg"],
        tags: ["keyboard", "mechanical", "rgb"],
        isActive: true,
        weight: 1.2,
        dimensions: {
          length: 45,
          width: 15,
          height: 3,
        },
      },
      {
        name: "Gaming Mouse",
        description: "High-precision gaming mouse with customizable buttons",
        price: 89.99,
        category: "Accessories",
        stock: 75,
        sku: "GM-005",
        images: ["mouse1.jpg"],
        tags: ["gaming", "mouse", "precision"],
        isActive: true,
        weight: 0.1,
        dimensions: {
          length: 12,
          width: 6,
          height: 4,
        },
      },
    ]);

    console.log(`✅ Created ${products.length} products`);

    // Create customers
    console.log("👤 Creating customers...");
    const customers = await Customer.insertMany([
      {
        firstName: "Michael",
        lastName: "Wilson",
        email: "michael.wilson@email.com",
        phone: "+1987654321",
        company: "Tech Corp",
        address: {
          street: "789 Business Blvd",
          city: "Chicago",
          state: "IL",
          zipCode: "60601",
          country: "USA",
        },
        totalOrders: 3,
        totalSpent: 529.97,
        lastOrderDate: new Date("2024-01-15"),
        isActive: true,
        notes: "VIP customer, prefers express shipping",
        tags: ["vip", "business"],
      },
      {
        firstName: "Sarah",
        lastName: "Davis",
        email: "sarah.davis@email.com",
        phone: "+1987654322",
        address: {
          street: "321 Residential Rd",
          city: "Miami",
          state: "FL",
          zipCode: "33101",
          country: "USA",
        },
        totalOrders: 1,
        totalSpent: 199.99,
        lastOrderDate: new Date("2024-01-10"),
        isActive: true,
        tags: ["new-customer"],
      },
      {
        firstName: "David",
        lastName: "Miller",
        email: "david.miller@email.com",
        phone: "+1987654323",
        company: "Design Studio",
        totalOrders: 2,
        totalSpent: 229.98,
        lastOrderDate: new Date("2024-01-08"),
        isActive: true,
        notes: "Bulk orders for office equipment",
        tags: ["business", "bulk"],
      },
    ]);

    console.log(`✅ Created ${customers.length} customers`);

    // Create orders
    console.log("📋 Creating orders...");
    const orders = await Order.insertMany([
      {
        orderNumber: "ORD-000001",
        customerId: customers[0]._id.toString(),
        customerName: "Michael Wilson",
        customerEmail: "michael.wilson@email.com",
        items: [
          {
            productId: products[0]._id.toString(),
            productName: "Wireless Headphones",
            quantity: 1,
            price: 199.99,
            total: 199.99,
          },
          {
            productId: products[1]._id.toString(),
            productName: "Smart Watch",
            quantity: 1,
            price: 299.99,
            total: 299.99,
          },
        ],
        subtotal: 499.98,
        tax: 39.99,
        shipping: 9.99,
        total: 549.96,
        status: "delivered",
        paymentStatus: "paid",
        paymentMethod: "Credit Card",
        shippingAddress: {
          street: "789 Business Blvd",
          city: "Chicago",
          state: "IL",
          zipCode: "60601",
          country: "USA",
        },
        notes: "Please deliver to reception desk",
        shippedAt: new Date("2024-01-12"),
        deliveredAt: new Date("2024-01-15"),
      },
      {
        orderNumber: "ORD-000002",
        customerId: customers[1]._id.toString(),
        customerName: "Sarah Davis",
        customerEmail: "sarah.davis@email.com",
        items: [
          {
            productId: products[0]._id.toString(),
            productName: "Wireless Headphones",
            quantity: 1,
            price: 199.99,
            total: 199.99,
          },
        ],
        subtotal: 199.99,
        tax: 16.0,
        shipping: 0,
        total: 215.99,
        status: "shipped",
        paymentStatus: "paid",
        paymentMethod: "PayPal",
        shippingAddress: {
          street: "321 Residential Rd",
          city: "Miami",
          state: "FL",
          zipCode: "33101",
          country: "USA",
        },
        shippedAt: new Date("2024-01-11"),
      },
      {
        orderNumber: "ORD-000003",
        customerId: customers[2]._id.toString(),
        customerName: "David Miller",
        customerEmail: "david.miller@email.com",
        items: [
          {
            productId: products[2]._id.toString(),
            productName: "Laptop Stand",
            quantity: 2,
            price: 79.99,
            total: 159.98,
          },
          {
            productId: products[3]._id.toString(),
            productName: "Mechanical Keyboard",
            quantity: 1,
            price: 149.99,
            total: 149.99,
          },
        ],
        subtotal: 309.97,
        tax: 24.8,
        shipping: 15.0,
        total: 349.77,
        status: "processing",
        paymentStatus: "paid",
        paymentMethod: "Bank Transfer",
        shippingAddress: {
          street: "456 Office Park",
          city: "Seattle",
          state: "WA",
          zipCode: "98101",
          country: "USA",
        },
        notes: "Business order - please include invoice",
      },
    ]);

    console.log(`✅ Created ${orders.length} orders`);

    console.log("🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`- Users: ${users.length}`);
    console.log(`- Products: ${products.length}`);
    console.log(`- Customers: ${customers.length}`);
    console.log(`- Orders: ${orders.length}`);
    console.log("\n🔑 Demo Login Credentials:");
    console.log("Email: john.doe@example.com");
    console.log("Password: abcd1234");
    console.log("Role: Admin");
    console.log("\nEmail: jane.smith@example.com");
    console.log("Password: abcd1234");
    console.log("Role: Manager");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log("✅ Seeding process completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding process failed:", error);
    process.exit(1);
  });
