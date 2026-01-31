"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        // Add hover effect to interactive elements
        const addHoverListeners = () => {
            const interactiveElements = document.querySelectorAll(
                'a, button, [role="button"], input, textarea, select, .cursor-hover'
            );

            interactiveElements.forEach((el) => {
                el.addEventListener("mouseenter", () => setIsHovering(true));
                el.addEventListener("mouseleave", () => setIsHovering(false));
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseleave", handleMouseLeave);
        document.body.addEventListener("mouseenter", handleMouseEnter);

        // Initial setup and on DOM changes
        addHoverListeners();

        // Re-add listeners when DOM changes (for dynamic content)
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            observer.disconnect();
        };
    }, []);

    // Don't render on touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) {
        return null;
    }

    return (
        <>
            {/* Main cursor circle */}
            <motion.div
                ref={cursorRef}
                className="fixed pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: mousePosition.x - (isHovering ? 40 : 25),
                    y: mousePosition.y - (isHovering ? 40 : 25),
                    width: isHovering ? 80 : 50,
                    height: isHovering ? 80 : 50,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
                style={{
                    borderRadius: "50%",
                    border: "2px solid white",
                    backgroundColor: "transparent",
                }}
            />

            {/* Center dot */}
            <motion.div
                className="fixed pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    opacity: isVisible ? 1 : 0,
                    scale: isHovering ? 0 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 1000,
                    damping: 35,
                }}
                style={{
                    width: 8,
                    height: 8,
                }}
            />

            {/* Global styles to hide default cursor */}
            <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        a:hover, button:hover, [role="button"]:hover, .cursor-hover:hover {
          color: #f97316 !important;
        }
        
        a:hover *, button:hover *, .cursor-hover:hover * {
          color: inherit !important;
        }
      `}</style>
        </>
    );
}
