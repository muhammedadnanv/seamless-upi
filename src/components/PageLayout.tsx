
import React from 'react';
import Header from '@/components/Header';
import ResponsiveContainer from '@/components/ResponsiveContainer';
import GlobalNavigation from '@/components/GlobalNavigation';
import PageConnector from '@/components/PageConnector';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/use-responsive';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  showFooterNavigation?: boolean;
  showPageConnector?: boolean;
  showBackButton?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full';
  customPageFlow?: {
    previous?: { href: string; label: string };
    next?: { href: string; label: string };
  };
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  className,
  showFooterNavigation = true,
  showPageConnector = true,
  showBackButton = true,
  maxWidth = '7xl',
  customPageFlow
}) => {
  const { isMobile } = useResponsive();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <Header />
      
      <ResponsiveContainer className={cn("py-4 sm:py-6 lg:py-8", className)} maxWidth={maxWidth}>
        {/* Page Header */}
        {(title || description) && (
          <div className="mb-6 sm:mb-8">
            {title && (
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* Page Navigation Connector */}
        {showPageConnector && (
          <div className="mt-8 sm:mt-12">
            <PageConnector
              customPrevious={customPageFlow?.previous}
              customNext={customPageFlow?.next}
            />
          </div>
        )}
        
        {/* Footer Navigation */}
        {showFooterNavigation && (
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              {/* Quick Navigation */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Quick Navigation
                </h3>
                <GlobalNavigation variant="footer" />
              </div>
              
              {/* Platform Info */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    <p>CodeCashier - UPI Payment Platform</p>
                    {isMobile && (
                      <p className="text-xs mt-1">Optimized for mobile devices</p>
                    )}
                  </div>
                  
                  {/* Platform Status */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>All systems operational</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}
      </ResponsiveContainer>

      {/* Mobile bottom padding for safe area */}
      <div className="h-safe-area-inset-bottom lg:hidden" />
    </div>
  );
};

export default PageLayout;
