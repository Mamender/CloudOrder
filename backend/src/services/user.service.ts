import fs from 'fs/promises';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import type {
  User,
  SafeUser,
  UsersDataPayload,
  RegisterDTO,
  LoginDTO,
  AuthResponse,
  TokenPayload,
} from '../types/user.types.js';

class UserService {
  private filePath: string;

  constructor() {
    this.filePath = config.usersDataPath;
  }

  private async readData(): Promise<UsersDataPayload> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as UsersDataPayload;
    } catch (error) {
      console.error('Error reading users data file:', error);
      throw new Error('Unable to read users database');
    }
  }

  private async writeData(data: UsersDataPayload): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing users data file:', error);
      throw new Error('Unable to save users database');
    }
  }

  private sanitizeUser(user: User): SafeUser {
    const { password, ...safeUser } = user;
    return safeUser;
  }

  public generateToken(user: User): string {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    } as jwt.SignOptions);
  }

  public async register(dto: RegisterDTO): Promise<AuthResponse> {
    const data = await this.readData();

    const normalizedEmail = dto.email.trim().toLowerCase();
    const existing = data.users.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      const err = new Error('An account with this email already exists');
      (err as any).statusCode = 409;
      throw err;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const nextId =
      data.users.length > 0 ? Math.max(...data.users.map((u) => u.id)) + 1 : 1;

    const newUser: User = {
      id: nextId,
      name: dto.name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: dto.role === 'admin' ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.users.push(newUser);
    data.total = data.users.length;
    await this.writeData(data);

    const safeUser = this.sanitizeUser(newUser);
    const token = this.generateToken(newUser);

    return { user: safeUser, token };
  }

  public async login(dto: LoginDTO): Promise<AuthResponse> {
    const data = await this.readData();
    const normalizedEmail = dto.email.trim().toLowerCase();

    const user = data.users.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (!user) {
      const err = new Error('Invalid email or password');
      (err as any).statusCode = 401;
      throw err;
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      const err = new Error('Invalid email or password');
      (err as any).statusCode = 401;
      throw err;
    }

    const safeUser = this.sanitizeUser(user);
    const token = this.generateToken(user);

    return { user: safeUser, token };
  }

  public async getById(id: number): Promise<SafeUser | null> {
    const data = await this.readData();
    const user = data.users.find((u) => u.id === id);
    return user ? this.sanitizeUser(user) : null;
  }

  public async getAllUsers(): Promise<SafeUser[]> {
    const data = await this.readData();
    return data.users.map((u) => this.sanitizeUser(u));
  }
}

export const userService = new UserService();
