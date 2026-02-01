# 🌟 Portfolio Melvin phyllis

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime_DB-FFCA28?logo=firebase)](https://firebase.google.com/)

Un portfolio professionnel moderne, multilingue et entièrement administrable. Construit avec les dernières technologies web, il offre une expérience utilisateur exceptionnelle avec des animations fluides et un design responsive.

## ✨ Démo en ligne

🔗 **[Voir le portfolio en production](https://votre-domaine.com)**

---

## 📸 Aperçu

<div align="center">
  <img src="public/images/screenshots/hero.png" alt="Hero Section" width="80%"/>
  <p><em>Section Hero avec animation de particules et curseur personnalisé</em></p>
</div>

---

## 🚀 Fonctionnalités

### Frontend Public
- **Design Moderne** : Interface élégante avec thème sombre optimisé
- **Animations Fluides** : Framer Motion pour des transitions et micro-interactions
- **Curseur Personnalisé** : Effet interactif avec `mix-blend-mode`
- **Background Animé** : Grille de pixels interactive (PixelHoverGrid)
- **100% Responsive** : Mobile, tablette et desktop
- **Multilingue** : Support Français/Anglais avec détection automatique
- **SEO Optimisé** : Meta tags, Open Graph, Schema.org, sitemap

### Sections du Portfolio
| Section | Description |
|---------|-------------|
| **Hero** | Présentation avec animation de typing |
| **À Propos** | Bio, statistiques, téléchargement CV |
| **Compétences** | Grille filtrable par catégorie |
| **Expériences** | Timeline interactive (travail/formation) |
| **Projets** | Galerie avec filtres et liens |
| **Services** | Offres professionnelles |
| **Témoignages** | Carrousel de recommandations |
| **FAQ** | Questions fréquentes en accordéon |
| **Contact** | Formulaire avec envoi d'email |

### Backoffice Admin (`/admin`)
- **Dashboard** : Vue d'ensemble avec statistiques
- **Analytics** : Graphiques de visites et événements
- **Gestion CRUD** : Projets, Compétences, Expériences, Articles
- **Paramètres** : Profil, Photo, CV, Réseaux sociaux
- **Upload d'images** : Intégration ImageKit
- **Authentification** : NextAuth.js sécurisé
- **Theme Toggle** : Mode clair/sombre

---

## 🛠️ Stack Technique

### Frontend
| Technologie | Version | Usage |
|-------------|---------|-------|
| Next.js | 16.1.6 | Framework React avec App Router |
| React | 19.2.3 | Bibliothèque UI |
| TypeScript | 5.x | Typage statique |
| Tailwind CSS | 4.0 | Styling utilitaire |
| Framer Motion | 12.x | Animations |
| next-intl | 4.8 | Internationalisation |
| next-themes | 0.4 | Gestion thèmes |

### Backend & Services
| Service | Usage |
|---------|-------|
| Firebase Realtime DB | Base de données temps réel |
| NextAuth.js v5 | Authentification |
| ImageKit | Hébergement et optimisation images |
| Resend | Envoi d'emails transactionnels |
| Vercel Analytics | Tracking des visites |

### UI Components
| Librairie | Usage |
|-----------|-------|
| Radix UI | Composants accessibles (Dialog, Select, etc.) |
| Lucide React | Icônes SVG |
| React Icons | Icônes de technologies |
| Recharts | Graphiques analytics |
| React Hook Form + Zod | Formulaires et validation |

---

## 📁 Structure du Projet

```
portfolio/
├── messages/                 # Fichiers de traduction
│   ├── en.json              # Anglais
│   └── fr.json              # Français
├── prisma/                   # Schéma DB (optionnel)
├── public/
│   └── images/              # Assets statiques
├── src/
│   ├── app/
│   │   ├── [locale]/        # Routes internationalisées
│   │   │   ├── blog/        # Section blog
│   │   │   ├── layout.tsx   # Layout avec Navbar/Footer
│   │   │   └── page.tsx     # Page d'accueil
│   │   ├── admin/           # Backoffice
│   │   │   ├── dashboard/   # Pages admin
│   │   │   ├── login/       # Authentification
│   │   │   └── actions.ts   # Server Actions
│   │   ├── api/             # API Routes
│   │   └── globals.css      # Styles globaux
│   ├── components/
│   │   ├── admin/           # Composants backoffice
│   │   ├── sections/        # Sections du portfolio
│   │   ├── layout/          # Navbar, Footer
│   │   └── ui/              # Composants réutilisables
│   ├── i18n/                # Configuration i18n
│   └── lib/
│       ├── firebase-db.ts   # Client Firebase
│       ├── auth.ts          # Configuration NextAuth
│       ├── translate.ts     # Service de traduction auto
│       └── validations/     # Schémas Zod
├── middleware.ts            # Redirection locale
├── tailwind.config.js       # Configuration Tailwind
└── next.config.ts           # Configuration Next.js
```

---

## 🔧 Installation

### Prérequis
- **Node.js** 18.x ou supérieur
- **npm** ou **pnpm**
- Compte **Firebase** (gratuit)
- Compte **ImageKit** (gratuit)
- Compte **Resend** (gratuit)

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/votre-utilisateur/portfolio.git
cd portfolio
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

4. **Lancer en développement**
```bash
npm run dev
```

5. **Ouvrir dans le navigateur**
```
http://localhost:3000      # Portfolio public
http://localhost:3000/admin # Backoffice
```

---

## 🔐 Variables d'Environnement

Créez un fichier `.env` à la racine avec ces variables :

```env
# ═══════════════════════════════════════════════════════════
# 🔥 FIREBASE - Base de données
# ═══════════════════════════════════════════════════════════
# Créez un projet sur https://console.firebase.google.com
# Activez Realtime Database
# Project Settings > Service Accounts > Generate New Private Key

FIREBASE_PROJECT_ID=votre-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@votre-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nVOTRE_CLE_PRIVEE\n-----END PRIVATE KEY-----\n"
FIREBASE_DATABASE_URL=https://votre-project-default-rtdb.firebaseio.com

# ═══════════════════════════════════════════════════════════
# 🖼️ IMAGEKIT - Hébergement d'images
# ═══════════════════════════════════════════════════════════
# Créez un compte sur https://imagekit.io
# Dashboard > Developer Options

NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxx
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/votre-id

# ═══════════════════════════════════════════════════════════
# 📧 RESEND - Envoi d'emails
# ═══════════════════════════════════════════════════════════
# Créez un compte sur https://resend.com
# API Keys > Create API Key

RESEND_API_KEY=re_xxxxxxxxxxxxx

# ═══════════════════════════════════════════════════════════
# 🔑 AUTHENTIFICATION ADMIN
# ═══════════════════════════════════════════════════════════
# Identifiants pour accéder au backoffice

ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=VotreMotDePasseSecurise123!

# Secret pour NextAuth (générez avec: openssl rand -base64 32)
AUTH_SECRET=votre-secret-aleatoire-de-32-caracteres

# ═══════════════════════════════════════════════════════════
# 🌐 CONFIGURATION SITE
# ═══════════════════════════════════════════════════════════

NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

---

## 🌍 Internationalisation (i18n)

Le portfolio supporte **Français** et **Anglais** avec :

### Détection Automatique
- Le middleware détecte la langue du navigateur (`Accept-Language`)
- Redirige automatiquement vers `/fr` ou `/en`
- Mémorise le choix via cookie `NEXT_LOCALE`

### Fichiers de Traduction
Les textes sont dans `messages/fr.json` et `messages/en.json` :

```json
{
  "hero": {
    "greeting": "Bonjour, je suis",
    "title": "Marie Danielle Akpeuby",
    "subtitle": "Développeuse Fullstack & DevOps"
  },
  "nav": {
    "home": "Accueil",
    "about": "À propos",
    "projects": "Projets"
  }
}
```

### Traduction Automatique du Contenu
Le contenu dynamique (Firebase) est traduit automatiquement via Google Translate API pour les visiteurs anglophones.

---

## 👤 Guide Admin

### Connexion
1. Accédez à `/admin/login`
2. Entrez vos identifiants (`.env` : `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

### Dashboard
Vue d'ensemble avec :
- Nombre total de projets, compétences, expériences
- Graphiques de visites (si analytics activé)
- Actions rapides

### Gestion du Contenu

| Page | Actions |
|------|---------|
| **Projets** | Ajouter, modifier, supprimer, mettre en avant |
| **Compétences** | Gérer par catégorie (Frontend, Backend, DevOps...) |
| **Expériences** | Timeline travail/formation |
| **Articles** | Blog avec éditeur Markdown |
| **Analytics** | Statistiques de visites |
| **Paramètres** | Profil, photo, CV, réseaux sociaux |

### Upload d'Images
1. Cliquez sur "Choisir une image"
2. Sélectionnez un fichier (max 5MB)
3. L'image est uploadée sur ImageKit
4. L'URL est automatiquement enregistrée

---

## 🚀 Déploiement

### Vercel (Recommandé)

1. **Pushez sur GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Importez dans Vercel**
   - Connectez votre repo GitHub
   - Vercel détecte automatiquement Next.js

3. **Configurez les variables d'environnement**
   - Project Settings > Environment Variables
   - Ajoutez toutes les variables du `.env`

4. **Déployez**
   - Cliquez "Deploy"
   - Votre site est en ligne !

### Firebase Rules

Après déploiement, mettez à jour les règles Firebase :

```json
{
  "rules": {
    ".read": true,
    ".write": false,
    "analytics": {
      "pageViews": {
        ".indexOn": ["timestamp"]
      },
      "events": {
        ".indexOn": ["timestamp"]
      }
    }
  }
}
```

---

## ⚠️ Dépannage

### Images non affichées
- Vérifiez que le domaine ImageKit est dans `next.config.ts`
- Uploadez une nouvelle image via l'admin

### Erreur Resend "testing emails"
- Plan gratuit : emails uniquement vers votre adresse Resend
- Configurez le même email dans Admin > Paramètres

### Erreur de build TypeScript
```bash
# Nettoyez le cache
rm -rf .next
npm run build
```

### Avertissements Next.js 16 "params Promise"
- Normal en développement avec les DevTools
- N'affecte pas la production

---

## 📜 Scripts Disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Démarrer en production
npm run lint     # Vérification ESLint
```

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👩‍💻 Auteur

**Marie-Danielle Akpeuby**
- Portfolio : [zaerthnh.dev](https://zaerthnh.dev)
- GitHub : [@Melvin-phyllis](https://github.com/zaerthnh)
- LinkedIn : [Akou Melvin](https://linkedin.com/in/zaerthnh)

---

<div align="center">
  <p>⭐ N'hésitez pas à mettre une étoile si ce projet vous a été utile !</p>
</div>
