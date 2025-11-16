import { clsx } from 'clsx';

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <input
          ref={ref}
          className={clsx(
            'rounded-lg border px-3 py-2 text-sm placeholder-gray-400 transition-colors',
            'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500',
            error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
