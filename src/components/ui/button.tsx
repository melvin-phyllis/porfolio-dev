import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                // Primary - Brand Blue (Actions principales)
                default: "bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-500/20 shadow-theme-xs",
                
                // Success - Green (Validation, Confirmation, Enregistrer)
                success: "bg-success-500 text-white hover:bg-success-600 focus-visible:ring-success-500/20 shadow-theme-xs",
                
                // Danger - Red (Suppression, Actions destructives)
                destructive: "bg-error-500 text-white hover:bg-error-600 focus-visible:ring-error-500/20 shadow-theme-xs",
                
                // Warning - Orange (Attention, Mise en garde)
                warning: "bg-warning-500 text-white hover:bg-warning-600 focus-visible:ring-warning-500/20 shadow-theme-xs",
                
                // Info - Cyan (Informations)
                info: "bg-blue-light-500 text-white hover:bg-blue-light-600 focus-visible:ring-blue-light-500/20 shadow-theme-xs",
                
                // Secondary - Gray (Actions secondaires)
                secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 focus-visible:ring-gray-500/20",
                
                // Outline - Border (Annuler, Actions neutres)
                outline: "border border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-white/[0.03] text-gray-700 dark:text-gray-300 focus-visible:ring-gray-500/20",
                
                // Outline variants avec couleurs
                "outline-success": "border border-success-300 dark:border-success-700 bg-white dark:bg-transparent hover:bg-success-50 dark:hover:bg-success-500/10 text-success-600 dark:text-success-400 focus-visible:ring-success-500/20",
                "outline-danger": "border border-error-300 dark:border-error-700 bg-white dark:bg-transparent hover:bg-error-50 dark:hover:bg-error-500/10 text-error-600 dark:text-error-400 focus-visible:ring-error-500/20",
                "outline-warning": "border border-warning-300 dark:border-warning-700 bg-white dark:bg-transparent hover:bg-warning-50 dark:hover:bg-warning-500/10 text-warning-600 dark:text-warning-500 focus-visible:ring-warning-500/20",
                "outline-brand": "border border-brand-300 dark:border-brand-700 bg-white dark:bg-transparent hover:bg-brand-50 dark:hover:bg-brand-500/10 text-brand-600 dark:text-brand-400 focus-visible:ring-brand-500/20",
                
                // Ghost - Transparent (Actions discrètes)
                ghost: "hover:bg-gray-100 dark:hover:bg-white/[0.03] text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus-visible:ring-gray-500/20",
                "ghost-success": "hover:bg-success-50 dark:hover:bg-success-500/10 text-success-600 dark:text-success-400 focus-visible:ring-success-500/20",
                "ghost-danger": "hover:bg-error-50 dark:hover:bg-error-500/10 text-error-600 dark:text-error-400 focus-visible:ring-error-500/20",
                
                // Link
                link: "text-brand-500 dark:text-brand-400 underline-offset-4 hover:underline focus-visible:ring-brand-500/20",
            },
            size: {
                default: "h-11 px-5 py-2.5",
                sm: "h-9 rounded-lg px-3.5 text-sm",
                lg: "h-12 rounded-lg px-6 text-base",
                icon: "h-11 w-11",
                "icon-sm": "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
