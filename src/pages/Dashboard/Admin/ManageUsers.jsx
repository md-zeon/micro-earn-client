import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Coins, ShieldAlert, Trash2, UserRound, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import PageHeader from "../../../components/shared/PageHeader";
import PageTitle from "../../../components/PageTitle";
import DataTable from "../../../components/shared/DataTable";
import ManageUsersSkeleton from "../../../components/ui/ManageUsersSkeleton";
import useAdminUsers from "../../../hooks/useAdminUsers";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ROLE_STYLES = {
  admin: "bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/25 dark:text-violet-400",
  buyer: "bg-sky-500/10 text-sky-600 ring-1 ring-sky-500/25 dark:text-sky-400",
  worker: "bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/25 dark:text-emerald-400",
};

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

const ManageUsers = () => {
  const { users, isLoading, refetch } = useAdminUsers();
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useAuth();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [changingRoleId, setChangingRoleId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const summary = useMemo(() => {
    const counts = { total: users.length, admin: 0, buyer: 0, worker: 0 };
    users.forEach((u) => {
      if (counts[u.role] !== undefined) counts[u.role] += 1;
    });
    return counts;
  }, [users]);

  const handleRoleChange = async (userId, newRole) => {
    if (changingRoleId) return;
    setChangingRoleId(userId);
    try {
      await axiosSecure.patch(`/admin/update-role/${userId}`, { role: newRole });
      toast.success("Role updated successfully");
      refetch();
    } catch {
      toast.error("Failed to update role");
    } finally {
      setChangingRoleId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await axiosSecure.delete(`/admin/delete-user/${deleteTarget._id}`);
      toast.success("User deleted successfully");
      refetch();
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  if (isLoading) return <ManageUsersSkeleton />;

  const isSelf = (user) =>
    user?.email?.toLowerCase() === currentUser?.email?.toLowerCase();

  const columns = [
    {
      key: "user",
      header: "User",
      cell: (u) => (
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage src={u?.photoURL} alt={u?.name || u?.displayName} />
            <AvatarFallback>
              {(u?.name || u?.displayName)?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-tight">
            <span className="flex items-center gap-1.5 font-medium">
              {u?.name || u?.displayName || "Unknown"}
              {isSelf(u) && (
                <Badge variant="secondary" className="gap-1 text-[10px]">
                  <ShieldAlert className="size-3" aria-hidden="true" />
                  You
                </Badge>
              )}
            </span>
            <span className="text-xs text-muted-foreground">{u?.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      cell: (u) => (
        <Select
          value={u?.role}
          onValueChange={(value) => handleRoleChange(u._id, value)}
          disabled={isSelf(u)}
        >
          <SelectTrigger className="h-7 w-28" aria-label={`Change role for ${u?.email}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="buyer">Buyer</SelectItem>
            <SelectItem value="worker">Worker</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      key: "role_badge",
      header: "Access",
      cell: (u) => (
        <Badge variant="outline" className={ROLE_STYLES[u?.role] || ""}>
          {u?.role}
        </Badge>
      ),
      hideOnMobile: true,
    },
    {
      key: "microCoins",
      header: "Coins",
      cell: (u) => (
        <span className="inline-flex items-center gap-1.5 tabular-nums">
          <Coins className="size-3.5 text-amber-500" aria-hidden="true" />
          {Number(u?.microCoins ?? 0).toLocaleString()}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Joined",
      cell: (u) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(u?.createdAt)}
        </span>
      ),
      hideOnMobile: true,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (u) => (
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          aria-label={`Delete user ${u?.email}`}
          disabled={isSelf(u)}
          onClick={() => setDeleteTarget(u)}
        >
          <Trash2 aria-hidden="true" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageTitle
        title="Manage Users"
        description="Manage platform users, roles, and account access."
      />
      <PageHeader
        eyebrow="Administration"
        title="Manage Users"
        description="Review accounts, change roles, and remove users who violate the platform terms."
        actions={
          <Badge variant="secondary" className="gap-1 px-3 py-1">
            <Users className="size-3.5" aria-hidden="true" />
            {summary.total} total
          </Badge>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Users", value: summary.total, tone: "text-foreground" },
          { label: "Admins", value: summary.admin, tone: "text-violet-600 dark:text-violet-400" },
          { label: "Buyers", value: summary.buyer, tone: "text-sky-600 dark:text-sky-400" },
          { label: "Workers", value: summary.worker, tone: "text-emerald-600 dark:text-emerald-400" },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="flex flex-col gap-1 px-4 py-3">
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <span className={`text-xl font-bold tabular-nums ${item.tone}`}>
                {item.value}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <DataTable
        data={users}
        columns={columns}
        caption="Platform users"
        searchKeys={["name", "displayName", "email"]}
        searchPlaceholder="Search by name or email..."
        statusFilter={{
          key: "role",
          label: "Filter by role",
          options: [
            { label: "Admins", value: "admin" },
            { label: "Buyers", value: "buyer" },
            { label: "Workers", value: "worker" },
          ],
        }}
        emptyIcon={<UserRound />}
        emptyTitle="No users found"
        emptyDescription="Try adjusting your search or role filter."
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <strong>{deleteTarget?.email}</strong> and revoke their access.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-600 text-white hover:bg-red-500"
            >
              {isDeleting ? "Deleting..." : "Delete user"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageUsers;
