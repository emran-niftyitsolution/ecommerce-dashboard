import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./types";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export class AuthService {
  // Hash password
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  // Verify password
  static async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Generate JWT token
  static generateToken(user: Omit<User, "password">): string {
    const payload = {
      id: user._id?.toString(),
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  // Verify JWT token
  static verifyToken(token: string): Record<string, unknown> {
    try {
      return jwt.verify(token, JWT_SECRET) as Record<string, unknown>;
    } catch {
      throw new Error("Invalid token");
    }
  }

  // Extract token from Authorization header
  static extractTokenFromHeader(authHeader: string | null): string | null {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }
    return authHeader.substring(7);
  }

  // Middleware to verify authentication
  static async verifyAuth(
    authHeader: string | null
  ): Promise<Record<string, unknown>> {
    const token = this.extractTokenFromHeader(authHeader);
    if (!token) {
      throw new Error("No token provided");
    }
    return this.verifyToken(token);
  }

  // Check if user has required role
  static hasRole(userRole: string, requiredRoles: string[]): boolean {
    return requiredRoles.includes(userRole);
  }

  // Generate random order number
  static generateOrderNumber(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ORD-${timestamp.slice(-6)}-${random}`;
  }
}

// Middleware helper for API routes
export function withAuth(
  handler: (req: Request, res: Response) => Promise<Response>,
  requiredRoles: string[] = []
) {
  return async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.get("authorization");
      const user = await AuthService.verifyAuth(authHeader);

      if (
        requiredRoles.length > 0 &&
        !AuthService.hasRole(user.role as string, requiredRoles)
      ) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Insufficient permissions",
          }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }

      // Add user to request object (this is a simplified approach)
      (req as { user: User }).user = user;
      return handler(req, res);
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unauthorized",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  };
}
