
import React from 'react';
import MobileHeader from '@/components/MobileHeader';
import GlobalNavigation from '@/components/GlobalNavigation';
import { useResponsive } from '@/hooks/use-responsive';

const Header: React.FC = () => {
  const { isMobile } = useResponsive();

  return (
    <div>
      <MobileHeader />
      {/* Add breadcrumb navigation below header on larger screens */}
      {!isMobile && (
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container px-3 sm:px-4 lg:px-6 py-2">
            <GlobalNavigation variant="breadcrumb" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
