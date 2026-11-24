export const errorHandler = (err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    if (statusCode >= 500) {
        console.error('Unhandled server error:', err);
    }
    res.status(statusCode).json({
        success: false,
        message,
        ...(err.errors ? { errors: err.errors } : {}),
    });
};
export const notFoundHandler = (_req, res, _next) => {
    res.status(404).json({
        success: false,
        message: 'Resource not found',
    });
};
//# sourceMappingURL=error.middleware.js.map