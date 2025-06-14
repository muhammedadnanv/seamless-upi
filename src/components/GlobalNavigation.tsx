
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Settings, Grid3X3, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/use-responsive';

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

const navigationItems: NavigationItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
    description: 'Landing page'
  },
  {
    href: '/app',
    label: 'Dashboard',
    icon: Settings,
    description: 'Main application'
  },
  {
    href: '/widget',
    label: 'Widget Demo',
    icon: Grid3X3,
    description: 'Widget demonstration'
  }
];

interface GlobalNavigationProps {
  variant?: 'header' | 'footer' | 'breadcrumb';
  className?: string;
  showBackButton?: boolean;
}

const GlobalNavigation: React.FC<GlobalNavigationProps> = ({ 
  variant = 'header',
  className,
  showBackButton = false
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useResponsive();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (variant === 'breadcrumb') {
    const currentItem = navigationItems.find(item => item.href === location.pathname);
    
    return (
      <nav className={cn("flex items-center space-x-2 text-sm text-muted-foreground", className)}>
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        )}
        <Link to="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        {currentItem && currentItem.href !== '/' && (
          <>
            <ArrowRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{currentItem.label}</span>
          </>
        )}
      </nav>
    );
  }

  if (variant === 'footer') {
    return (
      <nav className={cn("grid grid-cols-1 sm:grid-cols-3 gap-4", className)}>
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
          >
            <item.icon className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium">{item.label}</div>
              {item.description && (
                <div className="text-sm text-muted-foreground">{item.description}</div>
              )}
            </div>
          </Link>
        ))}
      </nav>
    );
  }

  // Default header variant
  return (
    <nav className={cn("flex items-center space-x-1 sm:space-x-2", className)}>
      {showBackButton && (
        <Button
          variant="ghost"
          size={isMobile ? "sm" : "default"}
          onClick={handleBack}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          {!isMobile && <span>Back</span>}
        </Button>
      )}
      {navigationItems.map((item) => {
        const isActive = location.pathname === item.href;
        
        return (
          <Button
            key={item.href}
            asChild
            variant={isActive ? "default" : "ghost"}
            size={isMobile ? "sm" : "default"}
            className={cn(
              "flex items-center gap-2",
              isActive && "bg-primary text-primary-foreground"
            )}
          >
            <Link to={item.href}>
              <item.icon className="h-4 w-4" />
              {!isMobile && <span>{item.label}</span>}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
};

export default GlobalNavigation;
