
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { BrandingConfig, getBrandingConfig, setBrandingConfig, applyBrandingToDOM, defaultBranding } from '@/config/branding';

interface BrandingContextType {
  branding: BrandingConfig;
  updateBranding: (newBranding: Partial<BrandingConfig>) => void;
  resetToDefault: () => void;
  isLoading: boolean;
}

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

interface BrandingProviderProps {
  children: ReactNode;
}

export const BrandingProvider: React.FC<BrandingProviderProps> = ({ children }) => {
  const [branding, setBranding] = useState<BrandingConfig>(defaultBranding);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load branding configuration on mount
    const loadBranding = () => {
      const config = getBrandingConfig();
      setBranding(config);
      applyBrandingToDOM(config);
      setIsLoading(false);
    };

    loadBranding();
  }, []);

  const updateBranding = (newBranding: Partial<BrandingConfig>) => {
    const updatedBranding = { ...branding, ...newBranding };
    setBranding(updatedBranding);
    setBrandingConfig(newBranding);
    applyBrandingToDOM(updatedBranding);
  };

  const resetToDefault = () => {
    setBranding(defaultBranding);
    localStorage.removeItem('platform-branding');
    applyBrandingToDOM(defaultBranding);
  };

  return (
    <BrandingContext.Provider value={{
      branding,
      updateBranding,
      resetToDefault,
      isLoading,
    }}>
      {children}
    </BrandingContext.Provider>
  );
};

export const useBranding = (): BrandingContextType => {
  const context = useContext(BrandingContext);
  if (context === undefined) {
    throw new Error('useBranding must be used within a BrandingProvider');
  }
  return context;
};
