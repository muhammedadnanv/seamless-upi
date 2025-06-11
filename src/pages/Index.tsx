
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Package, QrCode, Share2, CreditCard, Palette } from 'lucide-react';
import Header from '@/components/Header';
import UpiIdManager from '@/components/UpiIdManager';
import ItemManager from '@/components/ItemManager';
import PaymentSummary from '@/components/PaymentSummary';
import QrCodeGenerator from '@/components/QrCodeGenerator';
import UpiGatewayGenerator from '@/components/UpiGatewayGenerator';
import ReferralSection from '@/components/ReferralSection';
import BrandingManager from '@/components/BrandingManager';
import MobileNavigation from '@/components/MobileNavigation';
import ResponsiveContainer from '@/components/ResponsiveContainer';
import { useResponsive } from '@/hooks/use-responsive';
import { useAppContext } from '@/context/AppContext';

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"upi" | "items" | "qr" | "referral" | "gateway" | "branding">("qr");
  const { activeUpiId } = useAppContext();
  const { isMobile } = useResponsive();

  const handleTabChange = (value: string) => {
    setActiveTab(value as "upi" | "items" | "qr" | "referral" | "gateway" | "branding");
  };

  const tabs = [
    { value: "upi", label: "UPI IDs", shortLabel: "UPI", icon: User },
    { value: "items", label: "Items", shortLabel: "Items", icon: Package },
    { value: "qr", label: "QR Code", shortLabel: "QR", icon: QrCode },
    { value: "gateway", label: "Gateway", shortLabel: "Gateway", icon: CreditCard },
    { value: "referral", label: "Referral", shortLabel: "Refer", icon: Share2 },
    { value: "branding", label: "Branding", shortLabel: "Theme", icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <Header />
      
      <ResponsiveContainer className="py-4 sm:py-6 lg:py-8">
        {/* Mobile-optimized header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                CodeCashier Dashboard
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Manage your UPI payments and generate QR codes effortlessly
              </p>
            </div>
            <MobileNavigation 
              activeTab={activeTab}
              onTabChange={handleTabChange}
              tabs={tabs}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          {/* Desktop/Tablet Navigation */}
          <TabsList className="hidden lg:grid w-full grid-cols-6 mb-6 sm:mb-8 h-auto p-1">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value} 
                className="flex items-center gap-2 py-3 px-4 text-sm font-medium transition-all"
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Mobile Navigation - Horizontal Scroll with proper TabsList */}
          <div className="lg:hidden mb-6 -mx-3 sm:-mx-4">
            <TabsList className="flex w-max gap-2 px-3 sm:px-4 pb-2 bg-transparent p-0 h-auto">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 whitespace-nowrap px-4 py-3 min-w-max text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.shortLabel}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="upi" className="mt-0">
            <UpiIdManager />
          </TabsContent>

          <TabsContent value="items" className="mt-0">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              <ItemManager />
              <PaymentSummary />
            </div>
          </TabsContent>

          <TabsContent value="qr" className="mt-0">
            <QrCodeGenerator />
          </TabsContent>

          <TabsContent value="gateway" className="mt-0">
            <UpiGatewayGenerator />
          </TabsContent>

          <TabsContent value="referral" className="mt-0">
            <ReferralSection />
          </TabsContent>

          <TabsContent value="branding" className="mt-0">
            <BrandingManager />
          </TabsContent>
        </Tabs>
      </ResponsiveContainer>

      {/* Mobile bottom padding for safe area */}
      <div className="h-safe-area-inset-bottom lg:hidden" />
    </div>
  );
};

export default Index;
