"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown, HelpCircle } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion({ item, index, isOpen, toggle }: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className="rounded-2xl bg-surface border border-border overflow-hidden hover:border-primary/30 transition-all duration-300"
    >
      <motion.button
        onClick={toggle}
        className="w-full p-6 flex items-center justify-between text-left"
        style={{ backgroundColor: "rgba(0,0,0,0)" }}
        whileHover={{ backgroundColor: "rgba(245,158,11,0.05)" }}
      >
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-medium text-text">{item.question}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-2"
        >
          <ChevronDown className="w-5 h-5 text-text-muted" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <div className="pl-14">
                <p className="text-text-muted leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = t.raw("items") as FAQItem[];

  return (
    <section id="faq" className="section relative overflow-hidden bg-surface/30">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto">
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

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <FAQAccordion
                key={index}
                item={item}
                index={index}
                isOpen={openIndex === index}
                toggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
