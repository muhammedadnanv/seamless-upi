
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Check, Trash2, Plus } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const UpiIdManager: React.FC = () => {
  const { upiIds, addUpiId, removeUpiId, setDefaultUpiId } = useAppContext();
  const [newUpiId, setNewUpiId] = useState('');
  const [newUpiName, setNewUpiName] = useState('');

  const handleAddUpiId = () => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
    
    if (!upiRegex.test(newUpiId)) {
      toast({
        title: "Invalid UPI ID",
        description: "Please enter a valid UPI ID (format: username@provider)",
        variant: "destructive",
      });
      return;
    }
    
    if (!newUpiName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for this UPI ID",
        variant: "destructive",
      });
      return;
    }
    
    addUpiId({
      upiId: newUpiId,
      name: newUpiName,
      isDefault: upiIds.length === 0, // Make default if it's the first one
    });
    
    setNewUpiId('');
    setNewUpiName('');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-upi-blue" />
          Manage UPI IDs
        </CardTitle>
        <CardDescription>
          Add and manage your UPI IDs for receiving payments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="upiId" className="text-sm font-medium mb-1 block">
                  UPI ID
                </label>
                <Input
                  id="upiId"
                  placeholder="username@provider"
                  value={newUpiId}
                  onChange={(e) => setNewUpiId(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="upiName" className="text-sm font-medium mb-1 block">
                  Name / Description
                </label>
                <Input
                  id="upiName"
                  placeholder="Personal Account"
                  value={newUpiName}
                  onChange={(e) => setNewUpiName(e.target.value)}
                />
              </div>
            </div>
            <Button 
              onClick={handleAddUpiId} 
              className="w-full md:w-auto self-end"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add UPI ID
            </Button>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Your UPI IDs</h3>
            {upiIds.length === 0 ? (
              <p className="text-sm text-muted-foreground">No UPI IDs added yet</p>
            ) : (
              <div className="space-y-2">
                {upiIds.map((upi) => (
                  <div 
                    key={upi.id} 
                    className={`flex items-center justify-between p-3 rounded-md ${
                      upi.isDefault ? 'bg-upi-background border border-upi-light/30' : 'bg-secondary'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <span className="font-medium">{upi.upiId}</span>
                        <span className="text-sm text-muted-foreground">{upi.name}</span>
                      </div>
                      {upi.isDefault && (
                        <Badge variant="outline" className="ml-2 bg-upi-light text-white border-none">
                          Default
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {!upi.isDefault && (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => setDefaultUpiId(upi.id)}
                          className="h-8 w-8"
                          title="Set as default"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => removeUpiId(upi.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        title="Remove UPI ID"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <p>Default UPI ID will be used for receiving payments</p>
      </CardFooter>
    </Card>
  );
};

export default UpiIdManager;
