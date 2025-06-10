
export interface BrandingConfig {
  name: string;
  tagline: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  typography: {
    fontFamily: string;
    headingFont: string;
    bodyFont: string;
  };
  layout: {
    borderRadius: string;
    spacing: string;
    containerMaxWidth: string;
  };
  logo: {
    url?: string;
    text: string;
    width: string;
    height: string;
  };
  social: {
    ogImage?: string;
    favicon?: string;
    description: string;
  };
}

export const defaultBranding: BrandingConfig = {
  name: "CodeCashier",
  tagline: "Effortless UPI Payment Solutions",
  colors: {
    primary: "hsl(221.2 83.2% 53.3%)",
    secondary: "hsl(210 40% 96.1%)",
    accent: "hsl(210 40% 96.1%)",
    background: "hsl(210 50% 98%)",
    foreground: "hsl(222.2 84% 4.9%)",
    muted: "hsl(210 40% 96.1%)",
    border: "hsl(214.3 31.8% 91.4%)",
    success: "hsl(142.1 76.2% 36.3%)",
    warning: "hsl(47.9 95.8% 53.1%)",
    error: "hsl(0 84.2% 60.2%)",
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    headingFont: "Inter, system-ui, sans-serif",
    bodyFont: "Inter, system-ui, sans-serif",
  },
  layout: {
    borderRadius: "0.75rem",
    spacing: "1rem",
    containerMaxWidth: "1280px",
  },
  logo: {
    text: "CodeCashier",
    width: "2rem",
    height: "2rem",
  },
  social: {
    description: "Effortless UPI Payment Solutions - Generate QR codes, manage payments, and streamline your business transactions.",
  },
};

// This can be replaced with a more sophisticated system (database, config file, etc.)
export const getBrandingConfig = (): BrandingConfig => {
  // In a real application, this could fetch from localStorage, API, or config file
  const savedBranding = localStorage.getItem('platform-branding');
  if (savedBranding) {
    try {
      return { ...defaultBranding, ...JSON.parse(savedBranding) };
    } catch {
      return defaultBranding;
    }
  }
  return defaultBranding;
};

export const setBrandingConfig = (branding: Partial<BrandingConfig>): void => {
  const currentBranding = getBrandingConfig();
  const newBranding = { ...currentBranding, ...branding };
  localStorage.setItem('platform-branding', JSON.stringify(newBranding));
  
  // Apply theme changes immediately
  applyBrandingToDOM(newBranding);
};

export const applyBrandingToDOM = (branding: BrandingConfig): void => {
  const root = document.documentElement;
  
  // Apply CSS custom properties
  root.style.setProperty('--primary', branding.colors.primary);
  root.style.setProperty('--secondary', branding.colors.secondary);
  root.style.setProperty('--accent', branding.colors.accent);
  root.style.setProperty('--background', branding.colors.background);
  root.style.setProperty('--foreground', branding.colors.foreground);
  root.style.setProperty('--muted', branding.colors.muted);
  root.style.setProperty('--border', branding.colors.border);
  root.style.setProperty('--radius', branding.layout.borderRadius);
  
  // Apply typography
  root.style.setProperty('--font-family', branding.typography.fontFamily);
  root.style.setProperty('--heading-font', branding.typography.headingFont);
  root.style.setProperty('--body-font', branding.typography.bodyFont);
  
  // Update document title and meta description
  document.title = branding.name;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', branding.social.description);
  }
};
