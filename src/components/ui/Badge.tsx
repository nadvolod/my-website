"use client";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "accent" | "outline" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const badgeVariants = {
  default: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
  primary: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200",
  secondary: "bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200",
  accent: "bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200",
  outline: "bg-transparent border border-neutral-300 text-neutral-700 dark:border-neutral-600 dark:text-neutral-300",
  success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const badgeSizes = {
  sm: "px-2 py-0.5 text-xs font-medium rounded-md",
  md: "px-2.5 py-1 text-sm font-medium rounded-lg",
  lg: "px-3 py-1.5 text-base font-semibold rounded-xl",
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", size = "md", children, className, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-sans transition-colors duration-200";
    const variantClasses = badgeVariants[variant];
    const sizeClasses = badgeSizes[size];
    
    const badgeClasses = twMerge(
      baseClasses,
      variantClasses,
      sizeClasses,
      className
    );

    return (
      <span
        ref={ref}
        className={badgeClasses}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge; 