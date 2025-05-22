
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calendar, Hash, Trash2, Edit, CheckCircle, X } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TransactionHistory: React.FC = () => {
  const { transactions, updateTransactionStatus, deleteTransaction, editTransaction } = useAppContext();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    amount: 0,
    reference: '',
    status: 'pending' as 'pending' | 'completed' | 'failed',
  });

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

  const handleDeleteClick = (id: string) => {
    setSelectedTransaction(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTransaction) {
      deleteTransaction(selectedTransaction);
      setDeleteConfirmOpen(false);
      setSelectedTransaction(null);
    }
  };

  const handleEditClick = (transaction: any) => {
    setSelectedTransaction(transaction.id);
    setEditFormData({
      amount: transaction.amount,
      reference: transaction.reference,
      status: transaction.status,
    });
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (selectedTransaction) {
      editTransaction(selectedTransaction, {
        amount: Number(editFormData.amount),
        reference: editFormData.reference,
        status: editFormData.status,
      });
      setEditDialogOpen(false);
      setSelectedTransaction(null);
    }
  };

  const handleStatusChange = (id: string, newStatus: 'completed' | 'pending' | 'failed') => {
    updateTransactionStatus(id, newStatus);
    toast({
      title: `Transaction ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
      description: `Transaction status has been updated to ${newStatus}`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-upi-blue" />
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-lg">₹{transaction.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(transaction.timestamp), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </Badge>
                    <div className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={() => handleEditClick(transaction)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7 text-red-500 hover:text-red-700" 
                        onClick={() => handleDeleteClick(transaction.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="text-sm flex items-center gap-1 mb-2">
                  <Hash className="h-3 w-3" />
                  <span className="text-muted-foreground">Ref: {transaction.reference}</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Items:</p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {transaction.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity} (₹{item.price.toFixed(2)})
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3 pt-2 border-t">
                  <p className="text-xs mb-1">Change status:</p>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant={transaction.status === 'pending' ? 'default' : 'outline'}
                      className="text-xs h-6 px-2 py-0"
                      onClick={() => handleStatusChange(transaction.id, 'pending')}
                    >
                      Pending
                    </Button>
                    <Button
                      size="sm"
                      variant={transaction.status === 'completed' ? 'default' : 'outline'}
                      className="text-xs h-6 px-2 py-0"
                      onClick={() => handleStatusChange(transaction.id, 'completed')}
                    >
                      Completed
                    </Button>
                    <Button
                      size="sm"
                      variant={transaction.status === 'failed' ? 'default' : 'outline'}
                      className="text-xs h-6 px-2 py-0"
                      onClick={() => handleStatusChange(transaction.id, 'failed')}
                    >
                      Failed
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this transaction? This action cannot be undone.</p>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Transaction Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount (₹)
                </label>
                <Input
                  id="amount"
                  type="number"
                  value={editFormData.amount}
                  onChange={(e) => 
                    setEditFormData({
                      ...editFormData, 
                      amount: parseFloat(e.target.value) || 0
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="reference" className="text-sm font-medium">
                  Reference
                </label>
                <Input
                  id="reference"
                  value={editFormData.reference}
                  onChange={(e) => 
                    setEditFormData({
                      ...editFormData, 
                      reference: e.target.value
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Status</label>
              <div className="flex gap-2 pt-1">
                <Button
                  type="button"
                  size="sm"
                  variant={editFormData.status === 'pending' ? 'default' : 'outline'}
                  onClick={() => 
                    setEditFormData({
                      ...editFormData, 
                      status: 'pending'
                    })
                  }
                >
                  Pending
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={editFormData.status === 'completed' ? 'default' : 'outline'}
                  onClick={() => 
                    setEditFormData({
                      ...editFormData, 
                      status: 'completed'
                    })
                  }
                >
                  Completed
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={editFormData.status === 'failed' ? 'default' : 'outline'}
                  onClick={() => 
                    setEditFormData({
                      ...editFormData, 
                      status: 'failed'
                    })
                  }
                >
                  Failed
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TransactionHistory;
