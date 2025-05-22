
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Gift, HandCoins, Zap, ShieldCheck, Star, Sun, Moon, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { useTheme } from '@/components/ThemeProvider';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const {
    theme,
    setTheme
  } = useTheme();
  
  const {
    upiIds,
    addUpiId
  } = useAppContext();
  
  const handleGetStarted = () => {
    // Check if the default UPI ID already exists
    const existingUpi = upiIds.find(upi => upi.upiId === "adnanmuhammad4393@okicici");
    if (!existingUpi) {
      // Add the default UPI ID if it doesn't exist
      addUpiId({
        upiId: "adnanmuhammad4393@okicici",
        name: "Muhammed Adnan",
        isDefault: true
      });
    }

    // Navigate directly to the app page
    navigate('/app');
  };
  
  return <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-3 sm:p-4 md:p-5 border-b">
        <div className="flex items-center gap-1 sm:gap-2">
          <QrCode className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-upi-blue" />
          <h1 className="text-base sm:text-lg md:text-xl font-bold text-upi-blue">CodeCashier</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-full">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <Button onClick={() => navigate('/widget')} variant="outline" size="sm" className="text-xs sm:text-sm mr-2">
            <Code size={14} className="mr-1" />
            Widget
          </Button>
          <Button onClick={() => navigate('/app')} variant="outline" size="sm" className="text-xs sm:text-sm">
            Open App
          </Button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-b from-upi-background to-background dark:from-gray-900 dark:to-gray-800">
        <div className="container max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="space-y-3 sm:space-y-4 md:space-y-6 text-center md:text-left">
              <div className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-upi-light/10 text-upi-blue rounded-full text-xs sm:text-sm font-medium dark:bg-blue-900/30 dark:text-blue-300">
                Quick & Secure Payments
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dark:text-white">
                Streamline Your <span className="text-upi-blue dark:text-blue-400">UPI Payments</span> with CodeCashier
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground dark:text-gray-300">
                Generate UPI QR codes instantly, manage transactions, and receive payments effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                <Button size="lg" onClick={handleGetStarted} className="bg-upi-blue hover:bg-upi-blue/90 shadow-md hover:shadow-lg transition-all">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/widget')} className="border-upi-blue text-upi-blue hover:bg-upi-blue/10">
                  <Code size={18} className="mr-2" />
                  Explore Widget
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-8 sm:py-12 md:py-16 bg-background dark:bg-gray-900">
        <div className="container max-w-6xl mx-auto px-3 sm:px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12 dark:text-white">Why Use CodeCashier?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <Card className="border-2 border-upi-light/10 transition-all hover:shadow-md hover:border-upi-light/20">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg md:text-xl flex items-center gap-1 sm:gap-2">
                  <QrCode className="h-4 w-4 sm:h-5 sm:w-5 text-upi-blue" />
                  Instant QR Codes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 text-sm">
                Generate UPI payment QR codes on the fly with your preferred amount and payment details.
              </CardContent>
            </Card>
            <Card className="border-2 border-upi-light/10 transition-all hover:shadow-md hover:border-upi-light/20">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg md:text-xl flex items-center gap-1 sm:gap-2">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-upi-blue" />
                  Transaction Security
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 text-sm">
                Keep your payment data secure with our advanced encryption and secure transaction processing.
              </CardContent>
            </Card>
            <Card className="border-2 border-upi-light/10 transition-all hover:shadow-md hover:border-upi-light/20">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg md:text-xl flex items-center gap-1 sm:gap-2">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-upi-blue" />
                  Premium Features
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 text-sm">
                Access advanced reporting, voice commands, and customizable transaction history.
              </CardContent>
            </Card>
            <Card className="border-2 border-upi-light/10 transition-all hover:shadow-md hover:border-upi-light/20 bg-gradient-to-br from-upi-light to-white dark:from-gray-800 dark:to-gray-900">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg md:text-xl flex items-center gap-1 sm:gap-2">
                  <Code className="h-4 w-4 sm:h-5 sm:w-5 text-upi-blue" />
                  Embeddable Widget
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 text-sm">
                Use our customizable donation widget on your own website with simple HTML embedding.
              </CardContent>
              <CardFooter className="p-4 sm:p-6 pt-0">
                <Button variant="link" size="sm" onClick={() => navigate('/widget')} className="p-0 text-upi-blue">
                  Try it now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t py-4 sm:py-6 md:py-8 dark:bg-gray-900 dark:border-gray-800">
        <div className="container max-w-6xl mx-auto px-3 sm:px-4 text-center text-xs sm:text-sm text-muted-foreground">
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-1">
              <QrCode className="h-3 w-3 sm:h-4 sm:w-4" />
              <p>CodeCashier - Premium UPI Payment Platform</p>
            </div>
            <p className="text-xs mt-0.5 sm:mt-1">Created by Muhammed Adnan</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Landing;
