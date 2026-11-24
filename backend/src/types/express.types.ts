import type { Request } from 'express';
import type { TokenPayload } from './user.types.js';

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}
