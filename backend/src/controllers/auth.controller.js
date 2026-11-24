import { userService } from '../services/user.service.js';
export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const result = await userService.register({ name, email, password, role });
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await userService.login({ email, password });
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getMe = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized',
            });
            return;
        }
        const user = await userService.getById(req.user.userId);
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'User profile retrieved successfully',
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auth.controller.js.map