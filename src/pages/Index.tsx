
import React from 'react';
import { AppProvider } from '@/context/AppContext';
import Header from '@/components/Header';
import UpiIdManager from '@/components/UpiIdManager';
import ItemManager from '@/components/ItemManager';
import QrCodeGenerator from '@/components/QrCodeGenerator';
import PaymentSummary from '@/components/PaymentSummary';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/context/AppContext';

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
            <p>© {new Date().getFullYear()} Seamless UPI – Secure and fast UPI payments</p>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
};

export default Index;
