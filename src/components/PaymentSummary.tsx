
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart } from 'lucide-react';

const PaymentSummary: React.FC = () => {
  const { items, totalAmount } = useAppContext();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-upi-blue" />
          Payment Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No items added yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <div className="flex-1">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      (₹{item.price.toFixed(2)} × {item.quantity})
                    </span>
                  </div>
                  <div className="font-medium">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
            
            <Separator className="my-2" />
            
            <div className="flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        )}
      </CardContent>
      {items.length > 0 && (
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>Scan the QR code to complete payment</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default PaymentSummary;
