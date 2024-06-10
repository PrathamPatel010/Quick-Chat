import dotenv from 'dotenv';

dotenv.config();

export const PORT: number | string = process.env.PORT || 4000;
export const JWT_SECRET: string = process.env.JWT_SECRET || 'your_jwt_secret';

export const FRONTEND_URL:string = process.env.FRONTEND_URL || "http://localhost:3000"
