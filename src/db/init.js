const path = require("path");
const fs = require("fs");

async function initDb() {
    const { init, getDb, persist } = require("./connection");
    await init();
    const db = getDb();
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");
    db.exec(schema);
    persist();
    console.log("Database initialized.");
}

initDb().catch((err) => {
    console.error(err);
    process.exit(1);
});
