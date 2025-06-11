
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Sun, Moon, Bell } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useBranding } from '@/hooks/use-branding';
import NotificationBell from '@/components/NotificationBell';
import { useResponsive } from '@/hooks/use-responsive';

const MobileHeader: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { branding } = useBranding();
  const { isMobile } = useResponsive();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-2 sm:gap-3">
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

        {/* Actions Section */}
        <div className="flex items-center gap-1 sm:gap-2">
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
