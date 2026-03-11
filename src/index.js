const express = require("express");
const path = require("path");
const fs = require("fs");
const { PORT } = require("./config");
const authRoutes = require("./routes/auth.routes");
const homeRoutes = require("./routes/home.routes");
const { init, getDb, persist } = require("./db/connection");
const response = require("./utils/response");

async function start() {
    await init();
    const db = getDb();
    const schemaPath = path.join(__dirname, "db", "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");
    db.exec(schema);
    persist();

    const app = express();
    app.use(express.json({ limit: "10kb" }));

    app.use("/auth", authRoutes);
    app.use("/home", homeRoutes);

    app.get("/health", (req, res) => {
        return response.success(res, 200, { status: "ok" }, "Health check ok");
    });

    app.use((err, req, res, next) => {
        console.error(err);
        return response.failure(
            res,
            500,
            "Internal server error",
            "INTERNAL_SERVER_ERROR",
        );
    });

    app.listen(PORT, () => {
        console.log(`Auth backend listening on http://localhost:${PORT}`);
    });
}

start().catch((err) => {
    console.error("Failed to start:", err);
    process.exit(1);
});
