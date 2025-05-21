import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calendar, Hash } from 'lucide-react';
import { format } from 'date-fns';
const TransactionHistory: React.FC = () => {
  const {
    transactions
  } = useAppContext();
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 hover:bg-green-600';
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'failed':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  return <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-upi-blue" />
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? <div className="text-center py-6">
            <p className="text-muted-foreground">No transactions yet</p>
          </div> : <div className="space-y-4">
            {transactions.map(transaction => {})}
          </div>}
      </CardContent>
    </Card>;
};
export default TransactionHistory;