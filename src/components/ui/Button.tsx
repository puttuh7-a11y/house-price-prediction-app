// src/components/ui/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger'; // Optional color variants
}

export default function Button({
  children,
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) {
  // Base styles shared by all buttons
  const baseClasses =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform transform hover:scale-105 duration-200';

  // Style variants
  const variantClasses: Record<string, string> = {
    primary:
      'bg-yellow-400 hover:bg-yellow-500 text-black focus:ring-yellow-300',
    secondary:
      'bg-gray-200 hover:bg-gray-300 text-black focus:ring-gray-400',
    danger:
      'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400',
  };

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
