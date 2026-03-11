const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_ACCESS_EXPIRES_IN } = require("../config");

function signAccessToken(payload) {
    return jwt.sign({ sub: payload.userId, type: "access" }, JWT_SECRET, {
        expiresIn: JWT_ACCESS_EXPIRES_IN,
    });
}

function verifyAccessToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.type !== "access") return null;
        return decoded;
    } catch {
        return null;
    }
}

function getAccessExpiresInSeconds() {
    const match = JWT_ACCESS_EXPIRES_IN.match(/^(\d+)([smh])$/);
    if (!match) return 3600;
    const value = Number.parseInt(match[1], 10);
    const unit = match[2];
    const multipliers = { s: 1, m: 60, h: 3600, d: 86400 };
    return value * (multipliers[unit] || 3600);
}

module.exports = {
    signAccessToken,
    verifyAccessToken,
    getAccessExpiresInSeconds,
};
