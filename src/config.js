require("dotenv").config();

const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || "1h";
const DB_PATH = process.env.DB_PATH || "./data/auth.db";

module.exports = {
    PORT,
    JWT_SECRET,
    JWT_ACCESS_EXPIRES_IN,
    DB_PATH,
};
