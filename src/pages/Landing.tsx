import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Gift, HandCoins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
const Landing: React.FC = () => {
  const navigate = useNavigate();
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

    // Navigate to the main app
    navigate('/app');
  };
  return <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <QrCode className="h-6 w-6 text-upi-blue" />
          <h1 className="text-xl font-bold text-upi-blue">CodeCashier</h1>
        </div>
        <Button onClick={() => navigate('/app')} variant="outline">
          Open App
        </Button>
      </header>
      
      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-b from-upi-background to-background">
        <div className="container max-w-6xl mx-auto px-4 py-12 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-upi-light/10 text-upi-blue rounded-full text-sm font-medium">
                Quick & Secure Payments
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Streamline Your <span className="text-upi-blue">UPI Payments</span> with ZapPay
              </h1>
              <p className="text-lg text-muted-foreground">
                Generate UPI QR codes instantly, manage transactions, and receive payments effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={handleGetStarted} className="bg-upi-blue hover:bg-upi-blue/90">
                  Get Started
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-end">
              <Card className="w-full max-w-md border-2 border-upi-blue/10 shadow-lg">
                <CardHeader className="text-center space-y-1">
                  <CardTitle className="text-2xl flex items-center justify-center gap-2">
                    <HandCoins className="h-6 w-6 text-upi-green" />
                    Donation
                  </CardTitle>
                  <CardDescription>Support CodeCashier with your contribution</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <span className="text-4xl font-bold">₹199</span>
                    <span className="text-muted-foreground ml-2">one-time</span>
                  </div>
                  <div className="rounded-md bg-muted p-3 mb-4">
                    <p className="font-medium">UPI ID</p>
                    <p className="text-lg select-all break-all">adnanmuhammad4393@okicici</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Transfer directly to support the development</p>
                    <p>or use the app to generate a QR code</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-upi-green hover:bg-upi-green/90" onClick={handleGetStarted}>
                    <Gift className="mr-2 h-4 w-4" />
                    Open App & Donate
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Use CodeCashier?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-upi-light/10">
              <CardHeader>
                <CardTitle>Instant QR Codes</CardTitle>
              </CardHeader>
              <CardContent>
                Generate UPI payment QR codes on the fly with your preferred amount and payment details.
              </CardContent>
            </Card>
            <Card className="border-2 border-upi-light/10">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                Keep track of all your payments in one place with a comprehensive transaction history.
              </CardContent>
            </Card>
            <Card className="border-2 border-upi-light/10">
              <CardHeader>
                <CardTitle>Voice Commands</CardTitle>
              </CardHeader>
              <CardContent>
                Set payment amounts using voice recognition for a hands-free experience.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              <QrCode className="h-4 w-4" />
              <p>ZapPay - Easy Payment Platform</p>
            </div>
            <p className="text-xs mt-1">Created by Muhammed Adnan</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Landing;