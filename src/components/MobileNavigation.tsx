
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  tabs: Array<{
    value: string;
    label: string;
    shortLabel: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeTab,
  onTabChange,
  tabs,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleTabSelect = (value: string) => {
    onTabChange(value);
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-2 hover:bg-primary/10"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 sm:w-96">
          <SheetHeader>
            <SheetTitle className="text-left">Navigation</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-2">
            {tabs.map((tab) => (
              <Button
                key={tab.value}
                variant={activeTab === tab.value ? "default" : "ghost"}
                className="w-full justify-start h-12 text-left"
                onClick={() => handleTabSelect(tab.value)}
              >
                <tab.icon className="mr-3 h-5 w-5" />
                <span className="text-base">{tab.label}</span>
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
