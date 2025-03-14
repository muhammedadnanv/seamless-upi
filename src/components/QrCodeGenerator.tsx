
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Download, Share2 } from 'lucide-react';
import QRCode from 'qrcode';

const QrCodeGenerator: React.FC = () => {
  const { activeUpiId, items, totalAmount } = useAppContext();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [upiUrl, setUpiUrl] = useState<string>('');

  useEffect(() => {
    if (!activeUpiId) return;
    
    // Create the UPI URL
    const baseUrl = 'upi://pay';
    const params = new URLSearchParams();
    params.append('pa', activeUpiId.upiId); // UPI ID
    params.append('pn', activeUpiId.name); // Payee name
    
    if (totalAmount > 0) {
      params.append('am', totalAmount.toString()); // Amount
    }
    
    // Create a description from items if available
    if (items.length > 0) {
      const itemDescriptions = items.map(item => `${item.quantity}x ${item.name}`);
      params.append('tn', itemDescriptions.join(', ')); // Transaction note
    } else {
      params.append('tn', 'Payment'); // Default transaction note
    }
    
    const fullUrl = `${baseUrl}?${params.toString()}`;
    setUpiUrl(fullUrl);
    
    // Generate QR code
    QRCode.toDataURL(fullUrl, {
      width: 256,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })
    .then(url => {
      setQrDataUrl(url);
    })
    .catch(err => {
      console.error('Error generating QR code:', err);
    });
  }, [activeUpiId, items, totalAmount]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'UPI Payment',
          text: `Pay ₹${totalAmount.toFixed(2)} to ${activeUpiId?.name}`,
          url: upiUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(upiUrl);
      alert('Payment link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `upi-payment-qr-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!activeUpiId) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-upi-blue" />
            QR Code Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-center text-muted-foreground mb-4">
            Please add a UPI ID to generate a QR code
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5 text-upi-blue" />
          QR Code Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <div className="qr-container mb-4 p-6 bg-white rounded-xl shadow-md">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="UPI QR Code" className="w-48 h-48" />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-muted-foreground">Generating QR code...</p>
            </div>
          )}
        </div>
        
        <div className="space-y-2 w-full">
          <div className="text-center">
            <h3 className="font-medium">Scan to Pay ₹{totalAmount.toFixed(2)}</h3>
            <p className="text-sm text-muted-foreground">{activeUpiId.upiId}</p>
          </div>
          
          <div className="flex justify-center space-x-2 mt-4">
            <Button 
              variant="outline" 
              onClick={handleDownload}
              className="flex items-center gap-1"
              disabled={!qrDataUrl}
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button 
              onClick={handleShare}
              className="flex items-center gap-1"
              disabled={!qrDataUrl}
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QrCodeGenerator;
