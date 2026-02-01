"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Quote, ChevronLeft, ChevronRight, User } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  // Get testimonials from translations
  const testimonials = t.raw("items") as Testimonial[];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto">
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

          {/* Testimonial Carousel */}
          <motion.div variants={fadeInUp} className="relative">
            {/* Large Quote Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-10">
              <Quote className="w-24 h-24 text-primary" />
            </div>

            {/* Carousel Container */}
            <div className="relative h-[400px] flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center px-8">
                    {/* Avatar */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/30 bg-surface flex items-center justify-center"
                    >
                      {testimonials[current].image ? (
                        <ImageWithFallback
                          src={testimonials[current].image}
                          alt={testimonials[current].name}
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-text-muted" />
                      )}
                    </motion.div>

                    {/* Content */}
                    <blockquote className="text-xl md:text-2xl text-text italic mb-6 leading-relaxed">
                      &ldquo;{testimonials[current].content}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div>
                      <p className="text-lg font-semibold text-text">
                        {testimonials[current].name}
                      </p>
                      <p className="text-text-muted">
                        {testimonials[current].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                onClick={prev}
                className="p-3 rounded-full bg-surface border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setDirection(index > current ? 1 : -1);
                      setCurrent(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current
                      ? "w-8 bg-primary"
                      : "bg-surface-light hover:bg-primary/50"
                      }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={next}
                className="p-3 rounded-full bg-surface border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
