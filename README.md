# OptionsModel - Administration d'Options Hiérarchiques

Ce projet est une application web full-stack Next.js 15 (TypeScript) permettant d'administrer des données hiérarchiques ("optionsModel") via une interface moderne et une API RESTful connectée à une base SQLite.

## Fonctionnalités principales
- **Gestion d'options hiérarchiques** sur 5 niveaux (vue à colonnes dynamiques)
- **API RESTful** pour opérations CRUD (Create, Read, Update, Delete)
- **Base de données SQLite** (fichier `database.db` à la racine)
- **Interface utilisateur** moderne avec React, Tailwind CSS, et modale d'ajout

## Installation et démarrage

1. **Installer les dépendances**
   ```bash
   pnpm install
   ```

2. **Initialiser la base de données**
   ```bash
   node scripts/init-db.mjs
   ```
   
   ```bash
   node scripts/init-db-lieux.mjs
   ```


3. **(Optionnel) Remplir la base avec des données de test**
   ```bash
   node scripts/fill-db.mjs
   ```

4. **Lancer le serveur de développement**
   ```bash
   pnpm dev
   ```

5. **Accéder à l'application**
   Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du projet
- `src/app/api/options/route.ts` : API RESTful (GET, POST)
- `src/app/page.tsx` : Interface utilisateur principale (5 colonnes dynamiques, modale d'ajout)
- `scripts/init-db.mjs` : Script d'initialisation de la base
- `scripts/fill-db.mjs` : Script pour insérer des données de test
- `database.db` : Fichier SQLite

## Utilisation de l'interface
- **Navigation** : Cliquez sur une option pour explorer ses sous-options (jusqu'à 5 niveaux).
- **Ajout** : Cliquez sur le bouton "+" à côté d'une option (ou en bas de la colonne 1 pour une racine) pour ouvrir la modale d'ajout.
- **Formulaire d'ajout** : Remplissez les champs requis, validez pour ajouter l'option à la bonne place dans la hiérarchie.

## API
- `GET /api/options` : Liste les options de niveau 1
- `GET /api/options?parentId=ID` : Liste les sous-options d'une option
- `POST /api/options` : Ajoute une option (voir le code pour le format attendu)

## Dépendances principales
- [Next.js 15](https://nextjs.org/)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Auteur :** [Votre nom]

