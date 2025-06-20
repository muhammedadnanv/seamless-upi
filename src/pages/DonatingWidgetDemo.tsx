import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import DonatingWidget from '@/components/DonatingWidget';
import { Code, Copy, Download, Eye, Settings, Sparkles, Heart, Coffee, Gift, DollarSign, Palette, Layout, Zap } from 'lucide-react';

const DonatingWidgetDemo = () => {
  // User's configurable UPI settings (for their widget generation)
  const [upiId, setUpiId] = useState('your-upi@provider');
  const [name, setName] = useState('Your Business Name');
  const [amount, setAmount] = useState(199);
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right');
  const [primaryColor, setPrimaryColor] = useState('#8B5CF6');
  const [buttonText, setButtonText] = useState('Donate');
  const [theme, setTheme] = useState<'modern' | 'classic' | 'minimal' | 'premium'>('modern');
  const [icon, setIcon] = useState<'gift' | 'heart' | 'coffee' | 'dollar' | 'sparkles'>('gift');
  const [showPulse, setShowPulse] = useState(true);
  const [showGradient, setShowGradient] = useState(true);
  const [title, setTitle] = useState('Support Us');
  const [description, setDescription] = useState('Scan this QR code to make a donation');
  
  // Platform donation settings (hardcoded for the platform itself)
  const platformUpiId = 'adnanmuhammad4393@okicici';
  const platformName = 'Muhammed Adnan';

  const generateReactCode = () => {
    return `import DonatingWidget from './DonatingWidget';

// Add this to your component
<DonatingWidget
  upiId="${upiId}"
  name="${name}"
  amount={${amount}}
  position="${position}"
  primaryColor="${primaryColor}"
  buttonText="${buttonText}"
  theme="${theme}"
  icon="${icon}"
  showPulse={${showPulse}}
  showGradient={${showGradient}}
  title="${title}"
  description="${description}"
/>`;
  };

  const generateAdvancedHtmlCode = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premium Donation Widget</title>
    <style>
        .donation-widget {
            position: fixed;
            ${position.includes('bottom') ? 'bottom: 16px;' : 'top: 16px;'}
            ${position.includes('right') ? 'right: 16px;' : 'left: 16px;'}
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .donation-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            background: ${showGradient ? `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` : primaryColor};
            color: white;
            border: none;
            padding: 10px 16px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            ${showPulse ? 'animation: pulse-soft 2s infinite;' : ''}
            min-height: 44px;
            min-width: 44px;
        }
        
        .donation-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        
        @keyframes pulse-soft {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.9; }
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            z-index: 10000;
            justify-content: center;
            align-items: center;
            padding: 16px;
            box-sizing: border-box;
        }
        
        .modal-content {
            background: linear-gradient(135deg, #ffffff, #f8fafc);
            border-radius: 16px;
            padding: 20px;
            width: 100%;
            max-width: 380px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
            text-align: center;
            position: relative;
            margin: auto;
        }
        
        .close-btn {
            position: absolute;
            top: 12px;
            right: 16px;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            opacity: 0.6;
            transition: opacity 0.2s;
            min-height: 44px;
            min-width: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .close-btn:hover {
            opacity: 1;
        }
        
        .qr-container {
            background: white;
            padding: 16px;
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
            margin: 16px 0;
            position: relative;
        }
        
        .secure-badge {
            position: absolute;
            top: -6px;
            right: -6px;
            background: #10b981;
            color: white;
            padding: 3px 6px;
            border-radius: 6px;
            font-size: 9px;
            font-weight: 600;
        }
        
        .amount-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
            margin: 12px 0;
        }
        
        .amount-btn {
            padding: 8px 10px;
            border: 2px solid ${primaryColor}40;
            background: white;
            border-radius: 6px;
            cursor: pointer;
            font-size: 11px;
            font-weight: 600;
            transition: all 0.2s;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .amount-btn:hover {
            transform: scale(1.05);
        }
        
        .amount-btn.active {
            background: ${primaryColor};
            color: white;
        }
        
        .custom-input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            text-align: right;
            margin-top: 8px;
            transition: border-color 0.2s;
            box-sizing: border-box;
        }
        
        .custom-input:focus {
            outline: none;
            border-color: #8b5cf6;
        }
        
        .info-card {
            background: linear-gradient(135deg, #dbeafe, #e0e7ff);
            padding: 12px;
            border-radius: 10px;
            margin: 12px 0;
            border: 1px solid #bfdbfe;
            font-size: 13px;
        }
        
        .thank-you-card {
            background: linear-gradient(135deg, #dcfce7, #d1fae5);
            padding: 12px;
            border-radius: 10px;
            margin-top: 12px;
            border: 1px solid #bbf7d0;
            font-size: 13px;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
            .modal {
                padding: 12px;
            }
            
            .modal-content {
                padding: 16px;
                border-radius: 12px;
                max-height: 85vh;
            }
            
            .donation-btn {
                padding: 8px 12px;
                font-size: 12px;
                gap: 4px;
            }
            
            .amount-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 8px;
            }
            
            .amount-btn {
                font-size: 10px;
                padding: 6px 8px;
            }
            
            .qr-container {
                padding: 12px;
                margin: 12px 0;
            }
            
            .info-card, .thank-you-card {
                padding: 10px;
                font-size: 12px;
            }
            
            .custom-input {
                font-size: 16px; /* Prevents zoom on iOS */
            }
        }
        
        @media (max-width: 480px) {
            .donation-widget {
                bottom: 12px;
                right: 12px;
                left: 12px;
            }
            
            .modal-content {
                max-width: none;
                margin: 0;
            }
        }
    </style>
</head>
<body>
    <!-- Donation Widget -->
    <div class="donation-widget">
        <button class="donation-btn" onclick="openDonationModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4h2V4a2 2 0 0 0-2-2H6C3.79 2 2 3.79 2 6s1.79 4 4 4h14c1.1 0 2-.9 2-2z" fill="currentColor"/>
                <path d="M6 18a2 2 0 0 1-2-2c0-1.1.9-2 2-2h14v4H6z" fill="currentColor"/>
            </svg>
            ${buttonText}
        </button>
    </div>

    <!-- Modal -->
    <div id="donationModal" class="modal">
        <div class="modal-content">
            <button class="close-btn" onclick="closeDonationModal()">&times;</button>
            
            <h3 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700; background: linear-gradient(135deg, #8b5cf6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${title}</h3>
            <p style="color: #6b7280; margin: 0 0 16px 0; font-size: 14px;">${description}</p>
            
            <div class="qr-container">
                <div class="secure-badge">Secure UPI</div>
                <div id="qr-code" style="min-height: 240px; display: flex; align-items: center; justify-content: center; font-size: 13px; color: #6b7280;">
                    Loading QR Code...
                </div>
            </div>
            
            <div>
                <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #374151; font-size: 13px;">Select Amount (₹)</label>
                <div class="amount-grid">
                    <button class="amount-btn" onclick="setAmount(50)">₹50</button>
                    <button class="amount-btn" onclick="setAmount(100)">₹100</button>
                    <button class="amount-btn active" onclick="setAmount(199)">₹199</button>
                    <button class="amount-btn" onclick="setAmount(500)">₹500</button>
                    <button class="amount-btn" onclick="setAmount(1000)">₹1000</button>
                    <button class="amount-btn" onclick="setAmount(2000)">₹2000</button>
                </div>
                <input type="number" id="customAmount" class="custom-input" value="${amount}" onchange="generateQR()" placeholder="Enter custom amount">
            </div>
            
            <div class="info-card">
                <p style="margin: 0; color: #1e40af;"><strong>UPI ID:</strong> ${upiId}</p>
                <p style="margin: 4px 0 0 0; color: #1e40af;"><strong>Recipient:</strong> ${name}</p>
            </div>
            
            <div class="thank-you-card">
                <p style="margin: 0; color: #059669; font-weight: 500;">Thank you for your support! ❤️</p>
                <p style="margin: 4px 0 0 0; font-size: 11px; color: #10b981;">Secure • Instant • Trusted</p>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"></script>
    <script>
        let currentAmount = ${amount};
        
        function openDonationModal() {
            document.getElementById('donationModal').style.display = 'flex';
            generateQR();
        }
        
        function closeDonationModal() {
            document.getElementById('donationModal').style.display = 'none';
        }
        
        function setAmount(amount) {
            currentAmount = amount;
            document.getElementById('customAmount').value = amount;
            
            // Update button states
            document.querySelectorAll('.amount-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            generateQR();
        }
        
        function generateQR() {
            currentAmount = document.getElementById('customAmount').value;
            const qrContainer = document.getElementById('qr-code');
            qrContainer.innerHTML = '<div style="color: #6b7280; font-size: 13px;">Generating QR Code...</div>';
            
            const upiUrl = \`upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=\${currentAmount}&tn=Donation\`;
            
            QRCode.toCanvas(upiUrl, { width: 240, margin: 2 }, function(error, canvas) {
                if (error) {
                    console.error('Error generating QR code:', error);
                    qrContainer.innerHTML = '<div style="color: #ef4444; font-size: 13px;">Error generating QR code</div>';
                } else {
                    qrContainer.innerHTML = '';
                    canvas.style.borderRadius = '8px';
                    qrContainer.appendChild(canvas);
                }
            });
        }
        
        // Close modal when clicking outside
        document.getElementById('donationModal').onclick = function(event) {
            if (event.target === this) {
                closeDonationModal();
            }
        }
        
        // Prevent zoom on iOS when focusing inputs
        document.addEventListener('touchstart', function() {}, true);
    </script>
</body>
</html>`;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    alert(`${type} code copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-4 sm:py-8 px-3 sm:px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Mobile-optimized Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-3 sm:mb-4">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
            <span className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-300">Premium Widget Builder</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent px-2">
            DonatingWidget Pro
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Create beautiful, customizable UPI donation widgets with premium design and advanced features
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 px-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Instant Setup
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
              <Layout className="h-3 w-3 mr-1" />
              Mobile First
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
              <Palette className="h-3 w-3 mr-1" />
              Premium Themes
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Mobile-optimized Configuration Panel */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Basic Configuration */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  Basic Configuration
                </CardTitle>
                <CardDescription className="text-sm">Configure your donation widget settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="upi-id" className="text-sm font-medium">UPI ID *</Label>
                    <Input 
                      id="upi-id" 
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="your-upi-id@provider"
                      className="modern-input text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Recipient Name *</Label>
                    <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Business Name"
                      className="modern-input text-sm"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-sm font-medium">Default Amount (₹)</Label>
                    <Input 
                      id="amount" 
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(parseInt(e.target.value))}
                      placeholder="199"
                      className="modern-input text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="button-text" className="text-sm font-medium">Button Text</Label>
                    <Input 
                      id="button-text" 
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      placeholder="Donate"
                      className="modern-input text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">Dialog Title</Label>
                    <Input 
                      id="title" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Support Us"
                      className="modern-input text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                    <Input 
                      id="description" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Scan this QR code to make a donation"
                      className="modern-input text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile-optimized Design Options */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  Design & Appearance
                </CardTitle>
                <CardDescription className="text-sm">Customize the visual design of your widget</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme" className="text-sm font-medium">Theme Style</Label>
                    <Select value={theme} onValueChange={(value: any) => setTheme(value)}>
                      <SelectTrigger className="border-2 focus:border-purple-400 text-sm">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">🎨 Modern</SelectItem>
                        <SelectItem value="premium">✨ Premium</SelectItem>
                        <SelectItem value="minimal">🔲 Minimal</SelectItem>
                        <SelectItem value="classic">🎯 Classic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icon" className="text-sm font-medium">Icon Style</Label>
                    <Select value={icon} onValueChange={(value: any) => setIcon(value)}>
                      <SelectTrigger className="border-2 focus:border-purple-400 text-sm">
                        <SelectValue placeholder="Select icon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gift">🎁 Gift</SelectItem>
                        <SelectItem value="heart">❤️ Heart</SelectItem>
                        <SelectItem value="coffee">☕ Coffee</SelectItem>
                        <SelectItem value="dollar">💰 Dollar</SelectItem>
                        <SelectItem value="sparkles">✨ Sparkles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-sm font-medium">Button Position</Label>
                    <Select value={position} onValueChange={(value: any) => setPosition(value)}>
                      <SelectTrigger className="border-2 focus:border-purple-400 text-sm">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bottom-right">↘️ Bottom Right</SelectItem>
                        <SelectItem value="bottom-left">↙️ Bottom Left</SelectItem>
                        <SelectItem value="top-right">↗️ Top Right</SelectItem>
                        <SelectItem value="top-left">↖️ Top Left</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primary-color" className="text-sm font-medium">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="primary-color" 
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        placeholder="#8B5CF6"
                        className="modern-input text-sm flex-1"
                      />
                      <input 
                        type="color" 
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-10 h-10 p-1 rounded border-2 border-gray-200 touch-target"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile-optimized Advanced Options */}
                <div className="space-y-3 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200/50">
                  <h4 className="font-medium text-purple-800 dark:text-purple-300 text-sm">Advanced Options</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pulse-effect" className="text-xs sm:text-sm">Pulse Animation</Label>
                      <Switch
                        id="pulse-effect"
                        checked={showPulse}
                        onCheckedChange={setShowPulse}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="gradient-effect" className="text-xs sm:text-sm">Gradient Background</Label>
                      <Switch
                        id="gradient-effect"
                        checked={showGradient}
                        onCheckedChange={setShowGradient}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Mobile-optimized Implementation Guide */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Code className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  Implementation Guide
                </CardTitle>
                <CardDescription className="text-sm">Copy and paste ready-to-use code for your website</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="react" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm">
                    <TabsTrigger value="react">React</TabsTrigger>
                    <TabsTrigger value="html">HTML</TabsTrigger>
                    <TabsTrigger value="guide">Guide</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="react" className="space-y-3 sm:space-y-4">
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-auto max-h-64 sm:max-h-96 text-xs sm:text-sm">
                        <code>{generateReactCode()}</code>
                      </pre>
                      <Button 
                        className="absolute top-2 right-2" 
                        size="sm"
                        variant="secondary"
                        onClick={() => copyToClipboard(generateReactCode(), 'React')}
                      >
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50">
                      <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300">
                        <strong>Requirements:</strong> Copy the DonatingWidget.tsx component file to your React project and install: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded text-xs">qrcode</code>, <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded text-xs">@types/qrcode</code>
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="html" className="space-y-3 sm:space-y-4">
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-2 sm:p-4 rounded-lg overflow-auto max-h-64 sm:max-h-96 text-xs">
                        <code>{generateAdvancedHtmlCode()}</code>
                      </pre>
                      <div className="absolute top-2 right-2 flex gap-1 sm:gap-2">
                        <Button 
                          size="sm"
                          variant="secondary"
                          onClick={() => copyToClipboard(generateAdvancedHtmlCode(), 'HTML')}
                          className="text-xs"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                        <Button 
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            const blob = new Blob([generateAdvancedHtmlCode()], { type: 'text/html' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'donation-widget.html';
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="text-xs"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200/50">
                      <p className="text-xs sm:text-sm text-green-800 dark:text-green-300">
                        <strong>Complete Solution:</strong> This HTML includes everything needed - mobile-optimized and responsive design.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="guide" className="space-y-4 sm:space-y-6">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200/50">
                        <h3 className="text-base sm:text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">🚀 Quick Start Guide</h3>
                        <ol className="space-y-2 text-xs sm:text-sm text-blue-700 dark:text-blue-400">
                          <li><strong>1.</strong> Configure your UPI ID and recipient name above</li>
                          <li><strong>2.</strong> Customize the design, colors, and position</li>
                          <li><strong>3.</strong> Copy the generated code from React or HTML tab</li>
                          <li><strong>4.</strong> Paste it into your website</li>
                          <li><strong>5.</strong> Test the donation flow</li>
                        </ol>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200/50">
                          <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2 text-sm">✨ Features</h4>
                          <ul className="text-xs sm:text-sm text-purple-700 dark:text-purple-400 space-y-1">
                            <li>• Instant UPI QR code generation</li>
                            <li>• Mobile-first responsive design</li>
                            <li>• Customizable amounts & themes</li>
                            <li>• Touch-optimized interface</li>
                            <li>• Secure payment processing</li>
                          </ul>
                        </div>

                        <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200/50">
                          <h4 className="font-medium text-green-800 dark:text-green-300 mb-2 text-sm">🔒 Security</h4>
                          <ul className="text-xs sm:text-sm text-green-700 dark:text-green-400 space-y-1">
                            <li>• No payment data stored</li>
                            <li>• Direct UPI integration</li>
                            <li>• Client-side QR generation</li>
                            <li>• Bank-grade security</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Mobile-optimized Preview Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  Live Preview
                </CardTitle>
                <CardDescription className="text-sm">See how your widget looks and behaves</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="min-h-[300px] sm:min-h-[400px] relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden">
                  <div className="absolute inset-2 sm:inset-4 bg-white/50 dark:bg-gray-900/50 rounded backdrop-blur-sm flex items-center justify-center">
                    <p className="text-center text-muted-foreground p-2 sm:p-4 text-xs sm:text-sm">
                      This represents your website content.<br/>
                      <span className="text-xs opacity-75">The donation button will appear in the selected position.</span>
                    </p>
                  </div>
                  {/* User's configurable preview widget */}
                  <DonatingWidget
                    upiId={upiId}
                    name={name}
                    amount={amount}
                    position="bottom-right"
                    primaryColor={primaryColor}
                    buttonText={buttonText}
                    theme={theme}
                    icon={icon}
                    showPulse={showPulse}
                    showGradient={showGradient}
                    title={title}
                    description={description}
                    customStyle={{
                      position: 'absolute',
                      bottom: '0.5rem',
                      right: '0.5rem',
                    }}
                  />
                </div>
                
                {/* Mobile-optimized Preview Settings Summary */}
                <div className="p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg space-y-2">
                  <h4 className="font-medium text-xs sm:text-sm">Current Configuration:</h4>
                  <div className="text-xs space-y-1 text-muted-foreground">
                    <p><strong>Theme:</strong> {theme}</p>
                    <p><strong>Position:</strong> {position}</p>
                    <p><strong>Amount:</strong> ₹{amount}</p>
                    <p><strong>Color:</strong> {primaryColor}</p>
                    <p><strong>Effects:</strong> {showPulse ? 'Pulse' : 'None'}{showGradient ? ', Gradient' : ''}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Platform donation widget with hardcoded UPI ID */}
      <DonatingWidget
        upiId={platformUpiId}
        name={platformName}
        amount={50}
        position="bottom-left"
        primaryColor="#10b981"
        buttonText="Support Platform"
        theme="premium"
        icon="heart"
        showPulse={true}
        showGradient={true}
        title="Support DonatingWidget Pro"
        description="Help us continue developing amazing features"
        thankYouMessage="Thank you for supporting our platform! 💚"
      />
    </div>
  );
};

export default DonatingWidgetDemo;
