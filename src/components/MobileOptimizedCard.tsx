
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MobileOptimizedCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  compact?: boolean;
}

const MobileOptimizedCard: React.FC<MobileOptimizedCardProps> = ({
  children,
  className,
  title,
  description,
  footer,
  compact = false,
}) => {
  return (
    <Card className={cn(
      'w-full transition-all duration-300',
      compact 
        ? 'p-3 sm:p-4 space-y-3 sm:space-y-4' 
        : 'p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6',
      'hover:shadow-lg hover:-translate-y-1',
      'touch-manipulation',
      className
    )}>
      {(title || description) && (
        <CardHeader className={cn(
          compact ? 'p-0 space-y-1' : 'p-0 space-y-2'
        )}>
          {title && (
            <CardTitle className={cn(
              compact 
                ? 'text-lg sm:text-xl' 
                : 'text-xl sm:text-2xl lg:text-3xl',
              'leading-tight'
            )}>
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className={cn(
              compact 
                ? 'text-sm sm:text-base' 
                : 'text-base sm:text-lg',
              'leading-relaxed'
            )}>
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      
      <CardContent className="p-0">
        {children}
      </CardContent>
      
      {footer && (
        <CardFooter className="p-0 pt-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default MobileOptimizedCard;
