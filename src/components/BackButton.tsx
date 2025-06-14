
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BackButtonProps {
  className?: string;
  variant?: 'default' | 'ghost' | 'outline' | 'secondary' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  fallbackPath?: string;
  children?: React.ReactNode;
}

const BackButton: React.FC<BackButtonProps> = ({
  className,
  variant = 'ghost',
  size = 'default',
  fallbackPath = '/',
  children
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleBack}
      className={cn("flex items-center gap-2", className)}
    >
      <ArrowLeft className="h-4 w-4" />
      {children || 'Back'}
    </Button>
  );
};

export default BackButton;
