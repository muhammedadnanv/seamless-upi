import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Settings, BellRing, Sun, Moon, User } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
const Header: React.FC = () => {
  const {
    isAdmin,
    toggleAdminMode,
    transactions
  } = useAppContext();
  const {
    theme,
    setTheme
  } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  // Get recent notifications (last 3 transactions)
  const recentNotifications = transactions.slice(0, 3).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return <header className="flex items-center justify-between p-2 sm:p-3 md:p-4 border-b shadow-sm">
      <div className="flex items-center gap-1 sm:gap-2">
        <QrCode className="h-5 w-5 md:h-6 md:w-6 text-upi-blue" />
        <h1 className="text-base sm:text-lg md:text-xl font-bold text-upi-blue">CodeCashier</h1>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-full h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          {theme === 'dark' ? <Sun className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" /> : <Moon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />}
        </Button>
        
        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
              <BellRing className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              {recentNotifications.length > 0 && <span className="absolute top-0 right-0 h-2 w-2 sm:h-2.5 sm:w-2.5 bg-red-500 rounded-full" />}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="end">
            <div className="p-2 border-b">
              <h3 className="font-medium text-sm">Notifications</h3>
            </div>
            <div className="max-h-64 overflow-auto">
              {recentNotifications.length === 0 ? <div className="p-4 text-center text-sm text-muted-foreground">
                  No new notifications
                </div> : recentNotifications.map(transaction => <div key={transaction.id} className="p-3 border-b last:border-0 hover:bg-muted/50">
                    <div className="text-xs font-medium">
                      Transaction {transaction.status}
                    </div>
                    <div className="text-sm">₹{transaction.amount.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </div>
                  </div>)}
            </div>
          </PopoverContent>
        </Popover>
        
        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            
          </DropdownMenuTrigger>
          
        </DropdownMenu>

        <Badge variant={isAdmin ? "outline" : "secondary"} className={`${isAdmin ? "bg-upi-blue text-white" : ""} text-xs sm:text-sm`}>
          {isAdmin ? "Admin Mode" : "User Mode"}
        </Badge>
        <Button variant="ghost" size="icon" onClick={toggleAdminMode} className="rounded-full h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Settings className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </header>;
};
export default Header;