export type UserRole = 'admin' | 'user';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // hashed password
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type SafeUser = Omit<User, 'password'>;

export interface UsersDataPayload {
  users: User[];
  total: number;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: SafeUser;
  token: string;
}

export interface TokenPayload {
  userId: number;
  email: string;
  role: UserRole;
}
