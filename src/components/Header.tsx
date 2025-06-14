
import React from 'react';
import MobileHeader from '@/components/MobileHeader';
import GlobalNavigation from '@/components/GlobalNavigation';
import { useResponsive } from '@/hooks/use-responsive';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { isMobile } = useResponsive();
  const location = useLocation();
  
  // Show back button on all pages except landing page
  const showBackButton = location.pathname !== '/';

  return (
    <div>
      <MobileHeader />
      {/* Add breadcrumb navigation below header on larger screens */}
      {!isMobile && (
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container px-3 sm:px-4 lg:px-6 py-2">
            <GlobalNavigation variant="breadcrumb" showBackButton={showBackButton} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
