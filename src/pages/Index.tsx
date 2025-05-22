import React, { useEffect } from 'react';
import Header from '@/components/Header';
import UpiIdManager from '@/components/UpiIdManager';
import ItemManager from '@/components/ItemManager';
import QrCodeGenerator from '@/components/QrCodeGenerator';
import PaymentSummary from '@/components/PaymentSummary';
import TransactionHistory from '@/components/TransactionHistory';
import GmailIntegration from '@/components/GmailIntegration';
import UserManagement from '@/components/UserManagement';
import { useAppContext } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { Linkedin } from 'lucide-react';

const MainContent = () => {
  const { isAdmin } = useAppContext();
  const { userData } = useAuth();
  
  const isOwner = userData?.role === 'owner';
  const isManager = userData?.role === 'manager';
  const isCashier = userData?.role === 'cashier';
  const isViewer = userData?.role === 'viewer';
  
  return (
    <div className="container max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-6">
      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        {isAdmin ? (
          <>
            {/* Only owners and managers can manage UPI IDs */}
            {(isOwner || isManager) && <UpiIdManager />}
            
            {/* Only owners and managers can manage items */}
            {(isOwner || isManager) && <ItemManager />}
            
            {/* Only owners can manage users */}
            {isOwner && <UserManagement />}
            
            {/* Everyone can generate QR codes */}
            <QrCodeGenerator />
            
            {/* Only owners and managers can access Gmail integration */}
            {(isOwner || isManager) && <GmailIntegration />}
            
            {/* Everyone can view transaction history */}
            <TransactionHistory />
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="md:order-2">
              {/* All roles except view-only can generate QR codes */}
              {!isViewer ? (
                <QrCodeGenerator />
              ) : (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                  <p className="text-muted-foreground">
                    View-only access. QR code generation is not available.
                  </p>
                </div>
              )}
            </div>
            <div className="md:order-1">
              {/* Everyone can see payment summary */}
              <PaymentSummary />
              <div className="mt-3 sm:mt-4 md:mt-6">
                {/* Only non-viewers can access Gmail integration */}
                {!isViewer ? (
                  <GmailIntegration />
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                    <p className="text-muted-foreground">
                      View-only access. Email integration is not available.
                    </p>
                  </div>
                )}
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
            <div className="flex items-center gap-2">
              <p className="text-xs">CodeCashier by Muhammed Adnan</p>
              <a 
                href="https://www.linkedin.com/in/muhammedadnanvv/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
