# Portfolio Marie-Danielle

Un portfolio professionnel moderne et administrable, construit avec **Next.js 15**, **Tailwind CSS**, et **Framer Motion**.
Il inclut un **Tableau de Bord Administrateur** pour gérer dynamiquement tout le contenu du site (projets, compétences, expériences, profil).

## 🚀 Fonctionnalités Clés

*   **Frontend Moderne** : Animations fluides (Framer Motion), design responsive, mode sombre/clair.
*   **Contenu Dynamique** : Tout est modifiable sans toucher au code (titres, textes, images).
*   **Backoffice Complet** (`/admin`) :
    *   Gestion du Profil (Nom, Bio, Photo, CV, Réseaux sociaux).
    *   Gestion des Projets, Compétences, et Expériences.
    *   Configuration des emails de contact.
*   **Formulaire de Contact** : Envoi d'emails réels via **Resend**.
*   **Gestion des Images** : Upload et optimisation via **ImageKit**.
*   **Base de Données** : Firebase Realtime Database pour un stockage rapide et temps-réel.

---

## 🛠️ Prérequis techniques

*   [Node.js](https://nodejs.org/) (v18 ou supérieur recommandé)
*   [npm](https://www.npmjs.com/)

---

## 📦 Installation

1.  **Cloner le projet** :
    ```bash
    git clone https://github.com/votre-utilisateur/portfolio-marie-danielle.git
    cd portfolio
    ```

2.  **Installer les dépendances** :
    ```bash
    npm install
    ```

3.  **Configurer les variables d'environnement** :
    *   Dupliquez le fichier `.env.example` et renommez-le en `.env`.
    *   Remplissez les clés API nécessaires (voir section [Configuration détaillée](#-configuration-détaillee)).

    ```bash
    cp .env.example .env
    ```

4.  **Lancer le serveur de développement** :
    ```bash
    npm run dev
    ```
    Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

---

## 🔑 Configuration Détaillée

Pour que le site fonctionne à 100%, vous avez besoin de configurer 3 services gratuits :

### 1. Firebase (Base de Données)
Utilisé pour stocker les textes et données.
*   Créez un projet sur [Firebase Console](https://console.firebase.google.com/).
*   Activez **Realtime Database**.
*   Allez dans **Project Settings > Service accounts**.
*   Générez une nouvelle clé privée (fichier JSON).
*   Copiez les valeurs dans votre `.env` :
    *   `FIREBASE_PROJECT_ID`
    *   `FIREBASE_CLIENT_EMAIL`
    *   `FIREBASE_PRIVATE_KEY` (gardez bien les sauts de ligne `\n` ou mettez la clé entre guillemets doubles si nécessaire).
    *   `FIREBASE_DATABASE_URL`

### 2. ImageKit (Hébergement d'images)
Utilisé pour uploader les photos de projets et de profil.
*   Créez un compte sur [ImageKit.io](https://imagekit.io/).
*   Allez dans **Developer options**.
*   Copiez les clés dans `.env` :
    *   `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`
    *   `IMAGEKIT_PRIVATE_KEY`
    *   `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`

### 3. Resend (Emails)
Utilisé pour recevoir les messages du formulaire de contact.
*   Créez un compte sur [Resend.com](https://resend.com/).
*   Créez une API Key.
*   Ajoutez-la dans `.env` : `RESEND_API_KEY`.
*   ⚠️ **Important (Plan Gratuit)** : Vous ne pouvez envoyer des emails **vers** l'adresse email utilisée lors de votre inscription. Assurez-vous que l'email configuré dans l'Admin correspond à votre compte Resend.

### 4. Authentification Admin
Pour sécuriser l'accès à `/admin`, définissez ces variables dans `.env` :
*   `ADMIN_EMAIL` (ex: `admin@portfolio.com`)
*   `ADMIN_PASSWORD` (ex: `password123`)

---

## 🛡️ Accès Admin

L'interface d'administration n'est pas publique.
Accédez-y via : **[http://localhost:3000/admin](http://localhost:3000/admin)**

*(Note : Actuellement, l'authentification est simplifiée (NextAuth) ou ouverte en dev. Assurez-vous de sécuriser cette route avant un déploiement public).*

### Fonctionnalités Admin :
*   **Dashboard** : Vue d'ensemble.
*   **Projets / Compétences / Expériences** : Ajouter, modifier, supprimer.
*   **Paramètres** :
    *   Modifier le **Titre** et **Sous-titre** de la page d'accueil.
    *   Changer la **Photo de Profil**.
    *   Mettre à jour le **CV** (PDF).
    *   Configurer l'**Email de réception** des messages.

---

## ⚠️ Dépannage Courant

**Erreur "Invalid image" ou images manquantes :**
Le serveur utilise `next/image` qui est strict. Si une image manque dans le dossier `public/` ou si l'URL externe n'est pas autorisée dans `next.config.ts`, l'image ne s'affichera pas.
*   Solution : Uploadez une nouvelle image via l'admin pour écraser les liens cassés.
*   Un système de "fallback" (image par défaut) est en place pour éviter les crashs visuels.

**Erreur "Resend: You can only send testing emails to your own email address" :**
*   Vous utilisez le plan gratuit de Resend.
*   Allez dans **Admin > Paramètres** et mettez votre email Resend dans le champ "Email de contact".

**Erreur "Body exceeded 1 MB limit" :**
*   L'upload de fichiers a été configuré pour accepter jusqu'à **5Mo**. Si vous avez cette erreur, redémarrez le serveur (`npm run dev`).

---

## 🚀 Déploiement

La méthode recommandée est **Vercel** :
1.  Poussez ce code sur GitHub.
2.  Importez le projet dans Vercel.
3.  Ajoutez toutes les variables d'environnement (`.env`) dans les paramètres du projet Vercel.
4.  Déployez !
