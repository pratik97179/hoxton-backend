const userRepository = require("../db/userRepository");
const passwordService = require("../services/passwordService");
const jwtService = require("../services/jwtService");
const response = require("../utils/response");

function defaultNameFromEmail(email) {
    const local = email.split("@")[0] || "user";
    return local.charAt(0).toUpperCase() + local.slice(1).toLowerCase();
}

function buildUserResponse(row) {
    return {
        id: row.id,
        email: row.email,
        name: row.name || defaultNameFromEmail(row.email),
    };
}

function buildAuthResponse(userRow, accessToken, expiresIn) {
    return {
        user: buildUserResponse(userRow),
        accessToken,
        expiresIn,
    };
}

async function register(req, res) {
    const { email, password } = req.validated;

    const existing = userRepository.findByEmail(email);
    if (existing) {
        return response.failure(
            res,
            409,
            "Email already registered",
            "EMAIL_ALREADY_REGISTERED",
        );
    }

    const passwordHash = await passwordService.hash(password);
    const name = defaultNameFromEmail(email);
    const user = userRepository.create({
        email,
        passwordHash,
        name,
    });

    const accessToken = jwtService.signAccessToken({ userId: user.id });
    const expiresIn = jwtService.getAccessExpiresInSeconds();
    return response.success(
        res,
        200,
        buildAuthResponse(user, accessToken, expiresIn),
        "User registered successfully",
    );
}

async function login(req, res) {
    const { email, password } = req.validated;

    const user = userRepository.findByEmail(email);
    if (!user) {
        return response.failure(
            res,
            401,
            "Invalid email or password",
            "INVALID_CREDENTIALS",
        );
    }

    const valid = await passwordService.verify(password, user.passwordHash);
    if (!valid) {
        return response.failure(
            res,
            401,
            "Invalid email or password",
            "INVALID_CREDENTIALS",
        );
    }

    const accessToken = jwtService.signAccessToken({ userId: user.id });
    const expiresIn = jwtService.getAccessExpiresInSeconds();

    const safeUser = {
        id: user.id,
        email: user.email,
        name: user.name || defaultNameFromEmail(user.email),
    };

    return response.success(
        res,
        200,
        buildAuthResponse(safeUser, accessToken, expiresIn),
        "Login successful",
    );
}

function checkEmail(req, res) {
    const { email } = req.validated;
    const existing = userRepository.findByEmail(email);
    return response.success(
        res,
        200,
        { userExists: !!existing },
        "Email check completed",
    );
}

module.exports = {
    register,
    login,
    checkEmail,
};
