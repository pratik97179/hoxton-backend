const { getDb, persist } = require("./connection");

function create(userId, data) {
    const db = getDb();
    const dataJson = JSON.stringify(data);
    const stmt = db.prepare(
        "INSERT INTO user_home_data (user_id, data, created_at, updated_at) VALUES (?, ?, datetime('now'), datetime('now')) ON CONFLICT(user_id) DO UPDATE SET data = excluded.data, updated_at = datetime('now')",
    );
    stmt.bind([userId, dataJson]);
    stmt.step();
    stmt.free();
    persist();
    return findByUserId(userId);
}

function findByUserId(userId) {
    const db = getDb();
    const stmt = db.prepare(
        "SELECT user_id, data FROM user_home_data WHERE user_id = ?",
    );
    stmt.bind([userId]);
    const row = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();
    if (!row || !row.data) return null;
    return JSON.parse(row.data);
}

module.exports = {
    create,
    findByUserId,
};
