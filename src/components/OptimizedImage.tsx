'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  quality?: number;
  loading?: 'lazy' | 'eager';
  // Performance enhancements
  preload?: boolean;
  critical?: boolean;
  // Mobile-specific optimizations
  mobileWidth?: number;
  mobileHeight?: number;
  // Intersection observer options
  rootMargin?: string;
  threshold?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  sizes = '(max-width: 480px) 100vw, (max-width: 768px) 75vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  quality = 85,
  loading = 'lazy',
  preload = false,
  critical = false,
  mobileWidth,
  mobileHeight,
  rootMargin = '50px',
  threshold = 0.1,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority || critical);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || critical || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority, critical, rootMargin, threshold]);

  // Preload critical images
  useEffect(() => {
    if (preload || critical) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [preload, critical, src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Responsive dimensions for mobile
  const getResponsiveDimensions = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return {
        width: mobileWidth || width,
        height: mobileHeight || height,
      };
    }
    return { width, height };
  };

  const { width: responsiveWidth, height: responsiveHeight } = getResponsiveDimensions();

  // Generate a simple blur placeholder if none provided
  const generateBlurDataURL = (w: number, h: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, w, h);
    }
    return canvas.toDataURL();
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={`Failed to load image: ${alt}`}
      >
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          Image unavailable
        </span>
      </div>
    );
  }

  return (
    <motion.div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
          style={{ width: responsiveWidth, height: responsiveHeight }}
        />
      )}
      
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : responsiveWidth}
          height={fill ? undefined : responsiveHeight}
          fill={fill}
          priority={priority || critical}
          placeholder={placeholder}
          blurDataURL={blurDataURL || (placeholder === 'blur' ? generateBlurDataURL(responsiveWidth, responsiveHeight) : undefined)}
          sizes={sizes}
          quality={quality}
          loading={priority || critical ? 'eager' : loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          {...props}
        />
      )}
    </motion.div>
  );
};

export default OptimizedImage; 