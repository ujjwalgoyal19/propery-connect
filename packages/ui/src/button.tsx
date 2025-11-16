import { clsx } from 'clsx';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, ...props }, ref) => {
    const baseStyles = 'font-semibold rounded-lg transition-colors duration-200';

    const variantStyles = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100',
      outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-blue-300',
      ghost: 'text-blue-600 hover:bg-blue-50 disabled:text-blue-300',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? 'Loading...' : props.children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
