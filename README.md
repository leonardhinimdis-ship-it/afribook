# 🌍 AfriBook - Réseau Social & Communautaire Africain

> **AfriBook** est une plateforme communautaire et sociale moderne conçue spécialement pour répondre aux réalités, aux usages et aux défis d'infrastructure du continent africain : optimisation de la bande passante (**Mode Économie de Données / Low-Data**), authentification par numéro de téléphone mobile ou email, groupes locaux d'entraide et messagerie directe résiliente.

---

## 🚀 Fonctionnalités Clés

1. **⚡ Mode Économie de Données (Low-Data)**
   - Réduction drastique de la consommation de bande passante (jusqu'à -70% de Mo consommés).
   - Bascule automatique ou manuelle vers des médias compressés basse résolution.
   - Idéal pour les forfaits mobiles quotidiens (Pass Internet Orange, MTN MoMo, Wave, etc.) et les réseaux 2G/3G/4G instables.

2. **📱 Authentification Flexible & Sécurisée**
   - Inscription et connexion par **Numéro de téléphone** (+221, +225, +223, +237...) ou par **Email**.
   - Rotation de jetons d'accès JWT (`15m`) et Refresh Tokens sécurisés (`30j`) avec détection de réutilisation et révocation en base de données.
   - Chiffrement fort des mots de passe avec `bcryptjs` (facteur 12).

3. **📰 Fil d'actualité & Réactions Panafricaines**
   - Publications publiques, entre amis ou ciblées par groupe avec support d'upload photo depuis l'appareil.
   - Système de réactions expressives flottant : 👍 *J'aime*, ❤️ *J'adore*, 🤝 *Solidarité / Soutien*, 😂 *Haha*, 😮 *Wouah*, 😢 *Triste*, 😡 *Grrr*.
   - Carrousel et lecteur interactif de **Stories plein écran** (avec barre de progression et réactions rapides).
   - Commentaires et réponses hiérarchiques.

4. **🏪 Marketplace Panafricain & Petites Annonces**
   - Achat et vente de produits locaux (High-Tech, Mode & Wax, AgriBio, Véhicules).
   - Affichage des prix en FCFA (`XAF`/`XOF`), géolocalisation par ville et contact direct WhatsApp.

5. **📺 AfriReels & Vidéos Courtes**
   - Lecteur vidéo format court pour créateurs et entrepreneurs africains.

6. **💬 Messagerie Privée, Notes Vocales & Notifications**
   - Discussions instantanées avec accusé de lecture et lecteur de **notes vocales (waveform audio)**.
   - Centre de notifications déroulant interactif.
   - Synthétiseur audio Web Audio API pour retours haptiques et sonores subtils.

---

## 📂 Architecture du Projet

```text
projet/
├── database/
│   ├── schema.sql              # Schéma PostgreSQL complet (tables, indexes, triggers)
│   └── seeds.sql               # Données de démonstration réalistes (utilisateurs, posts, groupes)
├── src/
│   ├── config/
│   │   ├── env.js              # Variables d'environnement et constantes
│   │   └── db.js               # Connexion Pool PostgreSQL + Mode Résilience intégré
│   ├── middleware/
│   │   ├── auth.middleware.js  # Vérification JWT et requêtes authentifiées
│   │   └── error.middleware.js # Gestionnaire d'erreurs
│   ├── controllers/
│   │   ├── auth.controller.js  # Register, Login, Refresh, Logout, Profil
│   │   ├── posts.controller.js # Fil d'actualité, créations, réactions, commentaires
│   │   ├── groups.controller.js# Gestion des groupes et adhésions
│   │   ├── users.controller.js # Profil public, recherche, bascule Low-Data
│   │   ├── friends.controller.js # Demandes d'amis et connexions
│   │   ├── messages.controller.js# Conversations privées et messages
│   │   └── notifications.controller.js # Notifications en temps réel
│   ├── routes/                 # Définition des routes Express
│   ├── app.js                  # Configuration Express, CORS et fichiers statiques
│   └── server.js               # Point d'entrée du serveur backend (Port 4000)
├── public/                     # Application Web Frontend (Single Page App)
│   ├── index.html              # Interface utilisateur moderne et responsive
│   ├── css/
│   │   └── style.css           # Thème aux couleurs africaines (émeraude, or, terre)
│   └── js/
│       └── app.js              # Moteur client (gestion de l'état, feed, chat, offline-mode)
├── docker-compose.yml          # Stack Docker complète (PostgreSQL 16 + API Node.js)
├── Dockerfile                  # Conteneurisation de l'application
├── package.json                # Dépendances Node.js (express, pg, bcryptjs, jwt...)
├── start.bat                   # Lanceur 1-clic pour Windows
├── start.sh                    # Lanceur 1-clic pour Linux / macOS
└── README.md                   # Documentation complète
```

---

## 🏁 Comment Lancer le Projet

### Méthode 1 : Lancement Immédiat (1 Clic sous Windows)
Double-cliquez simplement sur le fichier :
👉 **`start.bat`**

- Si Node.js est installé, il installe les paquets et lance le serveur sur `http://localhost:4000`.
- Si Node.js n'est pas encore installé, il ouvre instantanément l'interface web interactive dans votre navigateur !

---

### Méthode 2 : Avec Docker & PostgreSQL (Recommandé en production)
Une seule commande suffit pour démarrer la base PostgreSQL et l'application :

```bash
docker compose up --build
```

- Application Web & API : **http://localhost:4000**
- Base de données PostgreSQL : **localhost:5432** (Base `afribook`, utilisateur `postgres`)

---

### Méthode 3 : Avec Node.js en local

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **(Optionnel) Initialiser la base PostgreSQL :**
   ```bash
   npm run db:init
   ```

3. **Démarrer l'application :**
   ```bash
   npm start
   ```

> 💡 **Mode Résilience Zéro-Blocage** : Si PostgreSQL n'est pas encore installé sur votre machine, le serveur démarre automatiquement avec son store en mémoire pré-rempli ! Aucun crash lié à la base de données.

---

### Méthode 4 : Ouverture directe dans le Navigateur
Vous pouvez également faire un clic-droit sur `public/index.html` > **Ouvrir avec Google Chrome / Microsoft Edge**. L'interface s'exécute immédiatement en mode interactif avec les données de test intégrées !

---

## 👥 Comptes de Démonstration (Prêts à l'emploi)

Vous pouvez tester l'application en changeant d'utilisateur d'un simple clic depuis la barre latérale ou en utilisant les identifiants suivants :

| Utilisateur | Identifiant (Email ou Téléphone) | Ville / Pays | Rôle & Spécialité | Mot de passe |
| :--- | :--- | :--- | :--- | :--- |
| **Jean Pierre MANGA** | `jeanpierre@afribook.africa` ou `+237699001122` | Yaoundé, Cameroun | Compte Officiel Vérifié (@jeanpierremanga) | `Afribook2026!` |
| **Aminata Diallo** | `aminata@afribook.africa` ou `+221770001122` | Dakar, Sénégal | Entrepreneure AgriTech (SunuBio) | `Afribook2026!` |
| **Koffi Mensah** | `koffi@afribook.africa` ou `+225070022334` | Abidjan, Côte d'Ivoire | Développeur FinTech (Wave, MoMo) | `Afribook2026!` |
| **Fatou Traoré** | `fatou@afribook.africa` ou `+22366003344` | Bamako, Mali | Designer UI/UX Low-Data | `Afribook2026!` |
| **Samuel Kamga** | `samuel@afribook.africa` ou `+23769004455` | Douala, Cameroun | E-commerce & Logistique | `Afribook2026!` |

---

## 🔌 Référence des Endpoints de l'API REST

### Authentification (`/api/auth`)
- `POST /api/auth/register` : Inscription par nom, téléphone/email, mot de passe.
- `POST /api/auth/login` : Connexion avec identifiant (email/téléphone/pseudo) + mot de passe.
- `POST /api/auth/refresh` : Renouvellement sécurisé du jeton d'accès via le refresh token.
- `POST /api/auth/logout` : Révocation du refresh token.
- `GET /api/auth/me` : Récupération du profil de l'utilisateur connecté (Protégé par JWT).

### Publications & Fil (`/api/posts`)
- `GET /api/posts` : Récupère le fil d'actualité (avec compteurs de réactions et commentaires).
- `POST /api/posts` : Crée une nouvelle publication (support des médias normaux et low-data).
- `POST /api/posts/:id/react` : Ajoute ou modifie une réaction (*like*, *love*, *support*, etc.).
- `GET /api/posts/:id/comments` : Liste les commentaires d'une publication.
- `POST /api/posts/:id/comments` : Ajoute un commentaire ou une réponse.

### Groupes Communautaires (`/api/groups`)
- `GET /api/groups` : Liste des groupes (filtrable par catégorie et recherche).
- `GET /api/groups/:id` : Détails d'un groupe et liste de ses membres.
- `POST /api/groups` : Création d'un nouveau groupe communautaire.
- `POST /api/groups/:id/join` : Rejoindre un groupe.

### Messagerie Directe (`/api/messages`)
- `GET /api/messages/conversations` : Liste des conversations actives.
- `GET /api/messages/:contactId` : Historique des messages avec un contact.
- `POST /api/messages/:contactId` : Envoi d'un message direct.

### Utilisateurs & Profils (`/api/users`)
- `GET /api/users/profile/:id` : Consultation d'un profil public.
- `PUT /api/users/profile` : Mise à jour de ses informations (bio, ville, pays, avatar).
- `POST /api/users/low-data/toggle` : Bascule directe du mode économie de données.
- `GET /api/users/search?q=...` : Recherche de membres par nom, ville ou compétence.

---

## 📄 Licence
Ce projet est distribué sous licence MIT. Fait avec passion pour l'Afrique et les innovations locales ! 🌍🌱
