const { verifyAccessToken } = require("../services/jwtService");
const userRepository = require("../db/userRepository");
const response = require("../utils/response");

function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response.failure(res, 401, "Unauthorized", "UNAUTHORIZED");
    }
    const token = authHeader.slice(7);
    const decoded = verifyAccessToken(token);
    if (!decoded || !decoded.sub) {
        return response.failure(res, 401, "Unauthorized", "UNAUTHORIZED");
    }
    const user = userRepository.findById(decoded.sub);
    if (!user) {
        return response.failure(res, 401, "Unauthorized", "UNAUTHORIZED");
    }
    req.user = user;
    next();
}

module.exports = { requireAuth };
