import type { Request, Response, NextFunction } from 'express';
import { productService } from '../services/product.service.js';

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { search, category, limit, skip } = req.query;

    const result = await productService.getAll({
      search: search ? String(search) : undefined,
      category: category ? String(category) : undefined,
      limit: limit ? parseInt(String(limit), 10) : undefined,
      skip: skip ? parseInt(String(skip), 10) : undefined,
    });

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: result.products,
      total: result.total,
      skip: result.skip,
      limit: result.limit,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const idParam = typeof req.params.id === 'string' ? req.params.id : '';
    const id = idParam ? parseInt(idParam, 10) : NaN;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid product ID. Must be a number.',
      });
      return;
    }

    const product = await productService.getById(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newProduct = await productService.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const idParam = typeof req.params.id === 'string' ? req.params.id : '';
    const id = idParam ? parseInt(idParam, 10) : NaN;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid product ID. Must be a number.',
      });
      return;
    }

    const deletedProduct = await productService.delete(id);

    if (!deletedProduct) {
      res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};
