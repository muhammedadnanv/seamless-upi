
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, Mail, ShieldCheck } from 'lucide-react';
import { useAuth, UserRole } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface AppUser {
  id: string;
  auth_id: string;
  email: string;
  name: string;
  role: UserRole;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<AppUser[]>([
    {
      id: '1',
      auth_id: '1',
      email: 'owner@example.com',
      name: 'Owner User',
      role: 'owner'
    },
    {
      id: '2',
      auth_id: '2',
      email: 'manager@example.com',
      name: 'Manager User',
      role: 'manager'
    },
    {
      id: '3',
      auth_id: '3',
      email: 'cashier@example.com',
      name: 'Cashier User',
      role: 'cashier'
    },
    {
      id: '4',
      auth_id: '4',
      email: 'viewer@example.com',
      name: 'Viewer User',
      role: 'viewer'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { userData } = useAuth();

  const handleRoleChange = async () => {
    if (!editingUser || !selectedRole) return;

    try {
      // Update user role locally
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...user, role: selectedRole } : user
      ));

      toast({
        title: 'Role updated',
        description: `${editingUser.name}'s role has been updated to ${selectedRole}.`,
      });

      setEditingUser(null);
      setSelectedRole(null);
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: 'Failed to update role',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'owner':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'manager':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'cashier':
        return 'bg-green-500 hover:bg-green-600';
      case 'viewer':
        return 'bg-gray-500 hover:bg-gray-600';
      default:
        return '';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-upi-blue" />
          User Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-upi-blue"></div>
          </div>
        ) : (
          <>
            {users.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No users found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-lg flex items-center gap-2">
                          {user.name}
                          {user.auth_id === userData?.id && (
                            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-muted-foreground px-2 py-0.5 rounded">
                              You
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </p>
                      </div>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </div>
                    
                    {/* Only show edit button if current user is owner and not editing themselves */}
                    {userData?.role === 'owner' && userData.id !== user.auth_id && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2 text-xs"
                        onClick={() => {
                          setEditingUser(user);
                          setSelectedRole(user.role);
                        }}
                      >
                        <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                        Change Role
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change User Role</DialogTitle>
              <DialogDescription>
                Update the role for {editingUser?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={selectedRole || undefined}
                  onValueChange={(value) => setSelectedRole(value as UserRole)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="cashier">Cashier</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingUser(null)}>
                Cancel
              </Button>
              <Button onClick={handleRoleChange}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
