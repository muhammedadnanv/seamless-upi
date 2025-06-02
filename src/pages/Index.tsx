
import React from 'react';
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
import { Linkedin, Shield, Zap, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MainContent = () => {
  const { isAdmin } = useAppContext();
  const { userData } = useAuth();
  
  const isOwner = userData?.role === 'owner';
  const isManager = userData?.role === 'manager';
  const isCashier = userData?.role === 'cashier';
  const isViewer = userData?.role === 'viewer';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 sm:w-96 sm:h-96 bg-pink-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 relative z-10">
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {isAdmin ? (
            <>
              {/* Admin Dashboard Header */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full border border-purple-200 dark:border-purple-700 mb-3 sm:mb-4">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                  <span className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-300">Admin Dashboard</span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent px-4">
                  Welcome to CodeCashier Pro
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 px-4">Manage your payment system with advanced controls</p>
              </div>

              {/* Admin Grid Layout - Responsive */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                {/* Main Management Column */}
                <div className="xl:col-span-2 space-y-4 sm:space-y-6">
                  {(isOwner || isManager) && (
                    <Card className="border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl">
                      <UpiIdManager />
                    </Card>
                  )}
                  
                  {(isOwner || isManager) && (
                    <Card className="border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl">
                      <ItemManager />
                    </Card>
                  )}
                  
                  {isOwner && (
                    <Card className="border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl">
                      <UserManagement />
                    </Card>
                  )}
                </div>

                {/* Side Panel */}
                <div className="space-y-4 sm:space-y-6">
                  <Card className="border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl">
                    <QrCodeGenerator />
                  </Card>
                  
                  {(isOwner || isManager) && (
                    <Card className="border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl">
                      <GmailIntegration />
                    </Card>
                  )}
                </div>
              </div>

              {/* Full Width Transaction History */}
              <Card className="border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl">
                <TransactionHistory />
              </Card>
            </>
          ) : (
            <>
              {/* User Dashboard Header */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full border border-blue-200 dark:border-blue-700 mb-3 sm:mb-4">
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                  <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">Quick Access</span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent px-4">
                  Payment Dashboard
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 px-4">Generate QR codes and manage payments efficiently</p>
              </div>

              {/* User Dashboard Grid - Mobile-First Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* QR Code Section - Full width on mobile, right side on desktop */}
                <div className="lg:order-2 space-y-4 sm:space-y-6">
                  {!isViewer ? (
                    <Card className="border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                      <QrCodeGenerator />
                    </Card>
                  ) : (
                    <Card className="border-0 bg-gray-50/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl">
                      <CardContent className="p-6 sm:p-8 text-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                          <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">View-Only Access</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          QR code generation is not available for your current role.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                {/* Summary and Integration Section - Full width on mobile, left side on desktop */}
                <div className="lg:order-1 space-y-4 sm:space-y-6">
                  <Card className="border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                    <PaymentSummary />
                  </Card>
                  
                  {!isViewer ? (
                    <Card className="border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                      <GmailIntegration />
                    </Card>
                  ) : (
                    <Card className="border-0 bg-gray-50/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl">
                      <CardContent className="p-6 sm:p-8 text-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                          <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">View-Only Access</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Email integration is not available for your current role.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-x-hidden">
        <MainContent />
      </main>
      <footer className="border-t border-white/20 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 py-3 sm:py-4 lg:py-6">
        <div className="container max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-200 text-xs">
                <Star size={10} className="mr-1" />
                Premium Platform
              </Badge>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <span>CodeCashier by Muhammed Adnan</span>
                <a 
                  href="https://www.linkedin.com/in/muhammedadnanvv/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={14} />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-400">
              <span>© 2024 CodeCashier</span>
              <span className="hidden sm:inline">•</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
