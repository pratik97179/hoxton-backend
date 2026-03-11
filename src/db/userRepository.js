const { getDb, persist } = require("./connection");
const { v4: uuidv4 } = require("uuid");

function mapRow(row) {
    if (!row) return null;
    const out = {};
    for (const [k, v] of Object.entries(row)) {
        const key =
            k === "password_hash"
                ? "passwordHash"
                : k === "created_at"
                  ? "createdAt"
                  : k;
        out[key] = v;
    }
    return out;
}

function create(user) {
    const db = getDb();
    const id = uuidv4();
    const stmt = db.prepare(
        "INSERT INTO users (id, email, password_hash, name, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
    );
    stmt.bind([
        id,
        user.email.toLowerCase().trim(),
        user.passwordHash,
        user.name || "",
    ]);
    stmt.step();
    stmt.free();
    persist();
    return findById(id);
}

function findByEmail(email) {
    const db = getDb();
    const stmt = db.prepare(
        "SELECT id, email, password_hash, name, created_at FROM users WHERE email = ?",
    );
    stmt.bind([email.toLowerCase().trim()]);
    const row = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();
    return row ? mapRow(row) : null;
}

function findById(id) {
    const db = getDb();
    const stmt = db.prepare(
        "SELECT id, email, name, created_at FROM users WHERE id = ?",
    );
    stmt.bind([id]);
    const row = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();
    if (!row) return null;
    return mapRow(row);
}

module.exports = {
    create,
    findByEmail,
    findById,
};
