import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QrCode, Download, Share2, CheckCircle, Mic } from 'lucide-react';
import QRCode from 'qrcode';
import { toast } from "@/components/ui/use-toast";
const QrCodeGenerator: React.FC = () => {
  const {
    activeUpiId,
    items,
    totalAmount,
    addTransaction,
    setTotalAmount
  } = useAppContext();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [upiUrl, setUpiUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  useEffect(() => {
    // Initialize speech recognition if supported
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = event => {
        const speechResult = event.results[0][0].transcript;

        // Try to extract the number from the speech
        const numberMatch = speechResult.match(/\d+(\.\d+)?/);
        if (numberMatch) {
          const amount = parseFloat(numberMatch[0]);
          if (!isNaN(amount)) {
            setCustomAmount(amount.toString());
            updateTotalAmount(amount);
            toast({
              title: "Voice Input Recognized",
              description: `Amount set to ₹${amount}`
            });
          } else {
            toast({
              title: "Voice Input Error",
              description: "Could not recognize a valid amount",
              variant: "destructive"
            });
          }
        } else {
          toast({
            title: "Voice Input Error",
            description: "No number detected in your speech",
            variant: "destructive"
          });
        }
        setIsListening(false);
      };
      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "There was an error with voice recognition",
          variant: "destructive"
        });
      };
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);
  useEffect(() => {
    if (!activeUpiId) return;

    // Calculate the amount based on custom amount or items
    const amountToUse = showCustomAmount && customAmount ? parseFloat(customAmount) : totalAmount;

    // Create the UPI URL
    const baseUrl = 'upi://pay';
    const params = new URLSearchParams();
    params.append('pa', activeUpiId.upiId); // UPI ID
    params.append('pn', activeUpiId.name); // Payee name

    if (amountToUse > 0) {
      params.append('am', amountToUse.toString()); // Amount
    }

    // Create a description from items if available
    if (items.length > 0 && !showCustomAmount) {
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
    }).then(url => {
      setQrDataUrl(url);
    }).catch(err => {
      console.error('Error generating QR code:', err);
    });
  }, [activeUpiId, items, totalAmount, customAmount, showCustomAmount]);
  const startVoiceRecognition = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive"
      });
      return;
    }
    try {
      recognitionRef.current.start();
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Speak the amount you want to pay"
      });
    } catch (error) {
      console.error("Error starting voice recognition:", error);
      toast({
        title: "Error",
        description: "Could not start voice recognition",
        variant: "destructive"
      });
      setIsListening(false);
    }
  };
  const updateTotalAmount = (amount: number) => {
    setShowCustomAmount(true);
    setCustomAmount(amount.toString());
  };
  const resetToItemsAmount = () => {
    setShowCustomAmount(false);
    setCustomAmount('');
  };
  const handleManualAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      setShowCustomAmount(true);
    } else {
      setShowCustomAmount(false);
    }
  };
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
      toast({
        title: "Link Copied",
        description: "Payment link copied to clipboard!"
      });
    }
  };
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `upi-payment-qr-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "QR Code Downloaded",
      description: "The payment QR code has been downloaded successfully."
    });
  };
  const simulatePayment = () => {
    if (showCustomAmount && (!customAmount || parseFloat(customAmount) <= 0) || !showCustomAmount && (items.length === 0 || totalAmount <= 0)) {
      toast({
        title: "Cannot Process Payment",
        description: "Please add items or specify a valid amount before processing payment",
        variant: "destructive"
      });
      return;
    }
    setIsProcessing(true);

    // Generate a random reference number
    const reference = `UPI${Math.floor(100000 + Math.random() * 900000)}`;

    // Create a new transaction
    const newTransaction = {
      amount: showCustomAmount && customAmount ? parseFloat(customAmount) : totalAmount,
      status: 'pending' as const,
      items: showCustomAmount ? [] : [...items],
      upiId: activeUpiId?.upiId || '',
      timestamp: new Date(),
      reference: reference
    };

    // Simulate payment processing with a delay
    setTimeout(() => {
      addTransaction(newTransaction);
      toast({
        title: "Payment Initiated",
        description: `Transaction reference: ${reference}`
      });

      // 80% chance of success for demo purposes
      setTimeout(() => {
        const success = Math.random() < 0.8;
        if (success) {
          toast({
            title: "Payment Successful",
            description: "The transaction has been completed successfully!",
            variant: "default"
          });
        } else {
          toast({
            title: "Payment Failed",
            description: "The transaction could not be completed. Please try again.",
            variant: "destructive"
          });
        }
        setIsProcessing(false);
      }, 2000);
    }, 1500);
  };
  if (!activeUpiId) {
    return <Card className="w-full">
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
      </Card>;
  }
  return <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5 text-upi-blue" />
          QR Code Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <div className="qr-container mb-4 p-6 bg-white rounded-xl shadow-md">
          {qrDataUrl ? <img src={qrDataUrl} alt="UPI QR Code" className="w-48 h-48" /> : <div className="w-48 h-48 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-muted-foreground">Generating QR code...</p>
            </div>}
        </div>
        
        <div className="space-y-2 w-full">
          <div className="text-center">
            <h3 className="font-medium">
              Scan to Pay ₹{showCustomAmount && customAmount ? parseFloat(customAmount).toFixed(2) : totalAmount.toFixed(2)}
            </h3>
            <p className="text-sm text-muted-foreground">{activeUpiId.upiId}</p>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <Input type="number" placeholder="Custom amount" value={customAmount} onChange={handleManualAmountChange} className="text-right" />
              <Button variant="outline" size="icon" onClick={startVoiceRecognition} disabled={isListening} className={isListening ? "bg-red-100" : ""}>
                <Mic className={`h-4 w-4 ${isListening ? "text-red-500 animate-pulse" : ""}`} />
              </Button>
            </div>
            
            {showCustomAmount && <Button variant="ghost" size="sm" onClick={resetToItemsAmount} className="w-full text-xs">
                Reset to items total (₹{totalAmount.toFixed(2)})
              </Button>}
          </div>
          
          <div className="flex justify-center space-x-2 mt-4">
            <Button variant="outline" onClick={handleDownload} className="flex items-center gap-1" disabled={!qrDataUrl || isProcessing}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button onClick={handleShare} className="flex items-center gap-1" disabled={!qrDataUrl || isProcessing}>
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
          
          {/* Demo payment button - For demonstration purposes only */}
          <div className="mt-6">
            
            <p className="text-xs text-center text-muted-foreground mt-2">
              This button simulates a payment for demonstration purposes
            </p>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default QrCodeGenerator;