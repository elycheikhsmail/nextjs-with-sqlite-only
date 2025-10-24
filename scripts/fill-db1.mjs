// Script pour remplir la table options avec des données de test
import Database from 'better-sqlite3';

const db = new Database('database.db');

const data = [
  { name: 'Catégorie 1', nameAr: 'الفئة 1', priority: 1, tag: 'A', depth: 1, parentID: null },
  { name: 'Catégorie 2', nameAr: 'الفئة 2', priority: 2, tag: 'B', depth: 1, parentID: null },
  { name: 'Sous-catégorie 1.1', nameAr: 'فرع 1.1', priority: 1, tag: 'A1', depth: 2, parentID: 1 },
  { name: 'Sous-catégorie 1.2', nameAr: 'فرع 1.2', priority: 2, tag: 'A2', depth: 2, parentID: 1 },
  { name: 'Sous-catégorie 2.1', nameAr: 'فرع 2.1', priority: 1, tag: 'B1', depth: 2, parentID: 2 },
  { name: 'Option 1.1.1', nameAr: 'خيار 1.1.1', priority: 1, tag: 'A1a', depth: 3, parentID: 3 },
];

const stmt = db.prepare('INSERT INTO options (name, nameAr, priority, tag, depth, parentID) VALUES (?, ?, ?, ?, ?, ?)');
data.forEach(opt => {
  stmt.run(opt.name, opt.nameAr, opt.priority, opt.tag, opt.depth, opt.parentID);
});

db.close();
console.log('Table options remplie avec des données de test.');
