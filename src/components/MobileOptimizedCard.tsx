
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/use-responsive';

interface MobileOptimizedCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  compact?: boolean;
  interactive?: boolean;
  loading?: boolean;
}

const MobileOptimizedCard: React.FC<MobileOptimizedCardProps> = ({
  children,
  className,
  title,
  description,
  footer,
  compact = false,
  interactive = false,
  loading = false,
}) => {
  const { isMobile } = useResponsive();

  return (
    <Card className={cn(
      'w-full transition-all duration-300',
      compact 
        ? 'p-3 sm:p-4 space-y-3 sm:space-y-4' 
        : 'p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6',
      interactive && 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
      'touch-manipulation',
      isMobile && 'active:scale-[0.98]',
      loading && 'opacity-75',
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
              'leading-tight',
              loading && 'animate-pulse'
            )}>
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className={cn(
              compact 
                ? 'text-sm sm:text-base' 
                : 'text-base sm:text-lg',
              'leading-relaxed',
              loading && 'animate-pulse'
            )}>
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      
      <CardContent className="p-0">
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
          </div>
        ) : (
          children
        )}
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
