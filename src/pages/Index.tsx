
import React from 'react';
import { AppProvider } from '@/context/AppContext';
import Header from '@/components/Header';
import UpiIdManager from '@/components/UpiIdManager';
import ItemManager from '@/components/ItemManager';
import QrCodeGenerator from '@/components/QrCodeGenerator';
import PaymentSummary from '@/components/PaymentSummary';
import TransactionHistory from '@/components/TransactionHistory';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/context/AppContext';
import { Phone } from 'lucide-react';

const MainContent = () => {
  const { isAdmin } = useAppContext();

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6">
      <div className="space-y-6">
        {isAdmin ? (
          <>
            <UpiIdManager />
            <ItemManager />
            <QrCodeGenerator />
            <TransactionHistory />
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:order-2">
              <QrCodeGenerator />
            </div>
            <div className="md:order-1">
              <PaymentSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <MainContent />
        </main>
        <footer className="border-t py-4">
          <div className="container max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
            <div className="flex flex-col items-center gap-2">
              <p>© {new Date().getFullYear()} PayEase – Secure and fast UPI payments</p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact: +91 9656778508
              </p>
              <p className="text-xs mt-1">Build a similar platform for your business at an affordable price</p>
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
};

export default Index;
