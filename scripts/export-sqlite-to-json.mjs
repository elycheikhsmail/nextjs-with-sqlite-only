import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const db = new Database("database.db");
const rows = db.prepare("SELECT * FROM options").all();

const jsonPath = path.join(process.cwd(), "data", "options.json");
fs.writeFileSync(jsonPath, JSON.stringify(rows, null, 2));

console.log(`✅ Données exportées vers ${jsonPath} (${rows.length} lignes)`);
db.close();
