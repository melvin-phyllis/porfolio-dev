"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { services } from "@/lib/data";

export default function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="section relative overflow-hidden bg-surface/30">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
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

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.titleKey}
                  variants={staggerItem}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative p-8 rounded-2xl bg-background border border-border hover:border-primary transition-all duration-500 overflow-hidden"
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
                    >
                      <Icon className="w-8 h-8 text-primary" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-all duration-300">
                      {t(`items.${service.titleKey}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-text-muted text-sm mb-6 leading-relaxed">
                      {t(`items.${service.titleKey}.description`)}
                    </p>

                    {/* Link */}
                    <motion.a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-primary/10 opacity-50 group-hover:scale-150 transition-transform duration-500" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
