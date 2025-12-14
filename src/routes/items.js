const express = require('express');
const router = express.Router();
const { getDb, initDb } = require('../db');
const logger = require('../logger');

// ensure DB exists when router is first used
initDb();

router.get('/', (req, res) => {
  const db = getDb();
  db.all('SELECT id, name, created_at FROM items ORDER BY id DESC', (err, rows) => {
    db.close();
    if (err) {
      logger.error(err.message);
      return res.status(500).json({ error: 'DB error' });
    }
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const db = getDb();
  db.run('INSERT INTO items (name) VALUES (?)', [name], function cb(err) {
    if (err) {
      logger.error(err.message);
      db.close();
      return res.status(500).json({ error: 'DB error' });
    }
    const id = this.lastID;
    db.get('SELECT id, name, created_at FROM items WHERE id = ?', [id], (e, row) => {
      db.close();
      if (e) {
        logger.error(e.message);
        return res.status(500).json({ error: 'DB error' });
      }
      res.status(201).json(row);
    });
  });
});

module.exports = router;
