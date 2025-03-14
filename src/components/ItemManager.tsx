
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Trash2, Edit, Save, X, Plus } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const ItemManager: React.FC = () => {
  const { items, addItem, updateItem, removeItem } = useAppContext();
  const [newItem, setNewItem] = useState({ name: '', price: '', quantity: '1' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValues, setEditingValues] = useState({ name: '', price: '', quantity: '' });

  const handleAddItem = () => {
    if (!newItem.name.trim()) {
      toast({
        title: "Item name required",
        description: "Please enter a name for the item",
        variant: "destructive",
      });
      return;
    }

    const price = parseFloat(newItem.price);
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid price greater than 0",
        variant: "destructive",
      });
      return;
    }

    const quantity = parseInt(newItem.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Please enter a valid quantity greater than 0",
        variant: "destructive",
      });
      return;
    }

    addItem({
      name: newItem.name,
      price: price,
      quantity: quantity
    });

    setNewItem({ name: '', price: '', quantity: '1' });
  };

  const startEditing = (item: { id: string; name: string; price: number; quantity: number }) => {
    setEditingId(item.id);
    setEditingValues({
      name: item.name,
      price: item.price.toString(),
      quantity: item.quantity.toString()
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEditing = (id: string) => {
    const price = parseFloat(editingValues.price);
    const quantity = parseInt(editingValues.quantity);

    if (!editingValues.name.trim() || isNaN(price) || price <= 0 || isNaN(quantity) || quantity <= 0) {
      toast({
        title: "Invalid input",
        description: "Please check the item details",
        variant: "destructive",
      });
      return;
    }

    updateItem(id, {
      name: editingValues.name,
      price: price,
      quantity: quantity
    });

    setEditingId(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-upi-blue" />
          Manage Items
        </CardTitle>
        <CardDescription>
          Add and manage items for payment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-5 sm:col-span-6">
                <label htmlFor="itemName" className="text-sm font-medium mb-1 block">
                  Item Name
                </label>
                <Input
                  id="itemName"
                  placeholder="Product or Service"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </div>
              <div className="col-span-4 sm:col-span-3">
                <label htmlFor="itemPrice" className="text-sm font-medium mb-1 block">
                  Price (₹)
                </label>
                <Input
                  id="itemPrice"
                  placeholder="0.00"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
              </div>
              <div className="col-span-3 sm:col-span-3">
                <label htmlFor="itemQty" className="text-sm font-medium mb-1 block">
                  Quantity
                </label>
                <Input
                  id="itemQty"
                  placeholder="1"
                  type="number"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                />
              </div>
            </div>
            <Button 
              onClick={handleAddItem} 
              className="w-full mt-2"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Your Items</h3>
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">No items added yet</p>
            ) : (
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="item-card">
                    {editingId === item.id ? (
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-5 sm:col-span-6">
                          <Input
                            placeholder="Item name"
                            value={editingValues.name}
                            onChange={(e) => setEditingValues({ ...editingValues, name: e.target.value })}
                          />
                        </div>
                        <div className="col-span-4 sm:col-span-3">
                          <Input
                            placeholder="Price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={editingValues.price}
                            onChange={(e) => setEditingValues({ ...editingValues, price: e.target.value })}
                          />
                        </div>
                        <div className="col-span-3 sm:col-span-3">
                          <Input
                            placeholder="Qty"
                            type="number"
                            min="1"
                            value={editingValues.quantity}
                            onChange={(e) => setEditingValues({ ...editingValues, quantity: e.target.value })}
                          />
                        </div>
                        <div className="col-span-12 flex justify-end space-x-2 mt-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={cancelEditing}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => saveEditing(item.id)}
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="ml-2">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              ₹{item.price.toFixed(2)} × {item.quantity} = 
                              <span className="font-medium ml-1">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => startEditing(item)}
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemManager;
