import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Option = {
  id: number;
  name: string;
  nameAr: string;
  priority: number;
  tag: string;
  depth: number;
  parentID: number | null;
};

// Cache JSON
let cachedData: Option[] | null = null;

// Fonction pour lire le JSON une seule fois
function readJSON(): Option[] {
  if (cachedData) return cachedData;
  const filePath = path.join(process.cwd(), "data", "options.json");
  const content = fs.readFileSync(filePath, "utf-8");
  cachedData = JSON.parse(content);
  return cachedData!;
}

// GET handler (lecture seule)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get("parentId");

    const data = readJSON();

    let rows: Option[];
    if (parentId === null) {
      // Retourne les entrées de depth = 1
      rows = data.filter((o) => o.depth === 1);
    } else {
      const idNum = Number(parentId);
      rows = data.filter((o) => o.parentID === idNum);
    }

    return NextResponse.json(rows);
  } catch (err) {
    console.error("Erreur API JSON:", err);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}

// POST / PUT / DELETE → interdits ici
export async function POST() {
  return new NextResponse("Lecture seule : écriture interdite", { status: 405 });
}
export async function PUT() {
  return new NextResponse("Lecture seule : écriture interdite", { status: 405 });
}
export async function DELETE() {
  return new NextResponse("Lecture seule : écriture interdite", { status: 405 });
}
