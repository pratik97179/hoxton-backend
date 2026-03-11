const path = require("path");
const fs = require("fs");
const { DB_PATH } = require("../config");

let db = null;
let initSqlJs = null;

async function init() {
    if (db) return db;
    const resolvedPath = path.resolve(process.cwd(), DB_PATH);
    const dir = path.dirname(resolvedPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    initSqlJs = require("sql.js");
    const SQL = await initSqlJs();
    if (fs.existsSync(resolvedPath)) {
        const buffer = fs.readFileSync(resolvedPath);
        db = new SQL.Database(buffer);
    } else {
        db = new SQL.Database();
    }
    db.resolvedPath = resolvedPath;
    return db;
}

function getDb() {
    return db;
}

function persist() {
    if (!db || !db.resolvedPath) return;
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(db.resolvedPath, buffer);
}

module.exports = { init, getDb, persist };
