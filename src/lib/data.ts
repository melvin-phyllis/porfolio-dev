import {
  Code2,
  Server,
  Cloud,
  Brain,
  Database,
  Globe,
  Smartphone,
  Shield,
} from "lucide-react";

export const personalInfo = {
  name: "Akou N'dy Phyllis Melvin",
  title: "Développeur Web JS/PHP Full-Stack Junior",
  email: "melvinphyllisakou@gmail.com",
  phone: "+225 01-71-37-90-09",
  location: "Abidjan, Côte d'Ivoire",
  github: "https://github.com/melvin-phyllis",
  linkedin: "https://www.linkedin.com/in/melvin-akou/",
  twitter: "",
};

export const stats = [
  { value: 0, label: "experience" },
  { value: 3, label: "projects" },
  { value: 0, label: "clients" },
  { value: 18, label: "technologies" },
];

export const skills = {
  frontend: [
    { name: "React.js", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "Tailwind CSS", level: 85 },
    { name: "Ionic React", level: 60 },
    { name: "PHP", level: 70 },
  ],
  backend: [
    { name: "Node.js", level: 70 },
    { name: "Express.js", level: 65 },
    { name: "Laravel", level: 65 },
    { name: "JavaScript ES6+", level: 85 },
    { name: "TypeScript", level: 70 },
  ],
  database: [
    { name: "Firebase", level: 80 },
    { name: "MongoDB", level: 60 },
    { name: "MySQL", level: 60 },
  ],
  outils: [
    { name: "Docker", level: 55 },
    { name: "Git & GitHub", level: 80 },
  ],
  automatisation: [
    { name: "N8N", level: 55 },
    { name: "Make", level: 55 },
  ],
  data: [
    { name: "Power BI", level: 50 },
    { name: "Airflow", level: 45 },
  ],
};

export const experiences = [
  {
    type: "work",
    title: "Stage — Développeur Web",
    company: "Ya Consulting",
    location: "Abidjan, Côte d'Ivoire",
    period: "Janvier 2026 – Présent",
    description: [
      "Développement d'applications web avec PHP et Laravel",
      "Intégration d'APIs REST et gestion de bases de données MySQL",
      "Travail en équipe avec méthodologies agiles",
    ],
  },
  {
    type: "education",
    title: "Formation Développement Logiciel & IA",
    company: "GomyCode",
    location: "Côte d'Ivoire",
    period: "Août 2025 – Décembre 2025",
    description: [
      "Formation intensive en développement logiciel avec compétences en IA",
      "Projets pratiques fullstack et bonnes pratiques",
    ],
  },
  {
    type: "education",
    title: "Licence 3 — Développeur d'Application & E-service",
    company: "Université Virtuelle de Côte d'Ivoire (UVCI)",
    location: "Côte d'Ivoire",
    period: "2023 – en cours",
    description: [
      "Formation en développement d'applications web et e-services",
      "Conception, développement et déploiement d'applications modernes",
    ],
  },
  {
    type: "education",
    title: "Certifications — React, Front-End, HTML/CSS, Git",
    company: "Meta & IBM (Coursera) · freeCodeCamp",
    location: "En ligne",
    period: "2025",
    description: [
      "React Basics & Introduction to Front-End Development (Meta)",
      "Introduction to HTML/CSS & JavaScript, Getting Started with Git & GitHub (IBM)",
      "Legacy Responsive Web Design — 300h (freeCodeCamp)",
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Ustream Movies",
    description:
      "Mini-plateforme de streaming avec authentification email/Google, gestion complète du profil utilisateur, CRUD complet avec statut public/privé. Catalogue de films mis à jour en temps réel via SWR et Firebase. Interface moderne et responsive avec animations et modales.",
    image: "/images/projects/ustream.jpg",
    technologies: ["React 19", "Firebase", "Zustand", "SWR", "Tailwind CSS 4", "DaisyUI"],
    category: "fullstack",
    github: "https://github.com/melvin-phyllis/ustream-movies",
    demo: "https://u-stream.netlify.app/",
  },
  {
    id: 2,
    title: "CineVault",
    description:
      "Application web de découverte de films en temps réel via l'API TMDB. Design moderne inspiré de Netflix avec animations et UI responsive. Modal détaillé : synopsis, note, genres.",
    image: "/images/projects/cinevault.jpg",
    technologies: ["HTML5", "CSS3", "JavaScript ES6+", "API TMDB"],
    category: "frontend",
    github: "https://github.com/melvin-phyllis/cinevault",
    demo: "https://melvin-phyllis.github.io/CineVault/",
  },
  {
    id: 3,
    title: "Realtime Taskflow",
    description:
      "Application de gestion de tâches en temps réel. Inscription/connexion via Firebase Auth, CRUD en temps réel, état global Zustand, Routes API Next.js + Server Actions.",
    image: "/images/projects/taskflow.jpg",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Firebase", "Zustand", "Tailwind CSS 4"],
    category: "fullstack",
    github: "https://github.com/melvin-phyllis/realtime-taskflow",
    demo: "https://realtime-taskflow.vercel.app/",
  },
  {
    id: 4,
    title: "ManageX",
    description:
      "Système de Gestion RH avancé. Authentification sécurisée avec Laravel et rôles avancés. Gestion de tâches en direct grâce à Reverb/Pusher. Interface moderne et souple conçue avec Tailwind et composants Blade.",
    image: "/images/projects/managex.jpg",
    technologies: ["PHP", "Laravel", "Tailwind CSS", "Blade", "Reverb", "Pusher"],
    category: "fullstack",
    github: "https://github.com/melvin-phyllis/managex",
    demo: "https://ya-consulting.com/managex/public/",
  },
  {
    id: 5,
    title: "Boutique en Ligne",
    description:
      "Clone e-commerce Autorapid avec landing page, boutique, panier, auth client email/Google, vérification email, espace compte avec wishlist, et backoffice admin complet (CRUD produits, upload images compressées via ImageKit). Architecture API Routes Next.js et Firebase Realtime Database.",
    image: "/images/projects/boutique.jpg",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Firebase", "Tailwind CSS 4", "DaisyUI", "ImageKit", "Zustand"],
    category: "fullstack",
    github: "https://github.com/melvin-phyllis/boutiqueenligne",
    demo: "https://boutique-en-ligne-chi.vercel.app/",
  },
];

export const services = [
  {
    icon: Globe,
    titleKey: "web",
  },
  {
    icon: Server,
    titleKey: "api",
  },
  {
    icon: Cloud,
    titleKey: "devops",
  },
  {
    icon: Brain,
    titleKey: "ai",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Jean-Pierre Kouadio",
    role: "CEO, TechStart Abidjan",
    content:
      "Marie Danielle a transformé notre vision en une application web performante. Sa maîtrise technique et son professionnalisme sont remarquables.",
    image: "/images/testimonials/client1.jpg",
  },
  {
    id: 2,
    name: "Fatou Diallo",
    role: "CTO, InnovaCI",
    content:
      "Excellente collaboration sur notre projet fullstack. Son expertise technique nous a permis d'améliorer considérablement notre application.",
    image: "/images/testimonials/client2.jpg",
  },
  {
    id: 3,
    name: "Amadou Traoré",
    role: "Founder, DataSmart",
    content:
      "L'intégration IA qu'elle a réalisée pour notre chatbot a dépassé nos attentes. Un travail de qualité livré dans les délais.",
    image: "/images/testimonials/client3.jpg",
  },
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/melvin-phyllis",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/melvin-akou/",
    icon: "linkedin",
  },
];
