"use client";

import React, { useEffect } from "react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children?: React.ReactNode;
    actions?: React.ReactNode;
    closeOnOverlayClick?: boolean;
}

export default function Modal({
    open,
    onClose,
    title,
    children,
    actions,
    closeOnOverlayClick = true,
}: ModalProps) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (open) {
            document.addEventListener("keydown", onKey);
            // prevent background scroll
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.removeEventListener("keydown", onKey);
                document.body.style.overflow = prev;
            };
        }
        return () => { };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            aria-hidden={!open}
        >
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => closeOnOverlayClick && onClose()}
            />

            <div
                role="dialog"
                aria-modal="true"
                className="relative max-w-3xl w-full mx-4 bg-surface text-text rounded-lg shadow-lg p-6"
            >
                <div className="flex items-start justify-between gap-4">
                    {title ? (
                        <h3 className="text-xl font-semibold">{title}</h3>
                    ) : (
                        <div />
                    )}
                    <button
                        onClick={onClose}
                        aria-label="Close dialog"
                        className="ml-auto text-text-muted hover:text-text transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="mt-4">{children}</div>

                {actions ? (
                    <div className="mt-6 flex items-center justify-end gap-3">{actions}</div>
                ) : null}
            </div>
        </div>
    );
}
