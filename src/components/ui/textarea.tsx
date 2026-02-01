import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[100px] w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs transition-colors",
                    "placeholder:text-gray-400",
                    "focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-500/10",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "dark:border-gray-800 dark:bg-white/3 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800",
                    "resize-y",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }
