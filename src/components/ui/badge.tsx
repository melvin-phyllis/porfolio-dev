import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                // Default - Gray
                default: "border-transparent bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300",
                
                // Brand - Blue
                brand: "border-transparent bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
                
                // Success - Green
                success: "border-transparent bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
                
                // Danger - Red
                destructive: "border-transparent bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400",
                
                // Warning - Orange
                warning: "border-transparent bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400",
                
                // Info - Cyan
                info: "border-transparent bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-400",
                
                // Secondary - Neutral Gray
                secondary: "border-transparent bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
                
                // Outline variants
                outline: "border-gray-200 bg-transparent text-gray-700 dark:border-gray-700 dark:text-gray-300",
                "outline-brand": "border-brand-200 bg-transparent text-brand-600 dark:border-brand-700 dark:text-brand-400",
                "outline-success": "border-success-200 bg-transparent text-success-600 dark:border-success-700 dark:text-success-500",
                "outline-danger": "border-error-200 bg-transparent text-error-600 dark:border-error-700 dark:text-error-400",
                "outline-warning": "border-warning-200 bg-transparent text-warning-600 dark:border-warning-700 dark:text-orange-400",
                
                // Dot variants (avec indicateur)
                "dot-success": "border-transparent bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500 gap-1.5",
                "dot-warning": "border-transparent bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400 gap-1.5",
                "dot-danger": "border-transparent bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400 gap-1.5",
                "dot-info": "border-transparent bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-400 gap-1.5",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
