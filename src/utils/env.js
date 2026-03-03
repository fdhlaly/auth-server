import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;

export const DB_NAME = process.env.DB_NAME || "auth_db";
export const DB_USER = process.env.DB_USER || "root";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PASS = process.env.DB_PASS;

export const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
export const JWT_EXPIRATION_IN = process.env.JWT_EXPIRATION_IN || "15m";
