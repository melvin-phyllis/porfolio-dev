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
  name: "Marie Danielle Akpeuby",
  title: "Développeuse Fullstack & DevOps",
  email: "yapozaerthnh0@gmail.com",
  phone: "+225 0595875899",
  location: "Côte d'Ivoire",
  github: "https://github.com/zaerthnh",
  linkedin: "https://linkedin.com/in/zaerthnh",
  twitter: "https://twitter.com/zaerthnh",
};

export const stats = [
  { value: 2, label: "experience" },
  { value: 15, label: "projects" },
  { value: 10, label: "clients" },
  { value: 20, label: "technologies" },
];

export const skills = {
  frontend: [
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 90 },
    { name: "JavaScript ES6+", level: 90 },
    { name: "React.js", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "TypeScript", level: 80 },
  ],
  backend: [
    { name: "Node.js", level: 85 },
    { name: "Express.js", level: 85 },
    { name: "Django", level: 75 },
    { name: "FastAPI", level: 80 },
    { name: "Laravel", level: 70 },
  ],
  devops: [
    { name: "Docker", level: 85 },
    { name: "Kubernetes", level: 75 },
    { name: "GitHub Actions", level: 80 },
    { name: "Terraform", level: 70 },
    { name: "Ansible", level: 65 },
  ],
  database: [
    { name: "PostgreSQL", level: 85 },
    { name: "MySQL", level: 80 },
    { name: "MongoDB", level: 80 },
    { name: "Redis", level: 75 },
  ],
  ai: [
    { name: "CrewAI", level: 75 },
    { name: "RAG", level: 70 },
    { name: "Prompt Engineering", level: 80 },
    { name: "LangChain", level: 70 },
  ],
};

export const experiences = [
  {
    type: "work",
    title: "Développeuse Fullstack & DevOps",
    company: "Neurones Talents",
    location: "Côte d'Ivoire",
    period: "Juin 2025 - Présent",
    description: [
      "Conception et développement d'applications web fullstack avec React.js, Next.js pour le frontend et Node.js/Express, Django pour le backend",
      "Intégration d'agents IA conversationnels utilisant CrewAI et techniques de RAG pour l'automatisation des processus métier",
      "Mise en place d'architectures microservices conteneurisées avec Docker et orchestration Kubernetes",
      "Développement d'une API REST complète pour gestion de blog avec CRUD, authentification et autorisation basée sur les rôles",
    ],
  },
  {
    type: "work",
    title: "Stagiaire Développeuse Frontend",
    company: "Leader World Perfect",
    location: "Côte d'Ivoire",
    period: "Août 2024 - Octobre 2024",
    description: [
      "Développement d'interfaces utilisateur responsives et accessibles avec HTML5, CSS3, JavaScript ES6+",
      "Collaboration avec les équipes produit et design pour l'intégration de maquettes Photoshop",
    ],
  },
  {
    type: "education",
    title: "Formation Ingénieur Développeur Fullstack & DevOps",
    company: "Neurones Academy",
    location: "Côte d'Ivoire",
    period: "2025",
    description: [
      "Formation intensive en développement fullstack et pratiques DevOps",
      "Projets pratiques avec React, Node.js, Docker, Kubernetes",
    ],
  },
  {
    type: "education",
    title: "Licence en Développeur d'application",
    company: "Agitel Formation",
    location: "Côte d'Ivoire",
    period: "2022 - 2025",
    description: [
      "Formation complète en développement d'applications",
      "Bases solides en programmation et génie logiciel",
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Application de Gestion de Blog",
    description:
      "API REST complète pour gestion de blog avec CRUD, authentification JWT et autorisation basée sur les rôles.",
    image: "/images/projects/blog-api.jpg",
    technologies: ["Node.js", "Express", "MongoDB", "JWT"],
    category: "backend",
    github: "https://github.com/zaerthnh/blog-api",
    demo: "",
  },
  {
    id: 2,
    title: "Dashboard Analytics",
    description:
      "Tableau de bord interactif avec visualisations de données en temps réel et graphiques animés.",
    image: "/images/projects/dashboard.jpg",
    technologies: ["React", "Next.js", "Chart.js", "Tailwind"],
    category: "fullstack",
    github: "https://github.com/zaerthnh/dashboard",
    demo: "",
  },
  {
    id: 3,
    title: "Agent IA Conversationnel",
    description:
      "Chatbot intelligent utilisant CrewAI et RAG pour l'automatisation du support client.",
    image: "/images/projects/ai-agent.jpg",
    technologies: ["Python", "CrewAI", "LangChain", "FastAPI"],
    category: "backend",
    github: "https://github.com/zaerthnh/ai-agent",
    demo: "",
  },
  {
    id: 4,
    title: "Infrastructure Kubernetes",
    description:
      "Déploiement d'une architecture microservices sur Kubernetes avec CI/CD automatisé.",
    image: "/images/projects/k8s.jpg",
    technologies: ["Docker", "Kubernetes", "GitHub Actions", "Terraform"],
    category: "devops",
    github: "https://github.com/zaerthnh/k8s-infra",
    demo: "",
  },
  {
    id: 5,
    title: "E-commerce Platform",
    description:
      "Plateforme e-commerce complète avec panier, paiement et gestion des commandes.",
    image: "/images/projects/ecommerce.jpg",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    category: "fullstack",
    github: "https://github.com/zaerthnh/ecommerce",
    demo: "",
  },
  {
    id: 6,
    title: "Portfolio Personnel",
    description:
      "Ce portfolio moderne et animé créé avec Next.js et Framer Motion.",
    image: "/images/projects/portfolio.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    category: "frontend",
    github: "https://github.com/zaerthnh/portfolio",
    demo: "",
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
      "Excellente collaboration sur notre projet de microservices. Son expertise DevOps nous a permis d'améliorer considérablement notre pipeline de déploiement.",
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
    url: "https://github.com/zaerthnh",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/zaerthnh",
    icon: "linkedin",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/zaerthnh",
    icon: "twitter",
  },
];
