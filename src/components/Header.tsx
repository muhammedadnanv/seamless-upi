
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Settings, BellRing, Sun, Moon, User, Gift, Sparkles } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import QRCode from 'qrcode';

const Header: React.FC = () => {
  const { isAdmin, toggleAdminMode, transactions, activeUpiId, addUpiId } = useAppContext();
  const { theme, setTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDonationQR, setShowDonationQR] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const recentNotifications = transactions.slice(0, 3).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

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
      });
    }
  }, [showDonationQR, activeUpiId]);

  const addDefaultUpiId = () => {
    addUpiId({
      upiId: "adnanmuhammad4393@okicici",
      name: "Adnan Muhammad",
      isDefault: true
    });
    setTimeout(() => {
      setShowDonationQR(true);
    }, 500);
  };

  return (
    <header className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-white/20 sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div className="flex items-center gap-2 group">
          <div className="relative">
            <QrCode className="h-6 w-6 md:h-7 md:w-7 text-upi-blue transform group-hover:scale-110 transition-all duration-300" />
            <div className="absolute -inset-1 bg-gradient-to-r from-upi-blue/20 to-purple-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-upi-blue to-purple-600 bg-clip-text text-transparent">
            CodeCashier
          </h1>
          <Badge variant="secondary" className="hidden sm:inline-flex text-xs bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
            <Sparkles size={10} className="mr-1" />
            Pro
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Enhanced Donation Button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowDonationQR(true)} 
            className="hidden sm:flex items-center gap-2 border-2 border-green-200 text-green-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:border-green-300 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Gift className="h-4 w-4" />
            <span>Support Us</span>
          </Button>
          
          {/* Mobile Donation Button */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setShowDonationQR(true)} 
            className="sm:hidden h-9 w-9 rounded-full border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-300"
          >
            <Gift className="h-4 w-4" />
          </Button>

          {/* Enhanced Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
            className="rounded-full h-9 w-9 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-indigo-600" />}
          </Button>
          
          {/* Enhanced Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-9 w-9 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 relative shadow-sm hover:shadow-md"
              >
                <BellRing className="h-5 w-5 text-blue-600" />
                {recentNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 border-0 shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md" align="end">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <BellRing size={16} />
                  Recent Activity
                </h3>
              </div>
              <div className="max-h-96 overflow-auto">
                {recentNotifications.length === 0 ? (
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BellRing className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">No new notifications</p>
                  </div>
                ) : (
                  recentNotifications.map((transaction, index) => (
                    <div key={transaction.id} className="p-4 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          transaction.status === 'completed' ? 'bg-green-500' :
                          transaction.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            Transaction {transaction.status}
                          </div>
                          <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                            ₹{transaction.amount.toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(transaction.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* Enhanced Admin Toggle */}
          <Badge 
            variant={isAdmin ? "default" : "secondary"} 
            className={`${
              isAdmin 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } text-xs sm:text-sm transition-all duration-300 cursor-pointer`}
            onClick={toggleAdminMode}
          >
            {isAdmin ? "Admin Mode" : "User Mode"}
          </Badge>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleAdminMode} 
            className="rounded-full h-9 w-9 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Settings className="h-5 w-5 text-purple-600" />
          </Button>
        </div>

        {/* Enhanced Donation QR Code Dialog */}
        <Dialog open={showDonationQR} onOpenChange={setShowDonationQR}>
          <DialogContent className="max-w-md border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Gift className="h-4 w-4 text-white" />
                </div>
                Support CodeCashier
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-300">
                Help us continue building amazing features by supporting our development with a small contribution.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col items-center justify-center p-6">
              {activeUpiId ? (
                <>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-6">
                    {qrDataUrl ? (
                      <img src={qrDataUrl} alt="Donation QR Code" className="w-64 h-64 rounded-xl" />
                    ) : (
                      <div className="w-64 h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                        <div className="text-center space-y-2">
                          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                          <p className="text-gray-500 text-sm">Generating QR code...</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center space-y-4 w-full">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200/50">
                      <p className="font-semibold text-green-800 dark:text-green-300 text-lg">₹199 one-time support</p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">UPI ID: {activeUpiId.upiId}</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200/50">
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
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto">
                    <Gift className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Setup Required</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">No UPI ID is configured to receive donations.</p>
                  </div>
                  <Button 
                    onClick={addDefaultUpiId} 
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
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
