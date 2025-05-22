
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import DonatingWidget from '@/components/DonatingWidget';
import { Code } from 'lucide-react';

const DonatingWidgetDemo = () => {
  const [upiId, setUpiId] = useState('adnanmuhammad4393@okicici');
  const [name, setName] = useState('Muhammed Adnan');
  const [amount, setAmount] = useState(199);
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right');
  const [primaryColor, setPrimaryColor] = useState('#8B5CF6');
  const [buttonText, setButtonText] = useState('Donate');
  
  const generateEmbedCode = () => {
    const htmlCode = `
<!-- DonatingWidget HTML -->
<div id="donating-widget-container"></div>

<!-- DonatingWidget JavaScript -->
<script>
  (function() {
    // Configuration
    const config = {
      upiId: '${upiId}',
      name: '${name}',
      amount: ${amount},
      position: '${position}',
      primaryColor: '${primaryColor}',
      buttonText: '${buttonText}'
    };
    
    // Create widget button
    const widget = document.createElement('div');
    widget.innerHTML = \`
      <div style="position: fixed; 
                ${position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
                ${position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
                z-index: 9999;">
        <button style="display: flex;
                      align-items: center;
                      gap: 8px;
                      background-color: \${config.primaryColor};
                      color: white;
                      border: none;
                      padding: 10px 16px;
                      border-radius: 4px;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                      font-size: 14px;
                      cursor: pointer;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                      transition: all 0.3s ease;"
                onmouseover="this.style.boxShadow='0 6px 8px rgba(0, 0, 0, 0.2)';"
                onmouseout="this.style.boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)';"
                onclick="openDonationDialog()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white"/>
          </svg>
          \${config.buttonText}
        </button>
      </div>
    \`;
    
    document.getElementById('donating-widget-container').appendChild(widget);
    
    // Create dialog elements
    const modal = document.createElement('div');
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '10000';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    
    const dialog = document.createElement('div');
    dialog.style.backgroundColor = 'white';
    dialog.style.borderRadius = '8px';
    dialog.style.padding = '20px';
    dialog.style.width = '90%';
    dialog.style.maxWidth = '320px';
    dialog.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
    
    // Close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.float = 'right';
    closeButton.style.border = 'none';
    closeButton.style.background = 'transparent';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = closeDonationDialog;
    
    // Title
    const title = document.createElement('h3');
    title.textContent = 'Support Us';
    title.style.margin = '0 0 10px 0';
    title.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    
    // Description
    const description = document.createElement('p');
    description.textContent = 'Scan this QR code to make a donation';
    description.style.margin = '0 0 20px 0';
    description.style.color = '#666';
    description.style.fontSize = '14px';
    description.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    
    // QR container
    const qrContainer = document.createElement('div');
    qrContainer.style.display = 'flex';
    qrContainer.style.justifyContent = 'center';
    qrContainer.style.marginBottom = '20px';
    
    const qrPlaceholder = document.createElement('div');
    qrPlaceholder.id = 'qr-code';
    qrPlaceholder.style.width = '200px';
    qrPlaceholder.style.height = '200px';
    qrPlaceholder.style.backgroundColor = '#f1f1f1';
    qrPlaceholder.style.display = 'flex';
    qrPlaceholder.style.alignItems = 'center';
    qrPlaceholder.style.justifyContent = 'center';
    qrPlaceholder.textContent = 'Loading QR Code...';
    qrContainer.appendChild(qrPlaceholder);
    
    // Input field for amount
    const inputContainer = document.createElement('div');
    inputContainer.style.marginBottom = '20px';
    
    const amountLabel = document.createElement('label');
    amountLabel.textContent = 'Amount (₹)';
    amountLabel.style.display = 'block';
    amountLabel.style.marginBottom = '5px';
    amountLabel.style.fontSize = '14px';
    amountLabel.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    
    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.id = 'donation-amount';
    amountInput.value = config.amount;
    amountInput.style.width = '100%';
    amountInput.style.padding = '8px';
    amountInput.style.border = '1px solid #ddd';
    amountInput.style.borderRadius = '4px';
    amountInput.style.textAlign = 'right';
    amountInput.onchange = generateQR;
    
    inputContainer.appendChild(amountLabel);
    inputContainer.appendChild(amountInput);
    
    // UPI info
    const upiInfo = document.createElement('p');
    upiInfo.style.textAlign = 'center';
    upiInfo.style.fontSize = '14px';
    upiInfo.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    upiInfo.innerHTML = \`UPI ID: <strong>\${config.upiId}</strong>\`;
    
    const thankYou = document.createElement('p');
    thankYou.textContent = 'Thank you for your support!';
    thankYou.style.textAlign = 'center';
    thankYou.style.fontSize = '12px';
    thankYou.style.color = '#666';
    thankYou.style.marginTop = '10px';
    thankYou.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    
    // Assemble dialog
    dialog.appendChild(closeButton);
    dialog.appendChild(title);
    dialog.appendChild(description);
    dialog.appendChild(qrContainer);
    dialog.appendChild(inputContainer);
    dialog.appendChild(upiInfo);
    dialog.appendChild(thankYou);
    
    modal.appendChild(dialog);
    document.body.appendChild(modal);
    
    // Functions
    window.openDonationDialog = function() {
      modal.style.display = 'flex';
      generateQR();
    };
    
    window.closeDonationDialog = function() {
      modal.style.display = 'none';
    };
    
    async function generateQR() {
      if (!window.QRCode) {
        // Load QRCode.js if not already loaded
        await loadQRCodeScript();
      }
      
      const amount = document.getElementById('donation-amount').value;
      const qrContainer = document.getElementById('qr-code');
      
      // Clear previous QR code
      qrContainer.innerHTML = '';
      
      // Create the UPI URL for donation
      const baseUrl = 'upi://pay';
      const params = new URLSearchParams();
      params.append('pa', config.upiId);
      params.append('pn', config.name);
      params.append('am', amount);
      params.append('tn', 'Donation');
      const upiUrl = \`\${baseUrl}?\${params.toString()}\`;
      
      // Generate QR code
      QRCode.toCanvas(qrContainer, upiUrl, { width: 200 }, function(error) {
        if (error) console.error('Error generating QR code:', error);
      });
    }
    
    function loadQRCodeScript() {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
  })();
</script>
    `;

    return htmlCode.trim();
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 py-8 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">DonatingWidget</h1>
          <p className="text-muted-foreground">A customizable UPI donation widget for your website</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Widget Configuration</CardTitle>
                <CardDescription>Customize your donation widget</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="upi-id">UPI ID</Label>
                    <Input 
                      id="upi-id" 
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="your-upi-id@provider"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Default Amount</Label>
                    <Input 
                      id="amount" 
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(parseInt(e.target.value))}
                      placeholder="199"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Button Position</Label>
                    <Select value={position} onValueChange={(value: any) => setPosition(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="top-left">Top Left</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="primary-color" 
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        placeholder="#8B5CF6"
                      />
                      <input 
                        type="color" 
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-10 h-10 p-1 rounded border"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="button-text">Button Text</Label>
                    <Input 
                      id="button-text" 
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      placeholder="Donate"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Embed Code
                </CardTitle>
                <CardDescription>Copy this code to add the widget to your website</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="html">
                  <TabsList className="mb-2">
                    <TabsTrigger value="html">HTML Embed</TabsTrigger>
                    <TabsTrigger value="react">React Component</TabsTrigger>
                  </TabsList>
                  <TabsContent value="html">
                    <div className="relative">
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto max-h-96 text-xs">
                        <code>{generateEmbedCode()}</code>
                      </pre>
                      <Button 
                        className="absolute top-2 right-2" 
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          navigator.clipboard.writeText(generateEmbedCode());
                          alert('Code copied to clipboard!');
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      This code includes everything needed for the widget. Just paste it into your HTML.
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="react">
                    <div className="relative">
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto max-h-96 text-xs">
                        <code>{`import DonatingWidget from './DonatingWidget';

// Add this to your component
<DonatingWidget
  upiId="${upiId}"
  name="${name}"
  amount={${amount}}
  position="${position}"
  primaryColor="${primaryColor}"
  buttonText="${buttonText}"
/>`}</code>
                      </pre>
                      <Button 
                        className="absolute top-2 right-2" 
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          navigator.clipboard.writeText(`import DonatingWidget from './DonatingWidget';

// Add this to your component
<DonatingWidget
  upiId="${upiId}"
  name="${name}"
  amount={${amount}}
  position="${position}"
  primaryColor="${primaryColor}"
  buttonText="${buttonText}"
/>`);
                          alert('Code copied to clipboard!');
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      To use the React component, copy the DonatingWidget.tsx file to your project and import it.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your widget looks</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[300px] relative bg-gray-100 dark:bg-gray-800 rounded-md">
                <p className="text-center text-muted-foreground p-4">This is your website content</p>
                <DonatingWidget
                  upiId={upiId}
                  name={name}
                  amount={amount}
                  position="bottom-right"
                  primaryColor={primaryColor}
                  buttonText={buttonText}
                  customStyle={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatingWidgetDemo;
