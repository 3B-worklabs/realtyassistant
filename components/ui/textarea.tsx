'use client';
import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'min-h-[120px] w-full rounded-3xl border border-border bg-background px-4 py-3 text-text shadow-sm transition duration-200 placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20',
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';
