"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { ExternalLink, Github, FolderCode } from "lucide-react";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";

import { Project } from "@prisma/client";

interface ProjectsProps {
  projects?: any[]; // Prisma type or simplified
}

export default function Projects({ projects = [] }: ProjectsProps) {
  const t = useTranslations("projects");
  const [activeFilter, setActiveFilter] = useState("all");

  // Dynamically generate filters from projects + standard ones
  // For now keep standard filters but ensure logic works
  // Or just use the hardcoded list if categories are predictable
  const filters = ["all", "frontend", "backend", "fullstack", "devops"];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Transform technologies if stored as string (JSON or comma separated)
  // Assuming in this simplified version we handle what comes from DB
  // If DB stores JSON string, we should parse it. But let's assume `technologies` is passed as array or we split it.

  const displayProjects = filteredProjects.map(p => ({
    ...p,
    technologies: Array.isArray(p.technologies) ? p.technologies : (typeof p.technologies === 'string' ? p.technologies.split(',') : [])
  }));

  return (
    <section id="projects" className="section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
        >
          {/* Section Title */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">{t("title")}</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
            <div className="w-24 h-1 mx-auto mt-4 rounded-full animated-gradient" />
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-xl font-medium capitalize transition-all duration-300 ${activeFilter === filter
                  ? "bg-primary text-background"
                  : "bg-surface border border-border text-text-muted hover:border-primary hover:text-primary"
                  }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {t(`filters.${filter}`)}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {displayProjects.length > 0 ? displayProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="group relative rounded-2xl overflow-hidden bg-surface border border-border hover:border-primary/50 transition-all duration-500"
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden bg-background-light">
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <FolderCode className="w-16 h-16 text-primary/50" />
                    </div>
                    {project.image && (
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-primary/10 text-primary capitalize">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-text-muted text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-md bg-background text-text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background hover:bg-primary/10 text-text-muted hover:text-primary transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-4 h-4" />
                          <span className="text-sm">{t("viewCode")}</span>
                        </motion.a>
                      )}
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm">{t("viewProject")}</span>
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-primary/5" />
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-full text-center text-muted-foreground py-10">Aucun projet trouvé.</div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
