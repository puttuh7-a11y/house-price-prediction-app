import React from 'react';

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow p-4 border border-gray-100 ${className}`}>
      {children}
    </div>
  );
}

