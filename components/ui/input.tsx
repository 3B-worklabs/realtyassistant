import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-3xl border border-border bg-background px-4 py-3 text-text shadow-sm transition duration-200 placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';
