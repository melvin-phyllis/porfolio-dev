"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { trackCVDownload } from "@/lib/analytics";
import { ArrowDown, Send, Sparkles } from "lucide-react";
import Image from "next/image";
import { fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import SplitText from "@/components/SplitText";

interface HeroProps {
  profile?: {
    headline: string;
    subheadline: string | null;
    about: string;
    resumeUrl: string | null;
    image?: string | null;
  } | null;
}

export default function Hero({ profile }: HeroProps) {
  const t = useTranslations("hero");
  const [currentRole, setCurrentRole] = useState(0);
  const roles = t.raw("roles") as string[];

  const displayName = t("name");
  const headline = profile?.subheadline || t("title");
  const subheadline = t("subtitle");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gold Gradient Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.3) 0%, rgba(245,158,11,0.05) 70%)" }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.2) 0%, rgba(251,191,36,0.03) 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(217,119,6,0.25) 0%, transparent 70%)" }}
        />

        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(245,158,11,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={fadeInLeft} className="text-center lg:text-left">
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border text-sm font-medium"
              style={{
                background: "rgba(245,158,11,0.08)",
                borderColor: "rgba(245,158,11,0.3)",
                color: "var(--gold-light)"
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Disponible pour un stage
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            >
              <SplitText text={displayName} />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="h-16 mb-6 flex items-center justify-center lg:justify-start gap-2"
            >
              <motion.h2
                key={currentRole}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold"
                style={{ color: "var(--gold-light)" }}
              >
                {roles[currentRole]}
              </motion.h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg text-text-muted mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {headline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="/cv-melvin-phyllis.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCVDownload()}
                className="px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)",
                  color: "#000",
                  boxShadow: "0 4px 20px var(--gold-glow)"
                }}
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 8px 30px var(--gold-glow)" }}
                whileTap={{ scale: 0.95 }}
              >
                {t("cta.projects")}
                <ArrowDown className="w-5 h-5" />
              </motion.a>

              <motion.button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  background: "rgba(0,0,0,0)",
                  border: "1px solid rgba(245,158,11,0.4)",
                  color: "var(--gold-light)"
                }}
                whileHover={{
                  scale: 1.05, y: -2,
                  background: "rgba(245,158,11,0.08)",
                  borderColor: "rgba(245,158,11,0.7)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {t("cta.contact")}
                <Send className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-8 mt-10 justify-center lg:justify-start"
            >
              {[
                { value: "3+", label: "Projets réalisés" },
                { value: "22", label: "Technologies" },
                { value: "100%", label: "Passion & rigueur" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold" style={{ color: "var(--gold)" }}>{stat.value}</div>
                  <div className="text-xs text-text-muted mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            variants={fadeInRight}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border border-dashed"
                style={{ borderColor: "rgba(245,158,11,0.25)" }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 rounded-full border border-dashed"
                style={{ borderColor: "rgba(245,158,11,0.1)" }}
              />

              {/* Glowing Background */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-2xl"
                style={{ background: "radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)" }}
              />

              {/* Profile Image Container */}
              <motion.div
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden"
                style={{ border: "2px solid rgba(245,158,11,0.4)" }}
                whileHover={{ scale: 1.04 }}
              >
                <Image
                  src={profile?.image || "/images/profile.svg"}
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 p-3 rounded-xl glass"
              >
                <span className="text-2xl">💻</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 p-3 rounded-xl glass"
              >
                <span className="text-2xl">⚙️</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute top-1/2 -right-8 p-3 rounded-xl glass"
              >
                <span className="text-2xl">🚀</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            <span className="text-text-muted text-sm">{t("scroll")}</span>
            <ArrowDown className="w-5 h-5" style={{ color: "var(--gold)" }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
