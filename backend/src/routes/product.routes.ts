import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { validateCreateProduct } from '../middlewares/validate.middleware.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * Access rules:
 * - GET /api/products: Authenticated users (both 'admin' and 'user' can view products)
 * - GET /api/products/:id: Authenticated users (both 'admin' and 'user' can view)
 * - POST /api/products: 'admin' only
 * - DELETE /api/products/:id: 'admin' only
 */

// All product routes require valid authentication
router.use(authenticate);

// View products - Both 'user' and 'admin' can access
router.get('/', authorize(['admin', 'user']), getProducts);
router.get('/:id', authorize(['admin', 'user']), getProductById);

// Manage products - 'admin' only
router.post('/', authorize(['admin']), validateCreateProduct, createProduct);
router.delete('/:id', authorize(['admin']), deleteProduct);

export default router;
