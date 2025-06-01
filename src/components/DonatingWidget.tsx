
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Gift, Heart, Coffee, DollarSign, Sparkles } from 'lucide-react';
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
  theme?: 'modern' | 'classic' | 'minimal' | 'premium';
  icon?: 'gift' | 'heart' | 'coffee' | 'dollar' | 'sparkles';
  showPulse?: boolean;
  showGradient?: boolean;
}

const DonatingWidget: React.FC<DonatingWidgetProps> = ({
  upiId,
  name,
  amount = 199,
  purpose = 'Donation',
  primaryColor = '#8B5CF6',
  secondaryColor = '#F3F4F6',
  buttonText = 'Donate',
  title = 'Support Us',
  description = 'Scan this QR code to make a donation',
  thankYouMessage = 'Thank you for your support!',
  position = 'bottom-right',
  customStyle,
  customButtonStyle,
  theme = 'modern',
  icon = 'gift',
  showPulse = true,
  showGradient = true
}) => {
  const [showDonation, setShowDonation] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<number | string>(amount);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      width: 280,
      margin: 2,
      color: {
        dark: '#1a1a1a',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
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

  const getIcon = () => {
    const iconProps = { size: 18, className: "transition-transform duration-300 group-hover:scale-110" };
    switch (icon) {
      case 'heart': return <Heart {...iconProps} />;
      case 'coffee': return <Coffee {...iconProps} />;
      case 'dollar': return <DollarSign {...iconProps} />;
      case 'sparkles': return <Sparkles {...iconProps} />;
      default: return <Gift {...iconProps} />;
    }
  };

  const getThemeStyles = () => {
    const baseStyles = "group flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-medium";
    
    switch (theme) {
      case 'premium':
        return `${baseStyles} bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 text-white border border-purple-400/30 backdrop-blur-sm`;
      case 'minimal':
        return `${baseStyles} bg-white/90 hover:bg-white text-gray-800 border border-gray-200 backdrop-blur-sm`;
      case 'classic':
        return `${baseStyles} bg-blue-600 hover:bg-blue-700 text-white border border-blue-500`;
      default:
        return `${baseStyles} text-white`;
    }
  };

  const predefinedAmounts = [50, 100, 199, 500, 1000];

  return (
    <>
      {/* Floating Donation Button */}
      <div
        className={`fixed ${positionStyles[position]} z-50`}
        style={customStyle}
      >
        <Button
          onClick={() => setShowDonation(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`${getThemeStyles()} ${showPulse ? 'animate-pulse-soft' : ''}`}
          style={{
            backgroundColor: !showGradient && theme === 'modern' ? primaryColor : undefined,
            background: showGradient && theme === 'modern' ? `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` : undefined,
            ...customButtonStyle
          }}
        >
          {getIcon()}
          <span className="transition-all duration-300">
            {buttonText}
          </span>
          {isHovered && (
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          )}
        </Button>
      </div>

      {/* Premium Donation Dialog */}
      <Dialog open={showDonation} onOpenChange={setShowDonation}>
        <DialogContent className="max-w-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-0 shadow-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="flex items-center justify-center gap-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {getIcon()}
              {title}
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600 dark:text-gray-300">
              {description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center p-4 space-y-6">
            {/* QR Code with Premium Styling */}
            <div className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                {isGenerating ? (
                  <div className="w-70 h-70 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <div className="text-center space-y-2">
                      <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-gray-500 text-sm">Generating QR code...</p>
                    </div>
                  </div>
                ) : (
                  qrDataUrl ? (
                    <img src={qrDataUrl} alt="Donation QR Code" className="w-70 h-70 rounded-xl" />
                  ) : (
                    <div className="w-70 h-70 flex items-center justify-center bg-gray-100 rounded-xl">
                      <p className="text-gray-500">QR code will appear here</p>
                    </div>
                  )
                )}
              </div>
              <div className="absolute -top-2 -right-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  Secure UPI
                </Badge>
              </div>
            </div>
            
            {/* Premium Amount Selection */}
            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Amount (₹)
                </Label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {predefinedAmounts.map((amt) => (
                    <Button
                      key={amt}
                      variant={customAmount == amt ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCustomAmount(amt)}
                      className="text-xs transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: customAmount == amt ? primaryColor : undefined,
                        borderColor: primaryColor + '40'
                      }}
                    >
                      ₹{amt}
                    </Button>
                  ))}
                </div>
                <Input
                  id="amount"
                  type="number"
                  value={customAmount}
                  onChange={handleAmountChange}
                  onBlur={generateQRCode}
                  className="text-right text-lg font-semibold border-2 focus:border-purple-400 transition-colors"
                  min="1"
                  placeholder="Enter custom amount"
                />
              </div>
              
              {/* Premium Info Cards */}
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="font-medium text-blue-800 dark:text-blue-300 text-sm">Payment Details</p>
                  </div>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">
                    <strong>UPI ID:</strong> {upiId}
                  </p>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">
                    <strong>Recipient:</strong> {name}
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200/50 text-center">
                  <p className="text-green-700 dark:text-green-400 text-sm font-medium">
                    {thankYouMessage}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Heart size={12} className="text-red-500 animate-pulse" />
                    <span className="text-xs text-green-600 dark:text-green-500">Secure • Instant • Trusted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DonatingWidget;
