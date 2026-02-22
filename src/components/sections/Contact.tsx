"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Send, Mail, Phone, MapPin, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { personalInfo } from "@/lib/data";
import { sendContactEmail } from "@/app/actions";

interface ContactProps {
  profile?: {
    email: string | null;
    [key: string]: any;
  } | null;
}

export default function Contact({ profile }: ContactProps) {
  const t = useTranslations("contact");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("email", formState.email);
    formData.append("subject", formState.subject);
    formData.append("message", formState.message);

    try {
      const result = await sendContactEmail(formData);
      if (result.success) {
        setStatus("success");
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        console.error(result.error);
      }
    } catch (error) {
      setStatus("error");
      console.error(error);
    }

    // Reset status after 5 seconds
    setTimeout(() => setStatus("idle"), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Use dynamic data or fallback
  const email = profile?.email || personalInfo.email;
  const location = "Côte d'Ivoire"; // Or add location to profile model if needed

  const contactInfo = [
    { icon: MapPin, label: t("info.location"), value: location, href: "#" },
  ];

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)" }} />
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

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div variants={fadeInLeft} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-text mb-6">
                  {t("subtitle")}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {t("description")}
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface border transition-all duration-300 group"
                    style={{ borderColor: "var(--border)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.4)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                  >
                    <div className="p-3 rounded-lg transition-colors" style={{ background: "rgba(245,158,11,0.1)" }}>
                      <info.icon className="w-6 h-6" style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">{info.label}</p>
                      <p className="text-text font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links Visual */}
              <div className="p-6 rounded-2xl bg-primary/5 border border-border">
                <p className="text-text-muted mb-4">{t("social")}</p>
                <div className="flex gap-4">
                  {["GitHub", "LinkedIn", "Twitter"].map((social) => (
                    <motion.div
                      key={social}
                      whileHover={{ y: -5 }}
                      className="px-4 py-2 rounded-lg bg-surface text-sm font-medium text-text-muted hover:text-primary transition-colors cursor-pointer"
                    >
                      {social}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeInRight}>
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-surface border border-border">
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                      {t("form.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border outline-none transition-all duration-300 text-text"
                      style={{}}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.boxShadow = "0 0 0 2px var(--gold-dim)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.boxShadow = ""; }}
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                      {t("form.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border outline-none transition-all duration-300 text-text"
                      style={{}}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.boxShadow = "0 0 0 2px var(--gold-dim)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.boxShadow = ""; }}
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-text mb-2">
                      {t("form.subject")}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border outline-none transition-all duration-300 text-text"
                      style={{}}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.boxShadow = "0 0 0 2px var(--gold-dim)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.boxShadow = ""; }}
                      placeholder={t("form.subjectPlaceholder")}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                      {t("form.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-text resize-none"
                      placeholder={t("form.messagePlaceholder")}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70"
                    style={{
                      background: status === "success"
                        ? "linear-gradient(135deg, #10b981 0%, #34d399 100%)"
                        : status === "error"
                          ? "linear-gradient(135deg, #ef4444 0%, #f87171 100%)"
                          : "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)",
                      color: "#000",
                      boxShadow: "0 4px 20px var(--gold-glow)"
                    }}
                    whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                    whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t("form.sending")}
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        {t("form.success")}
                      </>
                    ) : status === "error" ? (
                      <>
                        <AlertCircle className="w-5 h-5" />
                        {t("form.error")}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t("form.send")}
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
