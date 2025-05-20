
import React from 'react';
import Header from '@/components/Header';
import UpiIdManager from '@/components/UpiIdManager';
import ItemManager from '@/components/ItemManager';
import QrCodeGenerator from '@/components/QrCodeGenerator';
import PaymentSummary from '@/components/PaymentSummary';
import TransactionHistory from '@/components/TransactionHistory';
import GmailIntegration from '@/components/GmailIntegration';
import { useAppContext } from '@/context/AppContext';

const MainContent = () => {
  const {
    isAdmin
  } = useAppContext();
  
  return (
    <div className="container max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-6">
      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        {isAdmin ? (
          <>
            <UpiIdManager />
            <ItemManager />
            <QrCodeGenerator />
            <GmailIntegration />
            <TransactionHistory />
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="md:order-2">
              <QrCodeGenerator />
            </div>
            <div className="md:order-1">
              <PaymentSummary />
              <div className="mt-3 sm:mt-4 md:mt-6">
                <GmailIntegration />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 overflow-x-hidden">
        <MainContent />
      </main>
      <footer className="border-t py-2 sm:py-3 md:py-4 dark:border-gray-800">
        <div className="container max-w-4xl mx-auto px-3 sm:px-4 text-center text-xs sm:text-sm text-muted-foreground">
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <p className="text-xs">CodeCashier by Muhammed Adnan</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
