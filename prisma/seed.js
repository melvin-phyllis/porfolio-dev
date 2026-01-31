const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting seeding...");

    // 1. Seed User (Admin)
    const email = "marie@portfolio.com";
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: "Yapo Marie Danielle Akpeuby",
            password: hashedPassword,
        },
    });
    console.log("✅ Admin user seeded");

    // 2. Seed Profile
    const profileData = {
        headline: "Développeuse Fullstack & DevOps",
        subheadline: "Passionnée par le code et l'innovation",
        about: "Développeuse fullstack et DevOps passionnée, avec une solide formation académique et des expériences pratiques significatives. Experte en conception d'applications web modernes (React, Next.js, Node.js) et en déploiement d'architectures scalables (Docker, Kubernetes). Je maîtrise également l'intégration d'intelligences artificielles (CrewAI, RAG) pour automatiser les processus métier.",
        email: "yapomariedanielle0@gmail.com",
        github: "https://github.com/mariedanielle",
        linkedin: "https://linkedin.com/in/mariedanielle",
        twitter: "https://twitter.com/mariedanielle",
        resumeUrl: "", // Optional
    };

    const existingProfile = await prisma.profile.findFirst();
    if (!existingProfile) {
        await prisma.profile.create({ data: profileData });
        console.log("✅ Profile seeded");
    } else {
        await prisma.profile.update({
            where: { id: existingProfile.id },
            data: profileData
        });
        console.log("✅ Profile updated");
    }

    // 3. Seed Skills
    // Data from lib/data.ts
    const skillsData = [
        // Frontend
        { name: "HTML5", level: 95, category: "frontend", icon: "SiHtml5", color: "#E34F26" },
        { name: "CSS3", level: 90, category: "frontend", icon: "SiCss3", color: "#1572B6" },
        { name: "JavaScript", level: 90, category: "frontend", icon: "SiJavascript", color: "#F7DF1E" },
        { name: "React.js", level: 90, category: "frontend", icon: "SiReact", color: "#61DAFB" },
        { name: "Next.js", level: 85, category: "frontend", icon: "SiNextdotjs", color: "#000000" },
        { name: "TypeScript", level: 80, category: "frontend", icon: "SiTypescript", color: "#3178C6" },
        // Backend
        { name: "Node.js", level: 85, category: "backend", icon: "SiNodedotjs", color: "#339933" },
        { name: "Express.js", level: 85, category: "backend", icon: "SiExpress", color: "#000000" },
        { name: "Django", level: 75, category: "backend", icon: "SiDjango", color: "#092E20" },
        { name: "FastAPI", level: 80, category: "backend", icon: "SiFastapi", color: "#009688" },
        { name: "Laravel", level: 70, category: "backend", icon: "SiLaravel", color: "#FF2D20" },
        // DevOps
        { name: "Docker", level: 85, category: "devops", icon: "SiDocker", color: "#2496ED" },
        { name: "Kubernetes", level: 75, category: "devops", icon: "SiKubernetes", color: "#326CE5" },
        { name: "GitHub Actions", level: 80, category: "devops", icon: "SiGithubactions", color: "#2088FF" },
        { name: "Terraform", level: 70, category: "devops", icon: "SiTerraform", color: "#7B42BC" },
        { name: "Ansible", level: 65, category: "devops", icon: "SiAnsible", color: "#EE0000" },
        // Database
        { name: "PostgreSQL", level: 85, category: "database", icon: "SiPostgresql", color: "#336791" },
        { name: "MySQL", level: 80, category: "database", icon: "SiMysql", color: "#4479A1" },
        { name: "MongoDB", level: 80, category: "database", icon: "SiMongodb", color: "#47A248" },
        { name: "Redis", level: 75, category: "database", icon: "SiRedis", color: "#DC382D" },
    ];


    // Check if skills exist to avoid duplicates if run multiple times without clean
    const verifySkill = await prisma.skill.findFirst();
    if (!verifySkill) {
        for (const skill of skillsData) {
            await prisma.skill.create({ data: skill });
        }
        console.log("✅ Skills seeded");
    } else {
        console.log("ℹ️ Skills already exist, skipping...");
    }

    // 4. Seed Experiences
    const experiencesData = [
        {
            role: "Développeuse Fullstack & DevOps",
            company: "Neurones Talents",
            // location removed as not in schema
            date: "Juin 2025 - Présent",
            description: "Conception et développement d'applications web fullstack.\nIntégration d'agents IA conversationnels.\nMise en place d'architectures microservices.\nDéveloppement API REST.",
            current: true,
        },
        {
            role: "Stagiaire Développeuse Frontend",
            company: "Leader World Perfect",
            date: "Août 2024 - Octobre 2024",
            description: "Développement d'interfaces utilisateur responsives.\nCollaboration avec équipes produit et design.",
            current: false,
        },
        {
            role: "Formation Ingénieur Développeur Fullstack & DevOps",
            company: "Neurones Academy",
            date: "2025",
            description: "Formation intensive en développement fullstack et pratiques DevOps.\nProjets pratiques avec React, Node.js, Docker, Kubernetes.",
            current: false,
        },
        {
            role: "Licence en Développeur d'application",
            company: "Agitel Formation",
            date: "2022 - 2025",
            description: "Formation complète en développement d'applications.\nBases solides en programmation et génie logiciel.",
            current: false,
        },
    ];

    const verifyExp = await prisma.experience.findFirst();
    if (!verifyExp) {
        for (const exp of experiencesData) {
            await prisma.experience.create({ data: exp });
        }
        console.log("✅ Experiences seeded");
    } else {
        console.log("ℹ️ Experiences already exist, skipping...");
    }


    // 5. Seed Projects
    const projectsData = [
        {
            title: "Application de Gestion de Blog",
            description: "API REST complète pour gestion de blog avec CRUD, authentification JWT et autorisation basée sur les rôles.",
            image: "/images/projects/blog-api.jpg",
            tags: JSON.stringify(["Node.js", "Express", "MongoDB", "JWT"]), // Changed to tags
            category: "backend",
            github: "https://github.com/mariedanielle/blog-api",
            link: "", // Changed demo to link
            featured: true,
        },
        {
            title: "Dashboard Analytics",
            description: "Tableau de bord interactif avec visualisations de données en temps réel et graphiques animés.",
            image: "/images/projects/dashboard.jpg",
            tags: JSON.stringify(["React", "Next.js", "Chart.js", "Tailwind"]),
            category: "fullstack",
            github: "https://github.com/mariedanielle/dashboard",
            link: "",
            featured: true,
        },
        {
            title: "Agent IA Conversationnel",
            description: "Chatbot intelligent utilisant CrewAI et RAG pour l'automatisation du support client.",
            image: "/images/projects/ai-agent.jpg",
            tags: JSON.stringify(["Python", "CrewAI", "LangChain", "FastAPI"]),
            category: "backend",
            github: "https://github.com/mariedanielle/ai-agent",
            link: "",
            featured: true,
        },
        {
            title: "Infrastructure Kubernetes",
            description: "Déploiement d'une architecture microservices sur Kubernetes avec CI/CD automatisé.",
            image: "/images/projects/k8s.jpg",
            tags: JSON.stringify(["Docker", "Kubernetes", "GitHub Actions", "Terraform"]),
            category: "devops",
            github: "https://github.com/mariedanielle/k8s-infra",
            link: "",
            featured: true,
        },
        {
            title: "E-commerce Platform",
            description: "Plateforme e-commerce complète avec panier, paiement et gestion des commandes.",
            image: "/images/projects/ecommerce.jpg",
            tags: JSON.stringify(["Next.js", "Node.js", "PostgreSQL", "Stripe"]),
            category: "fullstack",
            github: "https://github.com/mariedanielle/ecommerce",
            link: "",
            featured: false,
        },
        {
            title: "Portfolio Personnel",
            description: "Ce portfolio moderne et animé créé avec Next.js et Framer Motion.",
            image: "/images/projects/portfolio.jpg",
            tags: JSON.stringify(["Next.js", "TypeScript", "Tailwind", "Framer Motion"]),
            category: "frontend",
            github: "https://github.com/mariedanielle/portfolio",
            link: "",
            featured: false,
        },
    ];

    const verifyProject = await prisma.project.findFirst();
    if (!verifyProject) {
        for (const project of projectsData) {
            await prisma.project.create({ data: project });
        }
        console.log("✅ Projects seeded");
    } else {
        console.log("ℹ️ Projects already exist, skipping...");
    }

    console.log("🌱 Seeding completed.");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
