
export interface UpiId {
  id: string;
  upiId: string;
  name: string;
  isDefault: boolean;
}

export interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Transaction {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  items: Item[];
  upiId: string;
  timestamp: Date;
  reference: string;
}
