const express = require('express');
const path = require('path');
const itemsRouter = require('./routes/items');
const logger = require('./logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.startTime = Date.now();
  next();
});

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/items', itemsRouter);

// simple metrics endpoint
let requestCount = 0;
app.use((req, res, next) => {
  requestCount += 1;
  next();
});

app.get('/metrics', (req, res) => {
  const metrics = {
    uptime_seconds: Math.floor(process.uptime()),
    request_count: requestCount
  };
  res.json(metrics);
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  logger.error(err.stack || err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
