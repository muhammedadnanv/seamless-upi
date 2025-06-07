import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Package, QrCode, History, Share2, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import UpiIdManager from '@/components/UpiIdManager';
import ItemManager from '@/components/ItemManager';
import PaymentSummary from '@/components/PaymentSummary';
import QrCodeGenerator from '@/components/QrCodeGenerator';
import UpiGatewayGenerator from '@/components/UpiGatewayGenerator';
import TransactionHistory from '@/components/TransactionHistory';
import ReferralSection from '@/components/ReferralSection';

import { useAppContext } from '@/context/AppContext';

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"upi" | "items" | "qr" | "transactions" | "referral" | "gateway">("qr");
  const { activeUpiId } = useAppContext();

  const handleTabChange = (value: string) => {
    setActiveTab(value as "upi" | "items" | "qr" | "transactions" | "referral" | "gateway");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            CodeCashier Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your UPI payments and generate QR codes effortlessly
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8">
            <TabsTrigger value="upi" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">UPI IDs</span>
              <span className="sm:hidden">UPI</span>
            </TabsTrigger>
            <TabsTrigger value="items" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Items</span>
              <span className="sm:hidden">Items</span>
            </TabsTrigger>
            <TabsTrigger value="qr" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              <span className="hidden sm:inline">QR Code</span>
              <span className="sm:hidden">QR</span>
            </TabsTrigger>
            <TabsTrigger value="gateway" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Gateway</span>
              <span className="sm:hidden">Gateway</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
              <span className="sm:hidden">History</span>
            </TabsTrigger>
            <TabsTrigger value="referral" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Referral</span>
              <span className="sm:hidden">Refer</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upi">
            <UpiIdManager />
          </TabsContent>

          <TabsContent value="items">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ItemManager />
              <PaymentSummary />
            </div>
          </TabsContent>

          <TabsContent value="qr">
            <QrCodeGenerator />
          </TabsContent>

          <TabsContent value="gateway">
            <UpiGatewayGenerator />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="referral">
            <ReferralSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
