import type { Request, Response, NextFunction } from 'express';
interface CustomError extends Error {
    statusCode?: number;
    errors?: string[];
}
export declare const errorHandler: (err: CustomError, _req: Request, res: Response, _next: NextFunction) => void;
export declare const notFoundHandler: (_req: Request, res: Response, _next: NextFunction) => void;
export {};
//# sourceMappingURL=error.middleware.d.ts.map