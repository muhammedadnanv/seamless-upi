
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, Copy, MessageCircle, Mail, Users, Gift, CheckCircle } from 'lucide-react';
import { useNotificationTriggers } from '@/hooks/useNotificationTriggers';

const ReferralSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { notifySuccess } = useNotificationTriggers();

  const referralMessage = "Hey! I've been using CodeCashier to manage my UPI payments and generate QR codes effortlessly. Thought it might help your business too — check it out here: https://codecashier.vercel.app/";
  
  const shareUrl = "https://codecashier.vercel.app/";

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(referralMessage);
      setCopied(true);
      notifySuccess('Copied!', 'Referral message copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(referralMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailShare = () => {
    const subject = "Check out CodeCashier - Free UPI QR Code Generator";
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(referralMessage)}`;
    window.open(emailUrl);
  };

  const handleGenericShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CodeCashier - Free UPI QR Code Generator',
          text: referralMessage,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      handleCopyMessage();
    }
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm shadow-xl">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
            <Gift size={12} className="mr-1" />
            Spread the Word
          </Badge>
        </div>
        <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Refer CodeCashier to Friends
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Help your business friends discover the easiest way to accept UPI payments
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Predefined Message Display */}
        <div className="relative">
          <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-blue-200/50 dark:border-blue-700/50">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              "{referralMessage}"
            </p>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <MessageCircle size={12} className="text-white" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick={handleCopyMessage}
              variant="outline"
              className="flex items-center justify-center gap-2 h-12 bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 border-blue-200 hover:border-blue-300 transition-all duration-300"
            >
              {copied ? (
                <>
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-green-600 dark:text-green-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy Message</span>
                </>
              )}
            </Button>

            <Button
              onClick={handleGenericShare}
              className="flex items-center justify-center gap-2 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Share2 size={16} />
              <span>Share Now</span>
            </Button>
          </div>

          {/* Platform-specific sharing */}
          <div className="space-y-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Or share directly on:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleWhatsAppShare}
                variant="outline"
                size="sm"
                className="flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 border-green-200 text-green-700 dark:text-green-400"
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </Button>

              <Button
                onClick={handleEmailShare}
                variant="outline"
                size="sm"
                className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 border-blue-200 text-blue-700 dark:text-blue-400"
              >
                <Mail size={14} />
                <span>Email</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
            Why your friends will love CodeCashier:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>100% Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Instant QR generation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Works with all UPI apps</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>No registration required</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralSection;
