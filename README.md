# Full-Stack Dashboard with Next.js, MongoDB, and Ant Design

A modern, responsive dashboard application built with Next.js 15, MongoDB, and Ant Design. This project demonstrates a complete full-stack implementation with authentication, CRUD operations, and real-time data visualization.

## 🚀 Features

- **Full-Stack Architecture**: Next.js 15 with App Router and MongoDB backend
- **Authentication**: JWT-based authentication with role-based access control
- **Real-time Dashboard**: Live data from MongoDB with beautiful charts
- **CRUD Operations**: Complete user, product, order, and customer management
- **Responsive Design**: Mobile-first design with Ant Design components
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Professional dashboard with dark mode support

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **Ant Design 5** - Professional UI component library
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type-safe development

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database with native driver
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Bun** - Fast JavaScript runtime and package manager

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Bun** (v1.0 or higher) - [Install Bun](https://bun.sh/docs/installation)
- **MongoDB** (v6.0 or higher) - [Install MongoDB](https://docs.mongodb.com/manual/installation/)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dashboard-nextjs-antdesign
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/dashboard-app
MONGODB_DB=dashboard-app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# App Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-change-this-in-production
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# On Windows
net start MongoDB
```

### 5. Seed the Database

Populate the database with sample data:

```bash
bun run seed
```

This will create:

- 3 sample users (admin, manager, user)
- 5 sample products
- 3 sample customers
- 3 sample orders

### 6. Start the Development Server

```bash
bun run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

After seeding the database, you can use these credentials to log in:

| Role    | Email                 | Password   |
| ------- | --------------------- | ---------- |
| Admin   | admin@dashboard.com   | admin123   |
| Manager | manager@dashboard.com | manager123 |
| User    | user@dashboard.com    | user123    |

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── users/         # User management
│   │   ├── products/      # Product management
│   │   ├── orders/        # Order management
│   │   ├── customers/     # Customer management
│   │   └── analytics/     # Analytics endpoints
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── lib/                   # Utility libraries
│   ├── mongodb.ts         # Database connection
│   ├── types.ts           # TypeScript types
│   ├── db-utils.ts        # Database operations
│   ├── auth.ts            # Authentication utilities
│   └── api-client.ts      # API client
├── scripts/               # Utility scripts
│   └── seed.ts            # Database seeding
└── public/                # Static assets
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Users

- `GET /api/users` - List users (admin/manager)
- `POST /api/users` - Create user (admin)
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user (admin)

### Products

- `GET /api/products` - List products
- `POST /api/products` - Create product (admin/manager)
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product (admin/manager)
- `DELETE /api/products/[id]` - Delete product (admin)

### Orders

- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `GET /api/orders/[id]` - Get order by ID
- `PUT /api/orders/[id]` - Update order (admin/manager)
- `DELETE /api/orders/[id]` - Delete order (admin)

### Customers

- `GET /api/customers` - List customers
- `POST /api/customers` - Create customer
- `GET /api/customers/[id]` - Get customer by ID
- `PUT /api/customers/[id]` - Update customer
- `DELETE /api/customers/[id]` - Delete customer (admin)

### Analytics

- `GET /api/analytics/dashboard` - Get dashboard statistics

## 🎨 Features Overview

### Dashboard

- Real-time statistics from MongoDB
- Revenue and order tracking
- Customer and product metrics
- Interactive charts and graphs
- Responsive design for all devices

### User Management

- Role-based access control (Admin, Manager, User)
- User creation, editing, and deletion
- Secure password hashing
- JWT token authentication

### Product Management

- Product catalog with categories
- Stock management
- Image support
- SKU tracking

### Order Management

- Order creation and tracking
- Status updates
- Customer association
- Payment tracking

### Customer Management

- Customer profiles
- Order history
- Contact information
- Address management

## 🔧 Development

### Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint

# Database
bun run seed         # Seed database with sample data
```

### Database Operations

The application uses MongoDB with the native Node.js driver. Key features:

- Connection pooling for performance
- Automatic reconnection handling
- Type-safe database operations
- Pagination support
- Error handling and validation

### Authentication Flow

1. User submits login credentials
2. Server validates credentials against MongoDB
3. JWT token generated and returned
4. Token stored in localStorage
5. Token included in subsequent API requests
6. Server validates token for protected routes

## 🚀 Deployment

### Environment Setup

For production deployment, update your environment variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dashboard-app
JWT_SECRET=your-production-secret-key
NEXTAUTH_URL=https://your-domain.com
```

### Build and Deploy

```bash
# Build the application
bun run build

# Start production server
bun run start
```

### MongoDB Atlas

For cloud deployment, consider using MongoDB Atlas:

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in your environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**MongoDB Connection Error**

- Ensure MongoDB is running on port 27017
- Check your `MONGODB_URI` in `.env.local`
- Verify MongoDB service is started

**Authentication Issues**

- Make sure you've run `bun run seed` to create demo users
- Check JWT_SECRET is set in environment variables
- Verify token is being sent in Authorization header

**Build Errors**

- Clear `.next` folder and rebuild
- Check for TypeScript errors
- Ensure all dependencies are installed

### Getting Help

If you encounter any issues:

1. Check the console for error messages
2. Verify all prerequisites are installed
3. Ensure MongoDB is running and accessible
4. Check environment variables are set correctly

## 🎯 Next Steps

This project provides a solid foundation for building full-stack applications. Consider extending it with:

- Real-time notifications with WebSockets
- File upload functionality
- Advanced analytics and reporting
- Email notifications
- Payment integration
- Multi-tenant support
- Advanced search and filtering
- Data export capabilities

---

Built with ❤️ using Next.js, MongoDB, and Ant Design
