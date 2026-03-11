# hoxton_backend

Email/password authentication backend for the **hoxton_task** Flutter app.

## Stack

- Node.js + Express
- JWT (access tokens)
- SQLite (sql.js — pure JS, no native build)
- bcrypt for password hashing

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy env example and set `JWT_SECRET` (required in production):
   ```bash
   cp .env.example .env
   ```

3. Start the server (DB and schema are created automatically on first run):
   ```bash
   npm start
   ```
   Or run with auto-reload:
   ```bash
   npm run dev
   ```

Server runs at `http://localhost:3000` by default.

## API

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/check-email` | Check if email is already registered |
| POST | `/auth/register` | Sign up (email + password) |
| POST | `/auth/login` | Sign in |
| GET | `/health` | Health check |

### Check email body

```json
{ "email": "user@example.com" }
```

- **200**: `{ "userExists": true }` or `{ "userExists": false }`

### Register / Login body

```json
{ "email": "user@example.com", "password": "Str0ng!pass" }
```

Password rules: 8–16 characters, at least one number, one special character (!#@$ etc.), one uppercase, one lowercase.

### Responses

- **200** (register) / **200** (login): `{ "user": { "id", "email", "name" }, "accessToken", "expiresIn" }`
- **400**: Validation failed — `{ "error", "details" }`
- **401**: Unauthorized / Invalid credentials — `{ "error" }`
- **409**: Email already registered — `{ "error" }`

## Environment

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 3000 | Server port |
| JWT_SECRET | (dev default) | Secret for signing JWTs; set in production |
| JWT_ACCESS_EXPIRES_IN | 1h | Access token TTL |
| DB_PATH | ./data/auth.db | SQLite file path |