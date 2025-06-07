
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UpiId, Item } from '@/types';
import { toast } from "@/components/ui/use-toast";

interface AppContextType {
  upiIds: UpiId[];
  items: Item[];
  activeUpiId: UpiId | null;
  isAdmin: boolean;
  addUpiId: (upiId: Omit<UpiId, 'id'>) => void;
  removeUpiId: (id: string) => void;
  setDefaultUpiId: (id: string) => void;
  addItem: (item: Omit<Item, 'id'>) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  removeItem: (id: string) => void;
  toggleAdminMode: () => void;
  totalAmount: number;
  setTotalAmount: (amount: number) => void;
  selectedItems: Item[];
  setSelectedItems: (items: Item[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const defaultUpiIds: UpiId[] = [
  { id: '1', upiId: 'admin@okaxis', name: 'Admin Account', isDefault: true },
];

const defaultItems: Item[] = [];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load data from localStorage if available
  const [upiIds, setUpiIds] = useState<UpiId[]>(() => {
    const saved = localStorage.getItem('upiIds');
    return saved ? JSON.parse(saved) : defaultUpiIds;
  });
  
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem('items');
    return saved ? JSON.parse(saved) : defaultItems;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [customTotalAmount, setCustomTotalAmount] = useState<number | null>(null);

  // Calculate active UPI ID
  const activeUpiId = upiIds.find(upi => upi.isDefault) || upiIds[0] || null;

  // Calculate total amount based on items
  const calculatedTotalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalAmount = customTotalAmount !== null ? customTotalAmount : calculatedTotalAmount;

  // Function to set a custom total amount
  const setTotalAmount = (amount: number) => {
    setCustomTotalAmount(amount);
  };

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('upiIds', JSON.stringify(upiIds));
  }, [upiIds]);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // UPI ID management functions
  const addUpiId = (upiId: Omit<UpiId, 'id'>) => {
    const newUpiId = {
      ...upiId,
      id: Date.now().toString()
    };
    
    if (upiIds.length === 0 || upiId.isDefault) {
      // If this is the first UPI ID or it's marked as default, make sure it's the only default
      setUpiIds(prev => [
        ...prev.map(u => ({ ...u, isDefault: false })),
        newUpiId
      ]);
    } else {
      setUpiIds(prev => [...prev, newUpiId]);
    }
    
    toast({
      title: "UPI ID Added",
      description: `${upiId.upiId} has been added successfully`,
    });
  };

  const removeUpiId = (id: string) => {
    const upiToRemove = upiIds.find(u => u.id === id);
    if (!upiToRemove) return;
    
    setUpiIds(prev => {
      const remaining = prev.filter(u => u.id !== id);
      
      // If we're removing the default UPI, set a new default if any UPIs remain
      if (upiToRemove.isDefault && remaining.length > 0) {
        remaining[0].isDefault = true;
      }
      
      return remaining;
    });
    
    toast({
      title: "UPI ID Removed",
      description: `${upiToRemove.upiId} has been removed`,
    });
  };

  const setDefaultUpiId = (id: string) => {
    setUpiIds(prev => prev.map(u => ({
      ...u,
      isDefault: u.id === id
    })));
    
    const newDefault = upiIds.find(u => u.id === id);
    if (newDefault) {
      toast({
        title: "Default UPI Changed",
        description: `${newDefault.upiId} is now the default UPI ID`,
      });
    }
  };

  // Item management functions
  const addItem = (item: Omit<Item, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString()
    };
    setItems(prev => [...prev, newItem]);
    
    toast({
      title: "Item Added",
      description: `${item.name} has been added to the list`,
    });
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removeItem = (id: string) => {
    const itemToRemove = items.find(i => i.id === id);
    if (!itemToRemove) return;
    
    setItems(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: "Item Removed",
      description: `${itemToRemove.name} has been removed from the list`,
    });
  };

  const toggleAdminMode = () => {
    setIsAdmin(prev => !prev);
    
    toast({
      title: isAdmin ? "User Mode" : "Admin Mode",
      description: `Switched to ${!isAdmin ? "Admin" : "User"} mode`,
    });
  };

  const [selectedItems, setSelectedItems] = useState<Item[]>(() => {
    return items.filter(item => item.quantity > 0);
  });

  useEffect(() => {
    // Update selectedItems when items change
    setSelectedItems(items.filter(item => item.quantity > 0));
  }, [items]);

  return (
    <AppContext.Provider value={{
      upiIds,
      items,
      activeUpiId,
      isAdmin,
      addUpiId,
      removeUpiId,
      setDefaultUpiId,
      addItem,
      updateItem,
      removeItem,
      toggleAdminMode,
      totalAmount,
      setTotalAmount,
      selectedItems,
      setSelectedItems
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
