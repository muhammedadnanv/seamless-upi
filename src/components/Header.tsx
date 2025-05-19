
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const {
    isAdmin,
    toggleAdminMode
  } = useAppContext();
  
  return (
    <header className="flex items-center justify-between p-3 md:p-4 border-b shadow-sm">
      <div className="flex items-center gap-2">
        <QrCode className="h-5 w-5 md:h-6 md:w-6 text-upi-blue" />
        <h1 className="text-lg md:text-xl font-bold text-upi-blue">CodeCashier</h1>
      </div>
      <div className="flex items-center gap-2">
        <Badge 
          variant={isAdmin ? "outline" : "secondary"} 
          className={isAdmin ? "bg-upi-blue text-white" : ""}
        >
          {isAdmin ? "Admin Mode" : "User Mode"}
        </Badge>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleAdminMode} 
          className="rounded-full h-8 w-8 md:h-9 md:w-9 hover:bg-gray-100 transition-colors"
        >
          <Settings className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
