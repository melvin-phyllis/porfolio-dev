"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Download, Award, Users, FolderCode, Cpu } from "lucide-react";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem } from "@/lib/animations";

const statIcons = [Award, FolderCode, Users, Cpu];

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const incrementTime = (duration * 1000) / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}+</span>;
}

interface AboutProps {
  profile?: {
    about: string;
    resumeUrl: string | null;
  } | null;
  stats: { value: number; label: string }[];
}

export default function About({ profile, stats }: AboutProps) {
  const t = useTranslations("about");

  const description = profile?.about || t("description");
  const resumeUrl = profile?.resumeUrl || "/cv-melvin-phyllis.pdf";

  return (
    <section id="about" className="section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-96 h-96 border border-primary/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-80 h-80 border border-primary/10 rounded-full"
        />
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
            <div className="w-24 h-1 mx-auto rounded-full animated-gradient" />
            <div className="mt-3 w-2 h-2 rounded-full mx-auto" style={{ background: "var(--gold)", boxShadow: "0 0 8px var(--gold-glow)" }} />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Description */}
            <motion.div variants={fadeInLeft} className="space-y-6">
              <p className="text-lg text-text-muted leading-relaxed">
                {description}
              </p>

              <div className="flex flex-wrap gap-3">
                {["React", "Next.js", "Node.js", "Docker", "Laravel"].map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-4 py-2 rounded-full bg-surface border border-border text-sm font-medium transition-all duration-300"
                    style={{ cursor: "default" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                      (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "";
                      (e.currentTarget as HTMLElement).style.color = "";
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              <motion.a
                href={resumeUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)",
                  color: "#000",
                  boxShadow: "0 4px 20px var(--gold-glow)"
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                {t("downloadCv")}
              </motion.a>
            </motion.div>

            {/* Right - Stats */}
            <motion.div
              variants={fadeInRight}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => {
                const Icon = statIcons[index];
                return (
                  <motion.div
                    key={stat.label}
                    variants={staggerItem}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="p-6 rounded-2xl bg-surface border transition-all duration-300"
                    style={{ borderColor: "#222222" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.4)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px var(--gold-glow)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#222222";
                      (e.currentTarget as HTMLElement).style.boxShadow = "";
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg" style={{ background: "rgba(245,158,11,0.1)" }}>
                        <Icon className="w-5 h-5" style={{ color: "var(--gold)" }} />
                      </div>
                    </div>
                    <div className="text-4xl font-bold mb-1" style={{ color: "var(--gold)" }}>
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <p className="text-text-muted text-sm">
                      {t(`stats.${stat.label}`)}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
