const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validateRegister = (req, res, next) => {
    const { name, email, password, role } = req.body;
    const errors = [];
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
        errors.push('A valid email address is required');
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }
    if (role !== undefined && role !== 'admin' && role !== 'user') {
        errors.push("Role must be either 'admin' or 'user'");
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
export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
        errors.push('A valid email address is required');
    }
    if (!password || typeof password !== 'string' || password.trim() === '') {
        errors.push('Password is required');
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
//# sourceMappingURL=auth-validate.middleware.js.map