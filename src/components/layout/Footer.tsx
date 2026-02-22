"use client";

import { fadeInUp } from "@/lib/animations";
import { personalInfo } from "@/lib/data";
import { motion } from "framer-motion";
import { Github, Heart, Linkedin, Mail, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const socialLinks = [
  { name: "GitHub", icon: Github, url: personalInfo.github },
  { name: "LinkedIn", icon: Linkedin, url: personalInfo.linkedin },
];

export default function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="bg-surface border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <motion.a
              href="#home"
              className="text-3xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              MD
            </motion.a>
            <p className="mt-2 text-text-muted text-sm">
              {personalInfo.title}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-background hover:bg-primary/20 border border-border hover:border-primary transition-all duration-300"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-text-muted text-sm flex items-center justify-center md:justify-end gap-1">
              {t("madeWith")}  {t("by")}{" "}
              <span className="text-text font-medium">{personalInfo.name.split(" ")[0]}</span>
            </p>
            <p className="text-text-muted text-sm mt-1">
              &copy; {currentYear} {t("rights")}
            </p>
            <div className="mt-2">
              <Link href="/admin/login" className="text-xs text-text-muted hover:text-primary transition-colors">
                {t("login")}
              </Link>
            </div>
          </div>
        </div>

        {/* Gradient Line */}
        <div className="mt-8 h-1 w-full rounded-full bg-primary/30" />
      </div>
    </motion.footer>
  );
}
