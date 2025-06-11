
import React from 'react';
import Header from '@/components/Header';
import ResponsiveContainer from '@/components/ResponsiveContainer';
import GlobalNavigation from '@/components/GlobalNavigation';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  showFooterNavigation?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full';
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  className,
  showFooterNavigation = true,
  maxWidth = '7xl'
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <Header />
      
      <ResponsiveContainer className={cn("py-4 sm:py-6 lg:py-8", className)} maxWidth={maxWidth}>
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
        
        <main className="flex-1">
          {children}
        </main>
        
        {showFooterNavigation && (
          <footer className="mt-12 pt-8 border-t">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
              <GlobalNavigation variant="footer" />
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
