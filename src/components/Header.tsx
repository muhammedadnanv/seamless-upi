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
  return <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <QrCode className="h-6 w-6 text-upi-blue" />
        <h1 className="text-xl font-bold text-upi-blue">CodeCashier</h1>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={isAdmin ? "outline" : "secondary"} className={isAdmin ? "bg-upi-blue text-white" : ""}>
          {isAdmin ? "Admin Mode" : "User Mode"}
        </Badge>
        <Button variant="ghost" size="icon" onClick={toggleAdminMode} className="rounded-full h-9 w-9">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>;
};
export default Header;