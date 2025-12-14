const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '..', 'data', 'app.db');

function ensureDataDir() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function getDb() {
  ensureDataDir();
  const db = new sqlite3.Database(DB_PATH);
  return db;
}

function initDb() {
  ensureDataDir();
  const db = new sqlite3.Database(DB_PATH);
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    );
  });
  db.close();
}

if (require.main === module) {
  const arg = process.argv[2];
  if (arg === '--init') {
    initDb();
    console.log('Database initialized at', DB_PATH);
  }
}

module.exports = { getDb, initDb, DB_PATH };
