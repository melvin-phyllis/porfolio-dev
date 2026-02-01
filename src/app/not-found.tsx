"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-gray-900">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-500/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-purple-500/20 rounded-full blur-[80px]"
                />

                {/* Floating Shapes */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 100 }}
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            y: [-20, 20, -20],
                            x: [0, 10, 0],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 6 + i * 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut",
                        }}
                        className="absolute"
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + (i % 3) * 25}%`,
                        }}
                    >
                        <div
                            className={`
                                ${i % 3 === 0 ? "w-4 h-4 rounded-full" : i % 3 === 1 ? "w-6 h-6 rounded-lg rotate-45" : "w-3 h-3 rounded"}
                                ${i % 2 === 0 ? "bg-brand-500/30" : "bg-purple-500/30"}
                            `}
                        />
                    </motion.div>
                ))}

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#465fff 1px, transparent 1px), linear-gradient(90deg, #465fff 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
                {/* 404 Number with Glitch Effect */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="relative mb-8"
                >
                    {/* Shadow layers for depth */}
                    <span className="absolute inset-0 text-[150px] sm:text-[200px] font-black text-brand-500/10 select-none blur-sm">
                        404
                    </span>
                    <span className="absolute inset-0 text-[150px] sm:text-[200px] font-black text-purple-500/10 select-none translate-x-2 translate-y-2">
                        404
                    </span>
                    
                    {/* Main number */}
                    <motion.h1
                        animate={{
                            textShadow: [
                                "0 0 0px transparent",
                                "2px 2px 0px rgba(70, 95, 255, 0.3), -2px -2px 0px rgba(139, 92, 246, 0.3)",
                                "0 0 0px transparent",
                            ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-[150px] sm:text-[200px] font-black leading-none bg-linear-to-br from-brand-500 via-purple-500 to-brand-600 bg-clip-text text-transparent"
                    >
                        404
                    </motion.h1>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="space-y-4 mb-10"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                        Oups ! Page introuvable
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
                        La page que vous recherchez semble avoir disparu dans le cyberespace. 
                        Elle a peut-être été déplacée ou n&apos;existe plus.
                    </p>
                </motion.div>

                {/* Search suggestion */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm">
                        <Search className="h-4 w-4" />
                        <span>Vérifiez l&apos;URL ou utilisez la navigation</span>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 text-white font-medium hover:bg-brand-600 transition-all duration-200 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-105"
                    >
                        <Home className="h-5 w-5 transition-transform group-hover:scale-110" />
                        Retour à l&apos;accueil
                    </Link>
                    
                    <button
                        onClick={() => window.history.back()}
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium border border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-500/50 transition-all duration-200 hover:scale-105"
                    >
                        <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                        Page précédente
                    </button>
                </motion.div>

                {/* Fun Element - Animated Robot/Ghost */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-16"
                >
                    <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-block"
                    >
                        <div className="text-6xl">👻</div>
                    </motion.div>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                        Cette page s&apos;est volatilisée...
                    </p>
                </motion.div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-brand-500/20 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-purple-500/20 rounded-br-3xl" />
        </div>
    );
}
