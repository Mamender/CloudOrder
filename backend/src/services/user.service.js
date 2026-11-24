import fs from 'fs/promises';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
class UserService {
    filePath;
    constructor() {
        this.filePath = config.usersDataPath;
    }
    async readData() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error('Error reading users data file:', error);
            throw new Error('Unable to read users database');
        }
    }
    async writeData(data) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
        }
        catch (error) {
            console.error('Error writing users data file:', error);
            throw new Error('Unable to save users database');
        }
    }
    sanitizeUser(user) {
        const { password, ...safeUser } = user;
        return safeUser;
    }
    generateToken(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };
        return jwt.sign(payload, config.jwtSecret, {
            expiresIn: config.jwtExpiresIn,
        });
    }
    async register(dto) {
        const data = await this.readData();
        const normalizedEmail = dto.email.trim().toLowerCase();
        const existing = data.users.find((u) => u.email.toLowerCase() === normalizedEmail);
        if (existing) {
            const err = new Error('An account with this email already exists');
            err.statusCode = 409;
            throw err;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(dto.password, salt);
        const nextId = data.users.length > 0 ? Math.max(...data.users.map((u) => u.id)) + 1 : 1;
        const newUser = {
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
    async login(dto) {
        const data = await this.readData();
        const normalizedEmail = dto.email.trim().toLowerCase();
        const user = data.users.find((u) => u.email.toLowerCase() === normalizedEmail);
        if (!user) {
            const err = new Error('Invalid email or password');
            err.statusCode = 401;
            throw err;
        }
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            const err = new Error('Invalid email or password');
            err.statusCode = 401;
            throw err;
        }
        const safeUser = this.sanitizeUser(user);
        const token = this.generateToken(user);
        return { user: safeUser, token };
    }
    async getById(id) {
        const data = await this.readData();
        const user = data.users.find((u) => u.id === id);
        return user ? this.sanitizeUser(user) : null;
    }
    async getAllUsers() {
        const data = await this.readData();
        return data.users.map((u) => this.sanitizeUser(u));
    }
}
export const userService = new UserService();
//# sourceMappingURL=user.service.js.map