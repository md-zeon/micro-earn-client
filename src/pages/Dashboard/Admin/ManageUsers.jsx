import { useState } from "react";
import { toast } from "sonner";
import useAdminUsers from "../../../hooks/useAdminUsers";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ManageUsersSkeleton from "../../../components/ui/ManageUsersSkeleton";
import PageTitle from "../../../components/PageTitle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ManageUsers = () => {
  const { users, isLoading, refetch } = useAdminUsers();
  const axiosSecure = useAxiosSecure();
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosSecure.patch(`/admin/update-role/${userId}`, {
        role: newRole,
      });
      toast.success("Role updated successfully");
      refetch();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = (user) => {
    setDeleteTarget(user);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await axiosSecure.delete(`/admin/delete-user/${deleteTarget._id}`);
      toast.success("User deleted successfully");
      refetch();
    } catch (err) {
      toast.error("Failed to delete user");
    } finally {
      setDeleteTarget(null);
    }
  };

  if (isLoading) return <ManageUsersSkeleton />;

  return (
    <div className="space-y-8">
      <PageTitle
        title="Manage Users"
        description="Manage platform users, roles, and account statuses."
      />
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.photoURL} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">
                      {user?.name || user?.displayName}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={user?.role}
                    onValueChange={(value) => handleRoleChange(user._id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="worker">Worker</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user{" "}
              <strong>{deleteTarget?.email}</strong>. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-gradient-error text-white hover:opacity-90"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageUsers;
