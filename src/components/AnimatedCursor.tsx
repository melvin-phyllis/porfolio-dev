"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorConfig {
    innerSize?: number;
    outerSize?: number;
    color?: string;
    outerAlpha?: number;
    innerScale?: number;
    outerScale?: number;
    trailingSpeed?: number;
    blendMode?: boolean;
}

interface AnimatedCursorProps extends CursorConfig {
    clickables?: string[];
}

const defaultClickables = [
    "a",
    'input[type="text"]',
    'input[type="email"]',
    'input[type="number"]',
    'input[type="submit"]',
    'input[type="image"]',
    "label[for]",
    "select",
    "textarea",
    "button",
    ".link",
    "[role='button']",
    "[data-cursor='pointer']",
];

export default function AnimatedCursor({
    innerSize = 8,
    outerSize = 35,
    color = "255, 255, 255",
    outerAlpha = 0.4,
    innerScale = 0.7,
    outerScale = 1.8,
    trailingSpeed = 8,
    blendMode = true,
    clickables = defaultClickables,
}: AnimatedCursorProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isActiveClickable, setIsActiveClickable] = useState(false);
    const [isOverText, setIsOverText] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    // Motion values pour le curseur
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring pour l'effet de traînée du cercle extérieur
    const springConfig = { damping: 25, stiffness: 700 };
    const outerX = useSpring(cursorX, { ...springConfig, damping: 30 - trailingSpeed });
    const outerY = useSpring(cursorY, { ...springConfig, damping: 30 - trailingSpeed });

    // Détecter si on est sur mobile
    useEffect(() => {
        const checkMobile = () => {
            const isTouchDevice =
                "ontouchstart" in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia("(pointer: coarse)").matches;
            setIsMobile(isTouchDevice);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Vérifier si un élément contient du texte visible
    const isTextElement = useCallback((element: Element): boolean => {
        const textTags = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "A", "LI", "TD", "TH", "LABEL", "STRONG", "EM", "B", "I", "U", "SMALL", "BLOCKQUOTE", "CODE", "PRE"];
        
        if (textTags.includes(element.tagName)) {
            return true;
        }

        // Vérifier si l'élément a du texte directement
        const hasDirectText = Array.from(element.childNodes).some(
            (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
        );

        return hasDirectText;
    }, []);

    // Gérer le mouvement de la souris
    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);

            // Détecter si on survole du texte
            const target = e.target as Element;
            if (target) {
                const overText = isTextElement(target) || !!target.closest("p, h1, h2, h3, h4, h5, h6, span, a, li, td, th, label, strong, em, b, i, blockquote, code, pre");
                setIsOverText(overText);
            }
        },
        [cursorX, cursorY, isTextElement]
    );

    // Gérer le clic
    const onMouseDown = useCallback(() => setIsActive(true), []);
    const onMouseUp = useCallback(() => setIsActive(false), []);

    // Gérer l'entrée/sortie de la fenêtre
    const onMouseEnter = useCallback(() => setIsVisible(true), []);
    const onMouseLeave = useCallback(() => {
        setIsVisible(false);
        setIsOverText(false);
    }, []);

    // Gérer le hover sur les éléments cliquables
    useEffect(() => {
        if (isMobile) return;

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as Element;
            if (clickables.some((selector) => target.closest(selector))) {
                setIsActiveClickable(true);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as Element;
            if (clickables.some((selector) => target.closest(selector))) {
                setIsActiveClickable(false);
            }
        };

        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, [clickables, isMobile]);

    // Event listeners principaux
    useEffect(() => {
        if (isMobile) return;

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mouseenter", onMouseEnter);
        document.addEventListener("mouseleave", onMouseLeave);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mouseenter", onMouseEnter);
            document.removeEventListener("mouseleave", onMouseLeave);
        };
    }, [onMouseMove, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave, isMobile]);

    // Cacher le curseur natif via CSS
    useEffect(() => {
        if (isMobile) return;

        const style = document.createElement("style");
        style.id = "animated-cursor-style";
        style.textContent = `
            * {
                cursor: none !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            const existingStyle = document.getElementById("animated-cursor-style");
            if (existingStyle) {
                existingStyle.remove();
            }
        };
    }, [isMobile]);

    // Ne pas afficher sur mobile
    if (isMobile) return null;

    const innerSizeActive = isActive 
        ? innerSize * innerScale 
        : isActiveClickable 
            ? innerSize * 1.5 
            : isOverText 
                ? innerSize * 2.5 
                : innerSize;

    const outerSizeActive = isActive 
        ? outerSize * outerScale 
        : isActiveClickable 
            ? outerSize * outerScale 
            : isOverText 
                ? outerSize * 1.5 
                : outerSize;

    return (
        <>
            {/* Curseur intérieur (point) avec mix-blend-mode */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-9999"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    mixBlendMode: blendMode && isOverText ? "difference" : "normal",
                }}
                animate={{
                    width: innerSizeActive,
                    height: innerSizeActive,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                }}
            >
                <div
                    className="w-full h-full rounded-full"
                    style={{
                        backgroundColor: `rgb(${color})`,
                    }}
                />
            </motion.div>

            {/* Curseur extérieur (cercle) avec mix-blend-mode */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-9998"
                style={{
                    x: outerX,
                    y: outerY,
                    translateX: "-50%",
                    translateY: "-50%",
                    mixBlendMode: blendMode && isOverText ? "difference" : "normal",
                }}
                animate={{
                    width: outerSizeActive,
                    height: outerSizeActive,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 20,
                }}
            >
                <div
                    className="w-full h-full rounded-full border-2 transition-all duration-200"
                    style={{
                        borderColor: `rgba(${color}, ${isActiveClickable || isOverText ? 0.8 : outerAlpha})`,
                        backgroundColor: isOverText 
                            ? `rgba(${color}, 0.15)` 
                            : isActiveClickable 
                                ? `rgba(${color}, 0.1)` 
                                : "transparent",
                    }}
                />
            </motion.div>
        </>
    );
}
