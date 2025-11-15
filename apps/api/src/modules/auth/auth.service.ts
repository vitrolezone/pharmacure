import { Injectable } from '@nestjs/common';
import { prisma } from '@pharmify/db';

@Injectable()
export class AuthService {
  async signup(signupDto: { name: string; email: string; password: string }) {
    // TODO: Hash password properly (use bcrypt)
    // TODO: Validate email format
    // TODO: Check if user already exists

    const user = await prisma.user.create({
      data: {
        name: signupDto.name,
        email: signupDto.email,
        password: signupDto.password, // In production, hash this!
        role: 'customer',
      },
    });

    // TODO: Generate JWT token
    return {
      message: 'User created successfully',
      userId: user.id,
      email: user.email,
    };
  }

  async login(loginDto: { email: string; password: string }) {
    // TODO: Implement proper authentication
    // TODO: Verify password hash
    // TODO: Generate JWT token

    const user = await prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // TODO: Compare hashed password
    if (user.password !== loginDto.password) {
      throw new Error('Invalid credentials');
    }

    return {
      message: 'Login successful',
      userId: user.id,
      email: user.email,
      // TODO: Return JWT token
    };
  }
}

