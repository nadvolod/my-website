"use client";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "glass" | "bordered";
  hover?: boolean;
  children: React.ReactNode;
}

const cardVariants = {
  default: "bg-background border border-border shadow-soft",
  elevated: "bg-background border border-border shadow-medium hover:shadow-hard",
  glass: "glass backdrop-blur-md",
  bordered: "bg-background border-2 border-primary-200 dark:border-primary-800 hover:border-primary-300 dark:hover:border-primary-700",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", hover = true, children, className, ...props }, ref) => {
    const baseClasses = "rounded-2xl transition-all duration-300 ease-smooth";
    const variantClasses = cardVariants[variant];
    const hoverClasses = hover ? "hover:shadow-lg hover:-translate-y-1" : "";
    
    const cardClasses = twMerge(
      baseClasses,
      variantClasses,
      hoverClasses,
      className
    );

    return (
      <div
        ref={ref}
        className={cardClasses}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("p-6 pb-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = "CardHeader";

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("px-6 pb-6", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("px-6 py-4 border-t border-border", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = "CardFooter";

export default Card; 