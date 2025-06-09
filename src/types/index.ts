
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

export type UserRole = 'owner' | 'manager' | 'cashier' | 'viewer';

export interface AppUser {
  id: string;
  auth_id: string;
  email: string;
  name: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}
