
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Gift } from 'lucide-react';
import QRCode from 'qrcode';

export interface DonatingWidgetProps {
  upiId: string;
  name: string;
  amount?: number;
  purpose?: string;
  primaryColor?: string;
  secondaryColor?: string;
  buttonText?: string;
  title?: string;
  description?: string;
  thankYouMessage?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  customStyle?: React.CSSProperties;
  customButtonStyle?: React.CSSProperties;
}

const DonatingWidget: React.FC<DonatingWidgetProps> = ({
  upiId,
  name,
  amount = 199,
  purpose = 'Donation',
  primaryColor = '#8B5CF6', // Purple default
  secondaryColor = '#F3F4F6', // Light gray
  buttonText = 'Donate',
  title = 'Support Us',
  description = 'Scan this QR code to make a donation',
  thankYouMessage = 'Thank you for your support!',
  position = 'bottom-right',
  customStyle,
  customButtonStyle
}) => {
  const [showDonation, setShowDonation] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<number | string>(amount);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate QR code when dialog opens or customAmount changes
  useEffect(() => {
    if (showDonation) {
      generateQRCode();
    }
  }, [showDonation, customAmount]);

  const generateQRCode = () => {
    if (!upiId) return;
    
    setIsGenerating(true);
    
    // Create the UPI URL for donation
    const baseUrl = 'upi://pay';
    const params = new URLSearchParams();
    params.append('pa', upiId);
    params.append('pn', name);
    params.append('am', customAmount.toString());
    params.append('tn', purpose);
    const fullUrl = `${baseUrl}?${params.toString()}`;

    // Generate QR code
    QRCode.toDataURL(fullUrl, {
      width: 256,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    }).then(url => {
      setQrDataUrl(url);
      setIsGenerating(false);
    }).catch(err => {
      console.error('Error generating donation QR code:', err);
      setIsGenerating(false);
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };

  const positionStyles = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  return (
    <>
      {/* Floating Donation Button */}
      <div
        className={`fixed ${positionStyles[position]} z-50`}
        style={customStyle}
      >
        <Button
          onClick={() => setShowDonation(true)}
          className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
          style={{
            backgroundColor: primaryColor,
            color: 'white',
            ...customButtonStyle
          }}
        >
          <Gift size={16} />
          {buttonText}
        </Button>
      </div>

      {/* Donation Dialog */}
      <Dialog open={showDonation} onOpenChange={setShowDonation}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" style={{ color: primaryColor }} />
              {title}
            </DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              {isGenerating ? (
                <div className="w-60 h-60 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-muted-foreground">Generating QR code...</p>
                </div>
              ) : (
                qrDataUrl ? (
                  <img src={qrDataUrl} alt="Donation QR Code" className="w-60 h-60" />
                ) : (
                  <div className="w-60 h-60 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-muted-foreground">QR code will appear here</p>
                  </div>
                )
              )}
            </div>
            
            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={customAmount}
                  onChange={handleAmountChange}
                  onBlur={generateQRCode}
                  className="text-right"
                  min="1"
                />
              </div>
              
              <div className="text-center space-y-1">
                <p className="font-medium">UPI ID: {upiId}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {thankYouMessage}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DonatingWidget;
