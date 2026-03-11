const response = require("../utils/response");

/**
 * Validation rules aligned with Flutter UI:
 * - Length 8-16 characters
 * - At least 1 number
 * - At least 1 special character (!#@$ or broader)
 * - At least 1 uppercase
 * - At least 1 lowercase
 */
function validatePassword(password) {
    if (typeof password !== "string") {
        return "Password must be a string";
    }
    if (password.length < 8 || password.length > 16) {
        return "Must be 8-16 characters only";
    }
    if (!/\d/.test(password)) {
        return "At least 1 number required";
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
        return "At least 1 special character like !#@$ required";
    }
    if (!/[A-Z]/.test(password)) {
        return "At least 1 upper case character required";
    }
    if (!/[a-z]/.test(password)) {
        return "At least 1 lower case character required";
    }
    return null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
    if (typeof email !== "string") {
        return "Email must be a string";
    }
    const trimmed = email.trim();
    if (!trimmed) {
        return "Email is required";
    }
    if (!EMAIL_REGEX.test(trimmed)) {
        return "Invalid email format";
    }
    if (trimmed.length > 255) {
        return "Email too long";
    }
    return null;
}

function validateRegisterLoginBody(req, res, next) {
    const body = req.body;
    if (!body || typeof body !== "object") {
        return response.failure(
            res,
            400,
            "Validation failed",
            "VALIDATION_ERROR",
            {
                details: {
                    body: "Request body must be JSON with email and password",
                },
            },
        );
    }

    const emailError = validateEmail(body.email);
    const passwordError = validatePassword(body.password);

    const details = {};
    if (emailError) details.email = emailError;
    if (passwordError) details.password = passwordError;

    if (Object.keys(details).length > 0) {
        return response.failure(
            res,
            400,
            "Validation failed",
            "VALIDATION_ERROR",
            { details },
        );
    }

    req.validated = {
        email: body.email.trim().toLowerCase(),
        password: body.password,
    };
    next();
}

function validateCheckEmailBody(req, res, next) {
    const body = req.body;
    if (!body || typeof body !== "object") {
        return response.failure(
            res,
            400,
            "Validation failed",
            "VALIDATION_ERROR",
            {
                details: {
                    body: "Request body must be JSON with email",
                },
            },
        );
    }

    const emailError = validateEmail(body.email);
    if (emailError) {
        return response.failure(
            res,
            400,
            "Validation failed",
            "VALIDATION_ERROR",
            {
                details: {
                    email: emailError,
                },
            },
        );
    }

    req.validated = { email: body.email.trim().toLowerCase() };
    next();
}

module.exports = {
    validatePassword,
    validateEmail,
    validateRegisterLoginBody,
    validateCheckEmailBody,
};
