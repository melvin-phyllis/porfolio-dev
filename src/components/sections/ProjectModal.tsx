"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, FolderCode, Calendar, Tag } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { useTranslations } from "next-intl";
import { trackProjectGithubClick, trackProjectDemoClick, trackProjectClick } from "@/lib/analytics";
import { useEffect } from "react";

interface ProjectModalProps {
    project: any | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const t = useTranslations("projects");

    // Fermer avec la touche Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!project) return null;

    const technologies = Array.isArray(project.technologies)
        ? project.technologies
        : typeof project.technologies === "string"
            ? project.technologies.split(",")
            : [];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {/* Overlay sombre */}
                    <motion.div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Contenu de la modale */}
                    <motion.div
                        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border"
                        style={{
                            background: "var(--surface)",
                            borderColor: "rgba(245,158,11,0.2)",
                            boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(245,158,11,0.1)",
                        }}
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {/* Bouton Fermer */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors"
                            style={{ background: "rgba(0,0,0,0.5)" }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.3)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.5)";
                            }}
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>

                        {/* Image du projet */}
                        <div className="relative w-full h-64 sm:h-80 overflow-hidden rounded-t-2xl">
                            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                <FolderCode className="w-20 h-20 text-primary/30" />
                            </div>
                            {project.image && (
                                <ImageWithFallback
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 740px"
                                />
                            )}
                            {/* Dégradé en bas de l'image */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-24"
                                style={{
                                    background: "linear-gradient(to top, var(--surface), rgba(0,0,0,0))",
                                }}
                            />
                        </div>

                        {/* Corps */}
                        <div className="p-6 sm:p-8 -mt-8 relative">
                            {/* En-tête : catégorie + featured */}
                            <div className="flex items-center gap-3 mb-4">
                                <span
                                    className="inline-block px-3 py-1 text-xs font-semibold rounded-full capitalize"
                                    style={{ background: "rgba(245,158,11,0.1)", color: "var(--gold)" }}
                                >
                                    <Tag className="w-3 h-3 inline mr-1" />
                                    {project.category}
                                </span>
                                {project.featured && (
                                    <span
                                        className="inline-block px-3 py-1 text-xs font-bold rounded-full"
                                        style={{
                                            background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)",
                                            color: "#000",
                                        }}
                                    >
                                        ⭐ Featured
                                    </span>
                                )}
                            </div>

                            {/* Titre */}
                            <h3
                                className="text-2xl sm:text-3xl font-bold mb-4"
                                style={{ color: "var(--text)" }}
                            >
                                {project.title}
                            </h3>

                            {/* Description complète */}
                            <p
                                className="text-base leading-relaxed mb-6"
                                style={{ color: "var(--text-muted)" }}
                            >
                                {project.description}
                            </p>

                            {/* Technologies */}
                            <div className="mb-6">
                                <h4
                                    className="text-sm font-semibold mb-3 uppercase tracking-wider"
                                    style={{ color: "var(--gold)" }}
                                >
                                    Technologies utilisées
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {technologies.map((tech: string) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 text-sm rounded-lg font-medium"
                                            style={{
                                                background: "rgba(245,158,11,0.08)",
                                                color: "var(--gold-light)",
                                                border: "1px solid rgba(245,158,11,0.15)",
                                            }}
                                        >
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Séparateur */}
                            <div
                                className="w-full h-px mb-6"
                                style={{ background: "rgba(245,158,11,0.15)" }}
                            />

                            {/* Boutons d'action */}
                            <div className="flex flex-wrap gap-4">
                                {project.github && (
                                    <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() =>
                                            trackProjectGithubClick(project.id, project.title, project.github)
                                        }
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                                        style={{
                                            background: "rgba(0,0,0,0)",
                                            border: "1px solid rgba(245,158,11,0.4)",
                                            color: "var(--gold-light)",
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2,
                                            background: "rgba(245,158,11,0.08)",
                                            borderColor: "rgba(245,158,11,0.7)",
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Github className="w-5 h-5" />
                                        {t("viewCode")}
                                    </motion.a>
                                )}
                                {project.link && (
                                    <motion.a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() =>
                                            trackProjectDemoClick(project.id, project.title, project.link)
                                        }
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)",
                                            color: "#000",
                                            boxShadow: "0 4px 20px var(--gold-glow)",
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2,
                                            boxShadow: "0 8px 30px var(--gold-glow)",
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                        {t("viewProject")}
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
