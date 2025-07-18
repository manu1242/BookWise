import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ className, children }) => {
  return (
    <div className={cn(
      'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700',
      className
    )}>
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children }) => {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-200 dark:border-gray-700', className)}>
      {children}
    </div>
  );
};

export const CardContent = ({ className, children }) => {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  );
};