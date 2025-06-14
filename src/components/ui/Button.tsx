"use client";
import { motion, MotionProps } from "framer-motion";
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "gradient-primary" | "gradient-secondary" | "gradient-accent";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const buttonVariants = {
  primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-soft hover:shadow-medium border-transparent",
  secondary: "bg-secondary-500 hover:bg-secondary-600 text-white shadow-soft hover:shadow-medium border-transparent",
  accent: "bg-accent-500 hover:bg-accent-600 text-white shadow-soft hover:shadow-medium border-transparent",
  outline: "bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800 text-foreground border-neutral-300 dark:border-neutral-600 hover:border-primary-500",
  ghost: "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-foreground border-transparent",
  "gradient-primary": "bg-gradient-primary hover:shadow-glow text-white border-transparent",
  "gradient-secondary": "bg-gradient-secondary hover:shadow-glow-secondary text-white border-transparent",
  "gradient-accent": "bg-gradient-accent hover:shadow-glow-accent text-white border-transparent",
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm font-medium rounded-lg",
  md: "px-4 py-2 text-base font-medium rounded-xl",
  lg: "px-6 py-3 text-lg font-semibold rounded-xl",
  xl: "px-8 py-4 text-xl font-semibold rounded-2xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = "primary", 
    size = "md", 
    isLoading = false, 
    leftIcon, 
    rightIcon, 
    children, 
    className, 
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 border transition-all duration-200 ease-smooth focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-sans";
    
    const variantClasses = buttonVariants[variant];
    const sizeClasses = buttonSizes[size];
    
    const buttonClasses = twMerge(
      baseClasses,
      variantClasses,
      sizeClasses,
      className
    );

    return (
      <motion.button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading...
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button; 