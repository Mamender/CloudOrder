import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
export const config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || 'supersecret_jwt_key_cloudorder_dashboard_2026',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
    dataPath: process.env.PRODUCT_DATA_PATH
        ? path.resolve(process.cwd(), process.env.PRODUCT_DATA_PATH)
        : path.resolve(process.cwd(), 'product-data.json'),
    usersDataPath: process.env.USERS_DATA_PATH
        ? path.resolve(process.cwd(), process.env.USERS_DATA_PATH)
        : path.resolve(process.cwd(), 'users-data.json'),
};
//# sourceMappingURL=index.js.map