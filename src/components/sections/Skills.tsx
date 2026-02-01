"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiRedux,
  SiTailwindcss, SiGreensock, SiFramer, SiSass, SiStyledcomponents,
  SiNextdotjs, SiNodedotjs, SiExpress, SiDjango, SiFastapi, SiLaravel,
  SiDocker, SiKubernetes, SiGithubactions, SiTerraform, SiAnsible,
  SiPostgresql, SiMysql, SiMongodb, SiRedis, SiPython
} from "react-icons/si";
import { Code2 } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

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

function SkillLevelBar({ level }: { level: number }) {
  return (
    <div className="flex gap-1 mt-2" title={`Niveau: ${level}/5`}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`h-1 w-6 rounded-full transition-colors ${
            i < level ? "bg-primary" : "bg-surface-light"
          }`}
        />
      ))}
    </div>
  );
}

export default function Skills({ skills = [] }: SkillsProps) {
  const t = useTranslations("skills");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", ...new Set(skills.map(s => s.category).filter(Boolean))];

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const filteredSkills = activeCategory === "all"
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="section relative overflow-hidden">
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
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">{t("title")}</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
            <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-primary" />
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-background"
                    : "bg-surface border border-border text-text-muted hover:border-primary"
                }`}
              >
                {category === "all"
                  ? t("all")
                  : t(`categories.${category.toLowerCase()}`) || category}
              </button>
            ))}
          </motion.div>

          {/* Skills Grid with Levels */}
          {activeCategory === "all" ? (
            <motion.div
              key={`all-${activeCategory}`}
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-12"
            >
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <motion.div key={category} variants={fadeInUp}>
                  <h3 className="text-xl font-semibold mb-6 text-text-muted capitalize">
                    {t(`categories.${category.toLowerCase()}`) || category}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {categorySkills.map((tech) => {
                      const IconComponent = (tech.icon && iconMapping[tech.icon])
                        ? iconMapping[tech.icon]
                        : iconMapping["default"];
                      const techColor = tech.color || "#ffffff";

                      return (
                        <motion.div
                          key={tech.id}
                          variants={staggerItem}
                          whileHover={{ scale: 1.05, y: -4 }}
                          className="p-4 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 group"
                        >
                          <div className="flex flex-col items-center text-center">
                            <div
                              className="p-3 rounded-xl bg-surface-light mb-3 relative overflow-hidden"
                            >
                              <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                style={{ backgroundColor: techColor }}
                              />
                              <IconComponent
                                className="w-8 h-8 transition-colors duration-300"
                                style={{ color: techColor }}
                              />
                            </div>
                            <span className="font-medium text-text group-hover:text-primary transition-colors">
                              {tech.name}
                            </span>
                            <SkillLevelBar level={tech.level} />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`filtered-${activeCategory}`}
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              {filteredSkills.map((tech) => {
                const IconComponent = (tech.icon && iconMapping[tech.icon])
                  ? iconMapping[tech.icon]
                  : iconMapping["default"];
                const techColor = tech.color || "#ffffff";

                return (
                  <motion.div
                    key={tech.id}
                    variants={staggerItem}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="p-4 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 group"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 rounded-xl bg-surface-light mb-3 relative overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                          style={{ backgroundColor: techColor }}
                        />
                        <IconComponent
                          className="w-8 h-8 transition-colors duration-300"
                          style={{ color: techColor }}
                        />
                      </div>
                      <span className="font-medium text-text group-hover:text-primary transition-colors">
                        {tech.name}
                      </span>
                      <SkillLevelBar level={tech.level} />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {skills.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              {t("noSkills")}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
