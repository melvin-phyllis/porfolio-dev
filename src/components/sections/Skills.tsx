"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiRedux,
  SiTailwindcss, SiGreensock, SiFramer, SiSass, SiStyledcomponents,
  SiNextdotjs, SiNodedotjs, SiExpress, SiDjango, SiFastapi, SiLaravel,
  SiDocker, SiKubernetes, SiGithubactions, SiTerraform, SiAnsible,
  SiPostgresql, SiMysql, SiMongodb, SiRedis, SiPython
} from "react-icons/si";
import { Code2 } from "lucide-react"; // Fallback icon
import { fadeInUp, staggerContainer } from "@/lib/animations";

// Mapping des noms d'icônes stockés en BDD vers les composants React Icons
const iconMapping: Record<string, any> = {
  "SiHtml5": SiHtml5, "SiCss3": SiCss3, "SiJavascript": SiJavascript,
  "SiTypescript": SiTypescript, "SiReact": SiReact, "SiRedux": SiRedux,
  "SiTailwindcss": SiTailwindcss, "SiGreensock": SiGreensock, "SiFramer": SiFramer,
  "SiSass": SiSass, "SiStyledcomponents": SiStyledcomponents, "SiNextdotjs": SiNextdotjs,
  "SiNodedotjs": SiNodedotjs, "SiExpress": SiExpress, "SiDjango": SiDjango,
  "SiFastapi": SiFastapi, "SiLaravel": SiLaravel, "SiDocker": SiDocker,
  "SiKubernetes": SiKubernetes, "SiGithubactions": SiGithubactions, "SiTerraform": SiTerraform,
  "SiAnsible": SiAnsible, "SiPostgresql": SiPostgresql, "SiMysql": SiMysql,
  "SiMongodb": SiMongodb, "SiRedis": SiRedis, "SiPython": SiPython,
  "default": Code2
};

interface Skill {
  id: string;
  name: string;
  level: number;
  icon: string | null;
  color?: string | null;
  category: string;
}

interface SkillsProps {
  skills?: Skill[];
}

export default function Skills({ skills = [] }: SkillsProps) {
  const t = useTranslations("skills");

  // Si pas de skills en DB, utiliser fallback ou liste vide (ici gestion vide)
  // On pourrait remettre la liste statique en fallback si displayList est vide.

  return (
    <section id="skills" className="section relative overflow-hidden">
      {/* Background decoration - simplifié */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
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
            <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-primary" />
          </motion.div>

          {/* Tech Icons Grid - Style Image Utilisateur */}
          <motion.div
            variants={fadeInUp}
            className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-8 max-w-5xl mx-auto"
          >
            {skills && skills.length > 0 ? skills.map((tech, index) => {
              // Resolve Icon
              const IconComponent = (tech.icon && iconMapping[tech.icon]) ? iconMapping[tech.icon] : iconMapping["default"];
              const techColor = tech.color || "#ffffff";

              return (
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div
                    className="p-3 rounded-xl bg-surface-light border border-border group-hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Background Glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ backgroundColor: techColor }}
                    />
                    <IconComponent className="w-8 h-8 transition-colors duration-300" style={{ color: techColor }} />
                  </div>
                  <span className="text-lg font-medium text-text-muted group-hover:text-white transition-colors duration-300">
                    {tech.name}
                  </span>
                </motion.div>
              )
            }) : (
              <div className="text-center text-muted-foreground">Aucune compétence configurée.</div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
