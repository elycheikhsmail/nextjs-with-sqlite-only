Objectif Global
Créer une application web full-stack avec pnpm Next.js 15 pour administrer des données hiérarchiques appelées "optionsModel". L'application doit inclure un backend avec une API RESTful pour les opérations CRUD sur une base de données SQLite, et une interface frontend dynamique pour visualiser et gérer ces options dans une vue à colonnes.

Phase 1 : Backend et Base de Données
Tâche 1.1 : Initialisation du Projet et de la Base de Données

Projet : Initialise un nouveau projet Next.js 15 en utilisant TypeScript.

Dépendances : Installe la bibliothèque better-sqlite3 pour l'interaction avec la base de données.

Base de Données : Crée un fichier de base de données à la racine du projet nommé database.db.

Script d'Initialisation : Crée un script (/scripts/init-db.mjs) qui établit une connexion à database.db et exécute la requête SQL suivante pour créer la table options. Ce script est destiné à être exécuté manuellement une seule fois.

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

Tâche 1.2 : Création de l'API RESTful
Crée les routes d'API suivantes dans le répertoire /app/api/options/.

Tâche 1.2.1 : Route pour LIRE les options (GET)

Chemin : Crée un fichier de route pour GET /api/options.

Logique :

La route doit accepter un paramètre de requête optionnel : parentId.

Si parentId n'est pas fourni, retourne un tableau JSON de toutes les options où depth = 1.

Si parentId est fourni, retourne un tableau JSON de toutes les options où le champ parentID correspond à la valeur du parentId fourni.

En cas d'erreur, retourne un statut 500.

Tâche 1.2.2 : Route pour CRÉER une option (POST)

Chemin : Crée un fichier de route pour POST /api/options.

Logique :

Accepte un corps de requête JSON contenant name, nameAr, priority, tag, depth, et parentID.

Insère une nouvelle ligne dans la table options avec les données reçues.

Retourne l'objet option nouvellement créé (y compris son id auto-généré) avec un statut 201.

Tâche 1.2.3 : Routes pour METTRE À JOUR et SUPPRIMER (PUT, DELETE)

Crée les routes dynamiques /api/options/[id] pour les méthodes PUT et DELETE afin d'assurer une gestion complète des données.

Phase 2 : Interface Frontend (React / Next.js)
Crée une page unique à la racine (/app/page.tsx) pour l'interface utilisateur.

Tâche 2.1 : Mise en Page et Structure des Colonnes

Utilise Tailwind CSS (inclus dans Next.js) pour créer une mise en page principale.

Cette mise en page doit consister en une grille ou un conteneur flexbox affichant 5 colonnes de largeur égale.

Chaque colonne doit avoir un en-tête clair, par exemple : "Niveau 1", "Niveau 2", etc.

Tâche 2.2 : Affichage et Interaction des Données

État React : Utilise des hooks useState pour gérer les données de chaque colonne et les sélections actives. Crée un état pour chaque colonne, par exemple const [column1Data, setColumn1Data] = useState([]), etc.

Chargement Initial : Au chargement de la page, utilise un useEffect pour appeler l'API (GET /api/options) et peupler la première colonne avec les options de depth = 1.

Interaction de Sélection :

Quand un utilisateur clique sur un nom d'option dans une colonne N, cet élément doit être visuellement mis en surbrillance (ex: changement de couleur de fond).

L'ID de cet élément est enregistré dans un état selectedInColumnN.

Le contenu de toutes les colonnes suivantes (N+1 à 5) est vidé.

Un nouvel appel API est déclenché : GET /api/options?parentId={ID_sélectionné}.

Les résultats de cet appel sont utilisés pour peupler la colonne N+1.

Bouton d'Ajout : À côté de chaque nom d'option affiché dans les colonnes, inclus une petite icône ou un bouton "+".

Tâche 2.3 : Formulaire d'Ajout en Popup (Modale)

Composant Modale : Crée un composant React pour une modale/popup qui est caché par défaut.

Déclenchement : Quand l'utilisateur clique sur un bouton "+", la modale devient visible.

État de la Modale : L'état de la modale doit stocker l'ID et la profondeur du parent (parentID et parentDepth) pour savoir où la nouvelle option doit être ajoutée.

Champs du Formulaire : La modale doit contenir un formulaire avec les champs suivants :

name (champ de texte, obligatoire)

nameAr (champ de texte)

priority (champ numérique, valeur par défaut 1)

tag (champ de texte)

Logique de Soumission :

À la soumission, récupère les valeurs du formulaire.

Construis l'objet de données complet en ajoutant depth (qui est parentDepth + 1) et parentID (qui a été stocké à l'ouverture de la modale).

Envoie cet objet via un appel POST à /api/options.

En cas de succès, ferme la modale et rafraîchis la colonne enfant appropriée pour afficher la nouvelle option sans recharger la page.



Tâche 2.4 : Formulaire d'actualisation en Popup (Modale)

Composant Modale : Crée un composant React pour une modale/popup qui est caché par défaut.

Déclenchement : Quand l'utilisateur clique sur un bouton ayant un icon d'actualisation (à cote du bouton "+"), la modale devient visible.

État de la Modale : L'état de la modale doit stocker l'ID et la profondeur du parent (parentID et parentDepth) pour savoir où la nouvelle option doit être ajoutée.

Champs du Formulaire : La modale doit contenir un formulaire avec les champs suivants :

name (champ de texte, obligatoire)

nameAr (champ de texte)

priority (champ numérique, valeur par défaut 1)

tag (champ de texte)

Logique de Soumission :

À la soumission, récupère les valeurs du formulaire.

Construis l'objet de données complet en ajoutant depth (qui est parentDepth + 1) et parentID (qui a été stocké à l'ouverture de la modale).

Envoie cet objet via un appel POST à /api/options.

En cas de succès, ferme la modale et rafraîchis la colonne enfant appropriée pour afficher la nouvelle option sans recharger la page.