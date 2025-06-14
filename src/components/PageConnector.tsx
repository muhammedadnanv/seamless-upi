
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/use-responsive';

interface PageConnectorProps {
  className?: string;
  showPrevious?: boolean;
  showNext?: boolean;
  customPrevious?: { href: string; label: string };
  customNext?: { href: string; label: string };
}

const pageFlow = [
  { href: '/', label: 'Home', description: 'Landing page' },
  { href: '/app', label: 'Dashboard', description: 'Main application' },
  { href: '/widget', label: 'Widget Demo', description: 'Interactive demo' }
];

const PageConnector: React.FC<PageConnectorProps> = ({
  className,
  showPrevious = true,
  showNext = true,
  customPrevious,
  customNext
}) => {
  const location = useLocation();
  const { isMobile } = useResponsive();
  
  const currentIndex = pageFlow.findIndex(page => page.href === location.pathname);
  
  const previousPage = customPrevious || (currentIndex > 0 ? pageFlow[currentIndex - 1] : null);
  const nextPage = customNext || (currentIndex < pageFlow.length - 1 ? pageFlow[currentIndex + 1] : null);

  if (!previousPage && !nextPage) return null;

  return (
    <div className={cn(
      'flex flex-col sm:flex-row gap-3 sm:gap-4 w-full',
      isMobile ? 'mt-6' : 'mt-8',
      className
    )}>
      {/* Previous Page */}
      {showPrevious && previousPage && (
        <Button
          asChild
          variant="outline"
          className={cn(
            'flex items-center gap-2 h-auto p-4 text-left',
            isMobile ? 'w-full' : 'flex-1'
          )}
        >
          <Link to={previousPage.href}>
            <ArrowLeft className="h-4 w-4 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Previous
              </div>
              <div className="font-medium truncate">{previousPage.label}</div>
              {!isMobile && (
                <div className="text-sm text-muted-foreground truncate">
                  {pageFlow.find(p => p.href === previousPage.href)?.description}
                </div>
              )}
            </div>
          </Link>
        </Button>
      )}

      {/* Next Page */}
      {showNext && nextPage && (
        <Button
          asChild
          variant="outline"
          className={cn(
            'flex items-center gap-2 h-auto p-4 text-left',
            isMobile ? 'w-full' : 'flex-1'
          )}
        >
          <Link to={nextPage.href}>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Next
              </div>
              <div className="font-medium truncate">{nextPage.label}</div>
              {!isMobile && (
                <div className="text-sm text-muted-foreground truncate">
                  {pageFlow.find(p => p.href === nextPage.href)?.description}
                </div>
              )}
            </div>
            <ArrowRight className="h-4 w-4 flex-shrink-0" />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default PageConnector;
