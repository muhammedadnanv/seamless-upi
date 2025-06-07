
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useNotifications } from '@/context/NotificationContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Settings, Sun, Moon, User, Gift, Sparkles } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import NotificationBell from '@/components/NotificationBell';
import QRCode from 'qrcode';

const Header: React.FC = () => {
  const { isAdmin, toggleAdminMode, transactions, activeUpiId, addUpiId } = useAppContext();
  const { addNotification } = useNotifications();
  const { theme, setTheme, actualTheme } = useTheme();
  const [showDonationQR, setShowDonationQR] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Monitor transactions for notifications
  React.useEffect(() => {
    const latestTransaction = transactions[0];
    if (latestTransaction) {
      const timeDiff = new Date().getTime() - new Date(latestTransaction.timestamp).getTime();
      // Only notify for transactions from the last 10 seconds (recent ones)
      if (timeDiff < 10000) {
        addNotification({
          type: latestTransaction.status === 'completed' ? 'success' : 
                latestTransaction.status === 'pending' ? 'info' : 'error',
          title: `Transaction ${latestTransaction.status}`,
          message: `₹${latestTransaction.amount.toFixed(2)} transaction ${latestTransaction.status}`,
          action: latestTransaction.status === 'completed' ? {
            label: 'View Details',
            onClick: () => {
              console.log('View transaction details:', latestTransaction);
              // You can add navigation to transaction details here
            }
          } : undefined
        });
      }
    }
  }, [transactions, addNotification]);

  React.useEffect(() => {
    if (showDonationQR && activeUpiId) {
      const donationAmount = 199;
      const baseUrl = 'upi://pay';
      const params = new URLSearchParams();
      params.append('pa', activeUpiId.upiId);
      params.append('pn', activeUpiId.name);
      params.append('am', donationAmount.toString());
      params.append('tn', 'Support CodeCashier with your contribution');
      const fullUrl = `${baseUrl}?${params.toString()}`;

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
        addNotification({
          type: 'error',
          title: 'QR Code Error',
          message: 'Failed to generate donation QR code'
        });
      });
    }
  }, [showDonationQR, activeUpiId, addNotification]);

  const addDefaultUpiId = () => {
    addUpiId({
      upiId: "adnanmuhammad4393@okicici",
      name: "Adnan Muhammad",
      isDefault: true
    });
    
    addNotification({
      type: 'success',
      title: 'UPI ID Added',
      message: 'Default donation UPI ID has been configured successfully'
    });
    
    setTimeout(() => {
      setShowDonationQR(true);
    }, 500);
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    addNotification({
      type: 'info',
      title: 'Theme Changed',
      message: `Switched to ${newTheme} mode`
    });
  };

  const handleAdminToggle = () => {
    toggleAdminMode();
    const newMode = !isAdmin ? 'Admin' : 'User';
    addNotification({
      type: 'info',
      title: 'Mode Changed',
      message: `Switched to ${newMode} mode`
    });
  };

  return (
    <header className="glass-panel border-b border-white/20 dark:border-gray-700/20 sticky top-0 z-50 shadow-xl">
      <div className="flex items-center justify-between p-4 lg:p-5">
        <div className="flex items-center gap-3 group">
          <div className="relative p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300">
            <QrCode className="h-6 w-6 md:h-7 md:w-7 text-blue-600 dark:text-blue-400 transform group-hover:scale-110 transition-all duration-300" />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient leading-tight">
              CodeCashier
            </h1>
            <Badge variant="secondary" className="hidden sm:inline-flex text-xs w-fit bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 border-green-200/50 dark:border-green-700/50 shadow-sm">
              <Sparkles size={10} className="mr-1" />
              Premium
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Enhanced Donation Button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowDonationQR(true)} 
            className="hidden sm:flex items-center gap-2 glass-panel border-green-200/50 dark:border-green-700/50 text-green-700 dark:text-green-300 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300 shadow-sm hover:shadow-lg glow-effect"
          >
            <Gift className="h-4 w-4" />
            <span className="font-medium">Support Us</span>
          </Button>
          
          {/* Mobile Donation Button */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setShowDonationQR(true)} 
            className="sm:hidden h-10 w-10 rounded-full glass-panel border-green-200/50 dark:border-green-700/50 text-green-700 dark:text-green-300 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            <Gift className="h-4 w-4" />
          </Button>

          {/* Enhanced Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleThemeToggle} 
            className="rounded-full h-10 w-10 glass-panel hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group"
          >
            {actualTheme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-500 group-hover:rotate-90 transition-transform duration-300" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 group-hover:-rotate-12 transition-transform duration-300" />
            )}
          </Button>
          
          {/* Enhanced Notifications */}
          <NotificationBell />

          {/* Enhanced Admin Toggle */}
          <div className="flex items-center gap-2">
            <Badge 
              variant={isAdmin ? "default" : "secondary"} 
              className={`${
                isAdmin 
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl" 
                  : "bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-700/80"
              } text-xs sm:text-sm transition-all duration-300 cursor-pointer px-3 py-1.5 backdrop-blur-sm hover:-translate-y-0.5`}
              onClick={handleAdminToggle}
            >
              {isAdmin ? "Admin Mode" : "User Mode"}
            </Badge>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleAdminToggle} 
              className="rounded-full h-10 w-10 glass-panel hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <Settings className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:rotate-90 transition-transform duration-300" />
            </Button>
          </div>
        </div>

        {/* Enhanced Donation QR Code Dialog */}
        <Dialog open={showDonationQR} onOpenChange={setShowDonationQR}>
          <DialogContent className="max-w-md border-0 glass-card shadow-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <Gift className="h-5 w-5 text-white" />
                </div>
                <span className="text-gradient">Support CodeCashier</span>
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Help us continue building amazing features by supporting our development with a small contribution.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col items-center justify-center p-6">
              {activeUpiId ? (
                <>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mb-6">
                    {qrDataUrl ? (
                      <img src={qrDataUrl} alt="Donation QR Code" className="w-64 h-64 rounded-xl" />
                    ) : (
                      <div className="w-64 h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                        <div className="text-center space-y-3">
                          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Generating QR code...</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center space-y-4 w-full">
                    <div className="premium-gradient-subtle p-4 rounded-xl border border-green-200/50 dark:border-green-700/50 shadow-sm">
                      <p className="font-semibold text-green-800 dark:text-green-300 text-lg">₹199 one-time support</p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">UPI ID: {activeUpiId.upiId}</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-700/50 shadow-sm">
                      <p className="text-blue-700 dark:text-blue-300 text-sm font-medium flex items-center justify-center gap-2">
                        <Sparkles size={14} />
                        Thank you for supporting CodeCashier!
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Your contribution helps us build better features</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Gift className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Setup Required</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">No UPI ID is configured to receive donations.</p>
                  </div>
                  <Button 
                    onClick={addDefaultUpiId} 
                    className="premium-button shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Gift className="mr-2 h-4 w-4" />
                    Setup Donation UPI ID
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
