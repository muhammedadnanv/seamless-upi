
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Eye, Code, CreditCard, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const UpiGatewayGenerator: React.FC = () => {
  const [upiId, setUpiId] = useState('');
  const [payeeName, setPayeeName] = useState('');
  const [amount, setAmount] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [embedCode, setEmbedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const generateEmbedCode = () => {
    if (!upiId || !payeeName || !amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to generate the payment gateway",
        variant: "destructive"
      });
      return;
    }

    const encodedPayeeName = encodeURIComponent(payeeName);
    const upiDeepLink = `upi://pay?pa=${upiId}&pn=${encodedPayeeName}&am=${amount}&cu=INR`;
    
    const htmlCode = `<div style="max-width:400px; margin:auto; border:1px solid #e0e0e0; border-radius:8px; padding:20px; box-shadow:0 2px 10px rgba(0,0,0,0.05); font-family:sans-serif;">
  <h3 style="margin-top:0; color:#333;">Pay with UPI</h3>
  <p style="margin:10px 0; font-size:14px; color:#555;">UPI ID: <strong>${upiId}</strong></p>
  <p style="margin:10px 0; font-size:14px; color:#555;">Payee: <strong>${payeeName}</strong></p>
  <p style="margin:10px 0; font-size:14px; color:#555;">Amount: <strong>₹${amount}</strong></p>
  <a href="${upiDeepLink}" style="text-decoration:none;">
    <button style="width:100%; padding:12px 0; background:#4CAF50; color:white; font-size:16px; border:none; border-radius:5px; cursor:pointer; transition:background 0.3s;">
      Pay ₹${amount} via UPI
    </button>
  </a>
  <p style="margin:15px 0 0 0; font-size:12px; color:#888; text-align:center;">Supports PhonePe, Google Pay, Paytm & all UPI apps</p>
</div>`;

    setEmbedCode(htmlCode);
    setShowPreview(true);
    
    toast({
      title: "Payment Gateway Generated",
      description: "Your embeddable payment interface is ready!"
    });
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-upi-blue" />
            UPI Payment Gateway Generator
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Create embeddable payment interfaces for your website with UPI deep links
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                type="text"
                placeholder="example@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payeeName">Payee Name</Label>
              <Input
                id="payeeName"
                type="text"
                placeholder="Your Business Name"
                value={payeeName}
                onChange={(e) => setPayeeName(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              step="0.01"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={generateEmbedCode} className="flex-1">
              <Code className="h-4 w-4 mr-2" />
              Generate Payment Gateway
            </Button>
            
            {showPreview && (
              <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
            )}
            
            {embedCode && (
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Live Preview */}
      {showPreview && embedCode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              Live Preview
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              This is how your payment gateway will look on websites
            </p>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <div 
                dangerouslySetInnerHTML={{ __html: embedCode }}
                className="[&_button]:hover:bg-green-600"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Embed Code */}
      {embedCode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-purple-600" />
              Embed Code
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Copy this code and paste it into your website's HTML
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Textarea
                value={embedCode}
                readOnly
                className="min-h-[200px] font-mono text-xs bg-gray-50 dark:bg-gray-900"
              />
              <Button
                size="sm"
                onClick={copyToClipboard}
                className="absolute top-2 right-2"
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
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                How to use:
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Copy the HTML code above</li>
                <li>• Paste it into your website where you want the payment button</li>
                <li>• The button will work on mobile devices and open UPI apps directly</li>
                <li>• Compatible with PhonePe, Google Pay, Paytm, and all UPI apps</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UpiGatewayGenerator;
