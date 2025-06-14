
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, Mail, ShieldCheck, AlertTriangle } from 'lucide-react';
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
import LoadingSpinner from '@/components/LoadingSpinner';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userData } = useAuth();

  // Protective check for permissions
  const canEditUsers = userData?.role === 'owner';

  const handleRoleChangeRequest = (user: AppUser) => {
    if (!canEditUsers) {
      toast({
        title: 'Access denied',
        description: 'You do not have permission to edit user roles.',
        variant: 'destructive',
      });
      return;
    }

    if (user.auth_id === userData?.id) {
      toast({
        title: 'Cannot edit own role',
        description: 'You cannot change your own role.',
        variant: 'destructive',
      });
      return;
    }

    setEditingUser(user);
    setSelectedRole(user.role);
  };

  const handleRoleChangeConfirm = () => {
    if (!editingUser || !selectedRole) return;
    setShowConfirmDialog(true);
  };

  const handleRoleChange = async () => {
    if (!editingUser || !selectedRole) return;

    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user role locally
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...user, role: selectedRole } : user
      ));

      toast({
        title: 'Role updated successfully',
        description: `${editingUser.name}'s role has been updated to ${selectedRole}.`,
      });

      setEditingUser(null);
      setSelectedRole(null);
      setShowConfirmDialog(false);
    } catch (error) {
      console.error('Error updating role:', error);
      setError('Failed to update user role. Please try again.');
      toast({
        title: 'Failed to update role',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
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

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'owner':
        return 'Full access to all features and user management';
      case 'manager':
        return 'Can manage transactions and view reports';
      case 'cashier':
        return 'Can process payments and basic operations';
      case 'viewer':
        return 'Read-only access to view data';
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
        {!canEditUsers && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You have read-only access to user information.
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" text="Loading users..." />
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
                  <div key={user.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-bold text-lg flex items-center gap-2">
                          {user.name}
                          {user.auth_id === userData?.id && (
                            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-muted-foreground px-2 py-0.5 rounded">
                              You
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getRoleDescription(user.role)}
                        </p>
                      </div>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </div>
                    
                    {canEditUsers && userData.id !== user.auth_id && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2 text-xs"
                        onClick={() => handleRoleChangeRequest(user)}
                        disabled={loading}
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

        <Dialog open={!!editingUser && !showConfirmDialog} onOpenChange={(open) => !open && setEditingUser(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change User Role</DialogTitle>
              <DialogDescription>
                Update the role for {editingUser?.name}. This will change their access permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={selectedRole || undefined}
                  onValueChange={(value) => setSelectedRole(value as UserRole)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">
                      <div>
                        <div className="font-medium">Manager</div>
                        <div className="text-xs text-muted-foreground">Can manage transactions and view reports</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="cashier">
                      <div>
                        <div className="font-medium">Cashier</div>
                        <div className="text-xs text-muted-foreground">Can process payments and basic operations</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="viewer">
                      <div>
                        <div className="font-medium">Viewer</div>
                        <div className="text-xs text-muted-foreground">Read-only access to view data</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setEditingUser(null)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleRoleChangeConfirm}
                disabled={!selectedRole || selectedRole === editingUser?.role || loading}
              >
                {loading ? <LoadingSpinner size="sm" /> : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <ConfirmationDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
          onConfirm={handleRoleChange}
          title="Confirm Role Change"
          description={`Are you sure you want to change ${editingUser?.name}'s role to ${selectedRole}? This will immediately update their access permissions.`}
          confirmText="Yes, Change Role"
          cancelText="Cancel"
          variant="default"
        />
      </CardContent>
    </Card>
  );
};

export default UserManagement;
