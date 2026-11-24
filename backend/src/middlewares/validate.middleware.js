export const validateCreateProduct = (req, res, next) => {
    const { title, price, category, stock } = req.body;
    const errors = [];
    if (!title || typeof title !== 'string' || title.trim() === '') {
        errors.push('Title is required and must be a non-empty string');
    }
    if (price === undefined || typeof price !== 'number' || price < 0) {
        errors.push('Price is required and must be a positive number');
    }
    if (!category || typeof category !== 'string' || category.trim() === '') {
        errors.push('Category is required and must be a non-empty string');
    }
    if (stock === undefined || typeof stock !== 'number' || stock < 0) {
        errors.push('Stock is required and must be a non-negative number');
    }
    if (errors.length > 0) {
        res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors,
        });
        return;
    }
    next();
};
export const validateUpdateProduct = (req, res, next) => {
    const { title, price, category, stock } = req.body;
    const errors = [];
    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
        errors.push('Title must be a non-empty string');
    }
    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
        errors.push('Price must be a positive number');
    }
    if (category !== undefined && (typeof category !== 'string' || category.trim() === '')) {
        errors.push('Category must be a non-empty string');
    }
    if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
        errors.push('Stock must be a non-negative number');
    }
    if (errors.length > 0) {
        res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors,
        });
        return;
    }
    next();
};
//# sourceMappingURL=validate.middleware.js.map