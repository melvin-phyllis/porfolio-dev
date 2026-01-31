"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface SplitTextProps {
    text: string;
    className?: string;
}

export default function SplitText({ text, className = "" }: SplitTextProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Split text into individual characters
    const characters = text.split("");

    if (!isMounted) {
        return <span className={className}>{text}</span>;
    }

    return (
        <motion.span
            className={`inline-flex cursor-pointer ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                // Override gradient-text styles to make text visible
                WebkitTextFillColor: "inherit",
                backgroundClip: "unset",
                WebkitBackgroundClip: "unset",
                background: "none",
            }}
        >
            {characters.map((char, index) => {
                // Determine if this character goes up or down
                // Even index = up, Odd index = down
                const goesUp = index % 2 === 0;

                return (
                    <motion.span
                        key={index}
                        className="inline-block text-white"
                        animate={{
                            y: isHovered ? (goesUp ? -8 : 8) : 0,
                            rotate: isHovered ? (goesUp ? -5 : 5) : 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                            delay: index * 0.02,
                        }}
                        style={{
                            display: char === " " ? "inline" : "inline-block",
                            whiteSpace: char === " " ? "pre" : "normal",
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                );
            })}
        </motion.span>
    );
}
