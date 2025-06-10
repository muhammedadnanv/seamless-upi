
import { useBranding } from '@/context/BrandingContext';

export { useBranding };

// Additional utility functions for branding
export const useThemedStyles = () => {
  const { branding } = useBranding();

  const getThemedClassName = (baseClasses: string) => {
    // This can be expanded to dynamically generate classes based on branding
    return baseClasses;
  };

  const getThemedStyle = (property: keyof typeof branding.colors) => {
    return branding.colors[property];
  };

  return {
    branding,
    getThemedClassName,
    getThemedStyle,
  };
};
