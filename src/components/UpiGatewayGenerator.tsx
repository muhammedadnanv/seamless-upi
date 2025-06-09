
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Eye, Code, CreditCard, Check, QrCode } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import QRCode from 'qrcode';

const UpiGatewayGenerator: React.FC = () => {
  const [upiId, setUpiId] = useState('');
  const [payeeName, setPayeeName] = useState('');
  const [amount, setAmount] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [embedCode, setEmbedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePaymentGateway = async () => {
    if (!upiId || !payeeName || !amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to generate the payment gateway",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const encodedPayeeName = encodeURIComponent(payeeName);
      const upiDeepLink = `upi://pay?pa=${upiId}&pn=${encodedPayeeName}&am=${amount}&cu=INR`;
      
      // Generate QR code as base64 data URL
      const qrDataUrl = await QRCode.toDataURL(upiDeepLink, {
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      const htmlCode = `<div style="max-width: 400px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff;">
  <style>
    @media (max-width: 480px) {
      .upi-gateway-container {
        max-width: 100% !important;
        margin: 0 !important;
        border-radius: 8px !important;
        padding: 16px !important;
      }
      .upi-gateway-title {
        font-size: 18px !important;
      }
      .upi-gateway-details {
        font-size: 13px !important;
      }
      .upi-gateway-button {
        padding: 14px 0 !important;
        font-size: 15px !important;
      }
      .upi-gateway-qr {
        width: 160px !important;
        height: 160px !important;
      }
      .upi-gateway-note {
        font-size: 11px !important;
      }
    }
  </style>
  <div class="upi-gateway-container">
    <h3 style="margin: 0 0 16px 0; color: #1f2937; font-size: 20px; font-weight: 600; text-align: center;" class="upi-gateway-title">Pay with UPI</h3>
    
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${qrDataUrl}" alt="UPI Payment QR Code" style="width: 200px; height: 200px; border: 2px solid #f3f4f6; border-radius: 8px; display: block; margin: 0 auto;" class="upi-gateway-qr">
      <p style="margin: 12px 0 0 0; font-size: 12px; color: #6b7280; font-weight: 500;">Scan with any UPI app</p>
    </div>

    <div style="background: #f9fafb; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
      <p style="margin: 4px 0; font-size: 14px; color: #374151;" class="upi-gateway-details"><strong>UPI ID:</strong> ${upiId}</p>
      <p style="margin: 4px 0; font-size: 14px; color: #374151;" class="upi-gateway-details"><strong>Payee:</strong> ${payeeName}</p>
      <p style="margin: 4px 0; font-size: 14px; color: #374151;" class="upi-gateway-details"><strong>Amount:</strong> ₹${amount}</p>
    </div>

    <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; text-align: center;">
      <p style="margin: 0 0 12px 0; font-size: 13px; color: #6b7280;">Or click to pay directly</p>
      <a href="${upiDeepLink}" style="text-decoration: none; display: block;">
        <button style="width: 100%; padding: 16px 0; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; font-size: 16px; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);" class="upi-gateway-button" onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(16, 185, 129, 0.3)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(16, 185, 129, 0.2)'">
          💳 Pay ₹${amount} via UPI
        </button>
      </a>
    </div>

    <p style="margin: 16px 0 0 0; font-size: 11px; color: #9ca3af; text-align: center; line-height: 1.4;" class="upi-gateway-note">Supports PhonePe, Google Pay, Paytm, BHIM & all UPI apps<br>Secure payment powered by UPI</p>
  </div>
</div>`;

      setEmbedCode(htmlCode);
      setShowPreview(true);
      
      toast({
        title: "Payment Gateway Generated",
        description: "Your embeddable payment interface with QR code is ready!"
      });
    } catch (error) {
      console.error('Error generating payment gateway:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate payment gateway. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      toast({
        title: "Copied to Clipboard",
        description: "Embed code copied! You can now paste it into your website."
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please select and copy the code manually",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setUpiId('');
    setPayeeName('');
    setAmount('');
    setShowPreview(false);
    setEmbedCode('');
    setCopied(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 sm:space-y-6 px-3 sm:px-4">
      <Card className="mobile-card">
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center gap-2 mobile-title text-lg sm:text-xl lg:text-2xl">
            <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-upi-blue" />
            UPI Payment Gateway Generator
          </CardTitle>
          <p className="mobile-body text-muted-foreground">
            Create embeddable payment interfaces with QR codes for your website
          </p>
        </CardHeader>
        <CardContent className="mobile-space-y">
          <div className="mobile-form">
            <div className="mobile-form-row">
              <div className="mobile-form-group flex-1">
                <Label htmlFor="upiId" className="mobile-body">UPI ID</Label>
                <Input
                  id="upiId"
                  type="text"
                  placeholder="example@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="modern-input"
                />
              </div>
              
              <div className="mobile-form-group flex-1">
                <Label htmlFor="payeeName" className="mobile-body">Payee Name</Label>
                <Input
                  id="payeeName"
                  type="text"
                  placeholder="Your Business Name"
                  value={payeeName}
                  onChange={(e) => setPayeeName(e.target.value)}
                  className="modern-input"
                />
              </div>
            </div>
            
            <div className="mobile-form-group">
              <Label htmlFor="amount" className="mobile-body">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                step="0.01"
                className="modern-input"
              />
            </div>
            
            <div className="mobile-flex gap-2 sm:gap-3">
              <Button 
                onClick={generatePaymentGateway} 
                className="mobile-button flex-1"
                disabled={isGenerating}
              >
                <Code className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Gateway'}
              </Button>
              
              {showPreview && (
                <Button 
                  variant="outline" 
                  onClick={() => setShowPreview(!showPreview)}
                  className="mobile-button"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {showPreview ? 'Hide' : 'Show'}
                </Button>
              )}
              
              {embedCode && (
                <Button 
                  variant="outline" 
                  onClick={resetForm}
                  className="mobile-button"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Preview */}
      {showPreview && embedCode && (
        <Card className="mobile-card">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 mobile-subtitle">
              <Eye className="h-5 w-5 text-green-600" />
              Live Preview
            </CardTitle>
            <p className="mobile-body text-muted-foreground">
              This is how your payment gateway will look on websites
            </p>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 lg:p-6 rounded-lg overflow-x-auto">
              <div 
                dangerouslySetInnerHTML={{ __html: embedCode }}
                className="min-w-0"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Embed Code */}
      {embedCode && (
        <Card className="mobile-card">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 mobile-subtitle">
              <Code className="h-5 w-5 text-purple-600" />
              Embed Code
            </CardTitle>
            <p className="mobile-body text-muted-foreground">
              Copy this code and paste it into your website's HTML
            </p>
          </CardHeader>
          <CardContent className="mobile-space-y">
            <div className="relative">
              <Textarea
                value={embedCode}
                readOnly
                className="min-h-[200px] sm:min-h-[250px] font-mono text-xs sm:text-sm bg-gray-50 dark:bg-gray-900 resize-none"
              />
              <Button
                size="sm"
                onClick={copyToClipboard}
                className="absolute top-2 right-2 mobile-button"
                variant={copied ? "default" : "outline"}
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 mobile-body">
                How to use:
              </h4>
              <ul className="mobile-caption text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Copy the HTML code above</li>
                <li>• Paste it into your website where you want the payment interface</li>
                <li>• Users can scan the QR code or click the button to pay</li>
                <li>• Fully responsive - works on mobile, tablet, and desktop</li>
                <li>• Compatible with all UPI apps (PhonePe, Google Pay, Paytm, BHIM, etc.)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UpiGatewayGenerator;
