
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Settings, BellRing, Sun, Moon, User, Gift } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import QRCode from 'qrcode';

const Header: React.FC = () => {
  const {
    isAdmin,
    toggleAdminMode,
    transactions,
    activeUpiId,
    addUpiId
  } = useAppContext();
  
  const {
    theme,
    setTheme
  } = useTheme();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDonationQR, setShowDonationQR] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Get recent notifications (last 3 transactions)
  const recentNotifications = transactions.slice(0, 3).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Generate donation QR code when dialog opens
  React.useEffect(() => {
    if (showDonationQR && activeUpiId) {
      const donationAmount = 199; // Fixed donation amount

      // Create the UPI URL for donation
      const baseUrl = 'upi://pay';
      const params = new URLSearchParams();
      params.append('pa', activeUpiId.upiId);
      params.append('pn', activeUpiId.name);
      params.append('am', donationAmount.toString());
      params.append('tn', 'Support CodeCashier with your contribution');
      const fullUrl = `${baseUrl}?${params.toString()}`;

      // Generate QR code
      QRCode.toDataURL(fullUrl, {
        width: 256,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }).then(url => {
        setQrDataUrl(url);
      }).catch(err => {
        console.error('Error generating donation QR code:', err);
      });
    }
  }, [showDonationQR, activeUpiId]);

  // Function to add the default UPI ID if none exists
  const addDefaultUpiId = () => {
    addUpiId({
      upiId: "adnanmuhammad4393@okicici",
      name: "Adnan Muhammad",
      isDefault: true
    });
    // Reopen the donation dialog after adding the UPI
    setTimeout(() => {
      setShowDonationQR(true);
    }, 500);
  };

  return <header className="flex items-center justify-between p-2 sm:p-3 md:p-4 border-b shadow-sm">
      <div className="flex items-center gap-1 sm:gap-2">
        <QrCode className="h-5 w-5 md:h-6 md:w-6 text-upi-blue" />
        <h1 className="text-base sm:text-lg md:text-xl font-bold text-upi-blue">CodeCashier</h1>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Donation Button */}
        <Button variant="outline" size="sm" onClick={() => setShowDonationQR(true)} className="hidden sm:flex items-center gap-1 border-upi-green text-upi-green hover:bg-upi-green/10">
          <Gift className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Donate</span>
        </Button>
        
        {/* Mobile Donation Button */}
        <Button variant="outline" size="icon" onClick={() => setShowDonationQR(true)} className="sm:hidden h-7 w-7 rounded-full border-upi-green text-upi-green hover:bg-upi-green/10">
          <Gift className="h-3 w-3" />
        </Button>

        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-full h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
          ) : (
            <Moon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
          )}
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
        
        {/* User Profile - Adding an empty User icon button for symmetry */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <User className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
        </Button>

        <Badge variant={isAdmin ? "outline" : "secondary"} className={`${isAdmin ? "bg-upi-blue text-white" : ""} text-xs sm:text-sm`}>
          {isAdmin ? "Admin Mode" : "User Mode"}
        </Badge>
        <Button variant="ghost" size="icon" onClick={toggleAdminMode} className="rounded-full h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Settings className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
        </Button>
      </div>

      {/* Donation QR Code Dialog */}
      <Dialog open={showDonationQR} onOpenChange={setShowDonationQR}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-upi-green" />
              Support CodeCashier
            </DialogTitle>
            <DialogDescription>
              Scan this QR code to donate ₹199 and support the development of CodeCashier.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center p-4">
            {activeUpiId ? <>
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  {qrDataUrl ? <img src={qrDataUrl} alt="Donation QR Code" className="w-60 h-60" /> : <div className="w-60 h-60 flex items-center justify-center bg-gray-100 rounded-md">
                      <p className="text-muted-foreground">Generating QR code...</p>
                    </div>}
                </div>
                <div className="text-center space-y-1">
                  <p className="font-medium">₹199 one-time donation</p>
                  <p className="text-sm text-muted-foreground">UPI ID: {activeUpiId.upiId}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Thank you for supporting CodeCashier!
                  </p>
                </div>
              </> : <div className="text-center py-8 text-muted-foreground space-y-4">
                <p>No UPI ID is configured to receive donations.</p>
                <Button onClick={addDefaultUpiId} variant="default" className="bg-upi-green hover:bg-upi-green/90">
                  Add Donation UPI ID
                </Button>
              </div>}
          </div>
        </DialogContent>
      </Dialog>
    </header>;
};
export default Header;
