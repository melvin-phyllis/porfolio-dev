import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
    "rounded-2xl border shadow-theme-xs transition-all duration-200",
    {
        variants: {
            variant: {
                // Default - Neutral
                default: "border-gray-200 bg-white text-gray-800 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90",
                
                // Brand - Blue accent
                brand: "border-brand-200 bg-brand-50 text-brand-900 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-100",
                
                // Success - Green accent
                success: "border-success-200 bg-success-50 text-success-900 dark:border-success-800 dark:bg-success-500/10 dark:text-success-100",
                
                // Warning - Orange accent
                warning: "border-warning-200 bg-warning-50 text-warning-900 dark:border-warning-800 dark:bg-warning-500/10 dark:text-warning-100",
                
                // Danger - Red accent
                danger: "border-error-200 bg-error-50 text-error-900 dark:border-error-800 dark:bg-error-500/10 dark:text-error-100",
                
                // Info - Cyan accent
                info: "border-blue-light-200 bg-blue-light-50 text-blue-light-900 dark:border-blue-light-800 dark:bg-blue-light-500/10 dark:text-blue-light-100",
                
                // Ghost - Transparent background
                ghost: "border-transparent bg-transparent text-gray-800 dark:text-white/90 shadow-none",
                
                // Elevated - More shadow
                elevated: "border-gray-100 bg-white text-gray-800 shadow-theme-md dark:border-gray-800 dark:bg-gray-900 dark:text-white/90",
                
                // Interactive - Hover effect
                interactive: "border-gray-200 bg-white text-gray-800 hover:border-brand-300 hover:shadow-theme-md cursor-pointer dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:hover:border-brand-700",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> { }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(cardVariants({ variant }), className)}
            {...props}
        />
    )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight text-gray-800 dark:text-white/90",
            className
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
