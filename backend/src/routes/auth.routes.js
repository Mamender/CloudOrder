import { Router } from 'express';
import { register, login, getMe, } from '../controllers/auth.controller.js';
import { validateRegister, validateLogin, } from '../middlewares/auth-validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
const router = Router();
// POST /api/auth/register - Register a new user
router.post('/register', validateRegister, register);
// POST /api/auth/login - Login user & return JWT token
router.post('/login', validateLogin, login);
// GET /api/auth/me - Get current logged-in user profile (Requires token)
router.get('/me', authenticate, getMe);
export default router;
//# sourceMappingURL=auth.routes.js.map