import type { User, SafeUser, RegisterDTO, LoginDTO, AuthResponse } from '../types/user.types.js';
declare class UserService {
    private filePath;
    constructor();
    private readData;
    private writeData;
    private sanitizeUser;
    generateToken(user: User): string;
    register(dto: RegisterDTO): Promise<AuthResponse>;
    login(dto: LoginDTO): Promise<AuthResponse>;
    getById(id: number): Promise<SafeUser | null>;
    getAllUsers(): Promise<SafeUser[]>;
}
export declare const userService: UserService;
export {};
//# sourceMappingURL=user.service.d.ts.map