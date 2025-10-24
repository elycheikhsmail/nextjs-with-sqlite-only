import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const body = await request.json();
    const { name, nameAr, priority = 1, tag, depth, parentID } = body;
    if (!id || !name || !depth) {
      return new NextResponse('Champs obligatoires manquants', { status: 400 });
    }
    const db = new Database('dbLieux.db');
    const stmt = db.prepare(
      'UPDATE options SET name = ?, nameAr = ?, priority = ?, tag = ?, depth = ?, parentID = ? WHERE id = ?'
    );
    stmt.run(name, nameAr, priority, tag, depth, parentID, id);
    const option = db.prepare('SELECT * FROM options WHERE id = ?').get(id);
    db.close();
    return NextResponse.json(option, { status: 200 });
  } catch (error) {
    return new NextResponse('Erreur serveur', { status: 500 });
  }
}
