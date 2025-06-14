
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Sun, Moon, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useBranding } from '@/hooks/use-branding';
import NotificationBell from '@/components/NotificationBell';
import GlobalNavigation from '@/components/GlobalNavigation';
import { useResponsive } from '@/hooks/use-responsive';
import { useLocation, useNavigate } from 'react-router-dom';

const MobileHeader: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { branding } = useBranding();
  const { isMobile } = useResponsive();
  const location = useLocation();
  const navigate = useNavigate();

  // Show back button on all pages except landing page
  const showBackButton = location.pathname !== '/';

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Logo Section with Back Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Back Button for Mobile */}
          {isMobile && showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="h-8 w-8 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Go back</span>
            </Button>
          )}
          
          <div className="flex items-center gap-2">
            {branding.logo.url ? (
              <img 
                src={branding.logo.url} 
                alt={branding.name}
                className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                style={{ 
                  width: branding.logo.width, 
                  height: branding.logo.height 
                }}
              />
            ) : (
              <QrCode className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            )}
            <div className="flex flex-col">
              <h1 className="text-base sm:text-lg lg:text-xl font-bold leading-tight">
                {branding.name}
              </h1>
              {!isMobile && branding.tagline && (
                <p className="text-xs text-muted-foreground hidden sm:block">
                  {branding.tagline}
                </p>
              )}
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className="hidden sm:inline-flex text-xs"
          >
            Free
          </Badge>
        </div>

        {/* Navigation - Hidden on mobile, shown on larger screens */}
        <div className="hidden lg:flex">
          <GlobalNavigation showBackButton={!isMobile && showBackButton} />
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <GlobalNavigation />
          </div>
          
          <NotificationBell />
          
          <Button
            variant="ghost"
            size={isMobile ? "sm" : "default"}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
