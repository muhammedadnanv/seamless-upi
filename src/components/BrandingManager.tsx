
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useBranding } from '@/context/BrandingContext';
import { Palette, Type, Layout, Image, Save, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BrandingManager: React.FC = () => {
  const { branding, updateBranding, resetToDefault } = useBranding();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('colors');

  const handleColorChange = (colorKey: string, value: string) => {
    updateBranding({
      colors: {
        ...branding.colors,
        [colorKey]: value,
      },
    });
  };

  const handleGeneralChange = (field: string, value: string) => {
    updateBranding({
      [field]: value,
    });
  };

  const handleTypographyChange = (field: string, value: string) => {
    updateBranding({
      typography: {
        ...branding.typography,
        [field]: value,
      },
    });
  };

  const handleLayoutChange = (field: string, value: string) => {
    updateBranding({
      layout: {
        ...branding.layout,
        [field]: value,
      },
    });
  };

  const handleLogoChange = (field: string, value: string) => {
    updateBranding({
      logo: {
        ...branding.logo,
        [field]: value,
      },
    });
  };

  const handleSave = () => {
    toast({
      title: "Branding Updated",
      description: "Your platform branding has been successfully updated.",
    });
  };

  const handleReset = () => {
    resetToDefault();
    toast({
      title: "Branding Reset",
      description: "Platform branding has been reset to default settings.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Platform Branding</h1>
        <p className="text-muted-foreground">
          Customize your platform's visual identity and user experience
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full mb-6">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Colors</span>
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            <span className="hidden sm:inline">Typography</span>
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            <span className="hidden sm:inline">Layout</span>
          </TabsTrigger>
          <TabsTrigger value="identity" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <span className="hidden sm:inline">Identity</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
              <CardDescription>
                Customize your platform's color palette
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(branding.colors).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key} className="capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id={key}
                        type="color"
                        value={value.includes('hsl') ? '#3b82f6' : value}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={value}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        placeholder="HSL or Hex value"
                        className="flex-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography">
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>
                Configure fonts and text styling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fontFamily">Primary Font Family</Label>
                <Input
                  id="fontFamily"
                  value={branding.typography.fontFamily}
                  onChange={(e) => handleTypographyChange('fontFamily', e.target.value)}
                  placeholder="Inter, system-ui, sans-serif"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="headingFont">Heading Font</Label>
                <Input
                  id="headingFont"
                  value={branding.typography.headingFont}
                  onChange={(e) => handleTypographyChange('headingFont', e.target.value)}
                  placeholder="Inter, system-ui, sans-serif"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bodyFont">Body Font</Label>
                <Input
                  id="bodyFont"
                  value={branding.typography.bodyFont}
                  onChange={(e) => handleTypographyChange('bodyFont', e.target.value)}
                  placeholder="Inter, system-ui, sans-serif"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout">
          <Card>
            <CardHeader>
              <CardTitle>Layout & Spacing</CardTitle>
              <CardDescription>
                Adjust layout properties and spacing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="borderRadius">Border Radius</Label>
                <Input
                  id="borderRadius"
                  value={branding.layout.borderRadius}
                  onChange={(e) => handleLayoutChange('borderRadius', e.target.value)}
                  placeholder="0.75rem"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spacing">Base Spacing</Label>
                <Input
                  id="spacing"
                  value={branding.layout.spacing}
                  onChange={(e) => handleLayoutChange('spacing', e.target.value)}
                  placeholder="1rem"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="containerMaxWidth">Container Max Width</Label>
                <Input
                  id="containerMaxWidth"
                  value={branding.layout.containerMaxWidth}
                  onChange={(e) => handleLayoutChange('containerMaxWidth', e.target.value)}
                  placeholder="1280px"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="identity">
          <Card>
            <CardHeader>
              <CardTitle>Brand Identity</CardTitle>
              <CardDescription>
                Configure your platform's name, logo, and identity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Platform Name</Label>
                <Input
                  id="name"
                  value={branding.name}
                  onChange={(e) => handleGeneralChange('name', e.target.value)}
                  placeholder="CodeCashier"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={branding.tagline}
                  onChange={(e) => handleGeneralChange('tagline', e.target.value)}
                  placeholder="Effortless UPI Payment Solutions"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logoText">Logo Text</Label>
                <Input
                  id="logoText"
                  value={branding.logo.text}
                  onChange={(e) => handleLogoChange('text', e.target.value)}
                  placeholder="CodeCashier"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logoUrl">Logo URL (optional)</Label>
                <Input
                  id="logoUrl"
                  value={branding.logo.url || ''}
                  onChange={(e) => handleLogoChange('url', e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Platform Description</Label>
                <Textarea
                  id="description"
                  value={branding.social.description}
                  onChange={(e) => updateBranding({
                    social: { ...branding.social, description: e.target.value }
                  })}
                  placeholder="Describe your platform..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator className="my-6" />

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Button onClick={handleReset} variant="outline" className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset to Default
        </Button>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default BrandingManager;
