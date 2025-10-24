// Script d'initialisation de la base de données SQLite pour la table options
import Database from 'better-sqlite3';

const db = new Database('database.db');

db.exec(`
CREATE TABLE IF NOT EXISTS options (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  nameAr TEXT,
  priority INTEGER DEFAULT 1,
  tag TEXT,
  depth INTEGER NOT NULL,
  parentID INTEGER,
  FOREIGN KEY (parentID) REFERENCES options(id) ON DELETE CASCADE
);
`);

console.log('Table options créée ou déjà existante.');
db.close();
