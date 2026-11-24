import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../types/express.types.js';
import type { UserRole } from '../types/user.types.js';
export declare const authenticate: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
/**
 * Role-based access control middleware
 * Checks if authenticated user has any of the required roles
 */
export declare const authorize: (allowedRoles: UserRole[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map