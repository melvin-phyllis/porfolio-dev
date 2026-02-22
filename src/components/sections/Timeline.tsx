"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// Animation variants for sequential appearance
const timelineItemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.3,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const // easeOut as bezier curve
    }
  })
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: index * 0.3,
      duration: 0.4,
      type: "spring" as const,
      stiffness: 200
    }
  })
};

interface Experience {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string;
  current: boolean;
  // adding type field for compatibility with existing code or hardcoding it for now
  type?: string;
  location?: string;
}

interface TimelineProps {
  experiences?: Experience[];
}

export default function Timeline({ experiences = [] }: TimelineProps) {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="section relative overflow-hidden bg-surface/30">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-linear-to-b from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
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

          {/* Timeline */}
          <div className="relative">
            {/* Center Line - Gold Animated */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 origin-top"
              style={{ background: "linear-gradient(to bottom, transparent, var(--gold), var(--gold-light), var(--gold), transparent)" }}
            />

            {experiences && experiences.length > 0 ? experiences.map((exp, index) => {
              // Parse description if it's not array (DB stores string normally, usually newline separated or JSON)
              // Assuming DB stores plain text, we split by newline for list items
              const descriptionItems = exp.description.split('\n');
              const type = "work"; // Defaulting to work as DB schema is mainly work exp

              return (
                <motion.div
                  key={exp.id}
                  custom={index}
                  variants={timelineItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-50px" }}
                  className={`relative flex items-start gap-6 mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                    } flex-row`}
                >
                  {/* Timeline Dot - Animated */}
                  <motion.div
                    custom={index}
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    whileHover={{ scale: 1.3 }}
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background z-10"
                    style={{
                      background: "var(--gold)",
                      boxShadow: "0 0 12px var(--gold-glow), 0 0 24px rgba(245,158,11,0.1)"
                    }}
                  />

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] p-6 rounded-2xl bg-surface/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 ${index % 2 === 0 ? "md:mr-auto md:text-right" : "md:ml-auto"
                      }`}
                  >
                    {/* Type Badge */}
                    <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? "md:justify-end" : "justify-start"
                      }`}>
                      <motion.div
                        initial={{ rotate: -180, opacity: 0 }}
                        whileInView={{ rotate: 0, opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: index * 0.3 + 0.2, duration: 0.5 }}
                        className="p-2 rounded-lg"
                        style={{ background: "rgba(245,158,11,0.15)" }}
                      >
                        {type === "work" ? (
                          <Briefcase className="w-4 h-4" style={{ color: "var(--gold)" }} />
                        ) : (
                          <GraduationCap className="w-4 h-4" style={{ color: "var(--gold)" }} />
                        )}
                      </motion.div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: "rgba(245,158,11,0.12)", color: "var(--gold)" }}>
                        {type === "work" ? t("work") : t("education")}
                      </span>
                    </div>

                    {/* Title & Company */}
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <p className="font-semibold mb-2" style={{ color: "var(--gold)" }}>{exp.company}</p>

                    {/* Meta Info */}
                    <div className={`flex flex-wrap gap-3 mb-4 text-sm text-text-muted ${index % 2 === 0 ? "md:justify-end" : "justify-start"
                      }`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" style={{ color: "var(--gold)" }} />
                        {exp.date}
                      </span>
                      {/* Location not in DB standard schema yet, omitted or default */}
                    </div>

                    {/* Description */}
                    <ul className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                      {descriptionItems.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false }}
                          transition={{ delay: index * 0.3 + 0.3 + i * 0.1, duration: 0.4 }}
                          className="text-sm flex items-start gap-2"
                        >
                          <span className={`mt-1 ${index % 2 === 0 ? "md:order-last" : ""}`} style={{ color: "var(--gold)" }}>
                            ●
                          </span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              )
            }) : (
              <div className="text-center py-10 text-muted-foreground">{t("noExperience")}</div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
