const express = require('express');
const { PORT } = require('./config');
const response = require('./utils/response');

const app = express();
app.use(express.json({ limit: '10kb' }));

app.get('/health', (req, res) => {
  return response.success(res, 200, { status: 'ok' }, 'Health check ok');
});

app.use((err, req, res, next) => {
  console.error(err);
  return response.failure(
    res,
    500,
    'Internal server error',
    'INTERNAL_SERVER_ERROR'
  );
});

app.listen(PORT, () => {
  console.log(`Auth backend listening on http://localhost:${PORT}`);
});