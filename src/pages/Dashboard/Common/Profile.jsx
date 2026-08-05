import { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  BadgeCheck,
  CalendarDays,
  Camera,
  CircleDollarSign,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Coins,
  CreditCard,
  Mail,
  PencilLine,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import FormField from "../../../components/Form/FormField";
import PageHeader from "../../../components/shared/PageHeader";
import StatsCard from "../../../components/shared/StatsCard";
import ProfileSkeleton from "../../../components/ui/ProfileSkeleton";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../api/utils";
import { formatDate, timeAgo } from "../../../lib/date";

const ROLE_BADGE = {
  admin: "bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/25 dark:text-violet-400",
  buyer: "bg-sky-500/10 text-sky-600 ring-1 ring-sky-500/25 dark:text-sky-400",
  worker:
    "bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/25 dark:text-emerald-400",
};

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name cannot be empty")
    .min(2, "Name must be at least 2 characters"),
});

const EMPTY_STATS = {};

const getInitials = (name) =>
  (name || "U")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <span
      aria-hidden="true"
      className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground [&>svg]:size-4"
    >
      <Icon />
    </span>
    <div className="min-w-0">
      <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-0.5 truncate font-medium">{value}</dd>
    </div>
  </div>
);

const Profile = () => {
  const { user, updateUserProfile, refreshUser, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const fileInputRef = useRef(null);

  const [editOpen, setEditOpen] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    mode: "onTouched",
    defaultValues: { name: "" },
  });

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get("/user/me");
      return data;
    },
  });

  const dbUser = profile?.user;
  const stats = profile?.stats ?? EMPTY_STATS;
  const role = dbUser?.role;

  const displayName = dbUser?.name || user?.displayName || "Unnamed User";
  const email = dbUser?.email || user?.email || "";
  const photoURL = dbUser?.photoURL || user?.photoURL || "";
  const memberSince = formatDate(dbUser?.createdAt || user?.metadata?.creationTime);
  const lastLogin = timeAgo(dbUser?.lastLoggedInAt);
  const initials = getInitials(displayName);

  const statCards = useMemo(() => {
    const cards = [
      {
        label: "Available Coins",
        value: dbUser?.microCoins ?? 0,
        suffix: "coins",
        Icon: Coins,
        tone: "emerald",
        subtitle:
          role === "worker"
            ? "Ready to spend or withdraw"
            : role === "buyer"
              ? "Balance for posting tasks"
              : "Platform balance",
      },
    ];

    if (role === "worker") {
      cards.push(
        {
          label: "Tasks Completed",
          value: stats.completedTasks ?? 0,
          Icon: ClipboardCheck,
          tone: "sky",
          subtitle: "Approved submissions",
        },
        {
          label: "Total Earned",
          value: stats.totalEarned ?? 0,
          suffix: "coins",
          Icon: CircleDollarSign,
          tone: "violet",
          subtitle: "Across all approved tasks",
        },
        {
          label: "Pending Review",
          value: stats.pendingSubmissions ?? 0,
          Icon: Clock,
          tone: "amber",
          subtitle: "Awaiting buyer approval",
        },
      );
    } else if (role === "buyer") {
      cards.push(
        {
          label: "Tasks Posted",
          value: stats.postedTasks ?? 0,
          Icon: ClipboardList,
          tone: "sky",
          subtitle: "All-time listings",
        },
        {
          label: "Total Spent",
          value: stats.totalSpent ?? 0,
          suffix: "coins",
          Icon: CreditCard,
          tone: "violet",
          subtitle: "Committed to task rewards",
        },
        {
          label: "Submissions Received",
          value: stats.receivedSubmissions ?? 0,
          Icon: Users,
          tone: "amber",
          subtitle: "From workers",
        },
      );
    }

    return cards;
  }, [dbUser, role, stats]);

  if (loading || profileLoading) return <ProfileSkeleton />;

  const openEdit = () => {
    reset({ name: displayName });
    setPreview(photoURL);
    setPhotoFile(null);
    setEditOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const closeEdit = () => {
    setEditOpen(false);
    setPhotoFile(null);
  };

  const onSubmit = async (data) => {
    const trimmed = data.name.trim();

    setIsSaving(true);
    try {
      let updatedPhotoURL = photoURL;
      if (photoFile) {
        updatedPhotoURL = await imageUpload(photoFile);
      }

      await updateUserProfile(trimmed, updatedPhotoURL);
      await axiosSecure.patch("/user/update-profile", {
        name: trimmed,
        photoURL: updatedPhotoURL,
      });
      await refreshUser();

      toast.success("Profile updated successfully");
      setEditOpen(false);
      setPhotoFile(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Account"
        title="My Profile"
        description="View your account details, activity summary and preferences."
        actions={
          <Button variant="outline" size="sm" onClick={openEdit}>
            <PencilLine /> Edit Profile
          </Button>
        }
      />

      {/* Hero */}
      <Card className="overflow-hidden py-0">
        <div
          aria-hidden="true"
          className="h-28 bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-sky-500/15 sm:h-32 dark:from-emerald-500/25 dark:via-teal-500/25 dark:to-sky-500/25"
        />
        <div className="px-5 pb-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <Avatar className="-mt-10 size-20 ring-4 ring-background sm:-mt-12 sm:size-24">
                <AvatarImage src={photoURL} alt={displayName} />
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 pt-1 sm:pb-1">
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  {displayName}
                </h2>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  {role && (
                    <Badge
                      variant="outline"
                      className={`gap-1 capitalize ${ROLE_BADGE[role] ?? ""}`}
                    >
                      <ShieldCheck className="size-3" aria-hidden="true" />
                      {role}
                    </Badge>
                  )}
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Mail className="size-3.5" aria-hidden="true" />
                    {email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Role-based stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <StatsCard key={card.label} {...card} />
        ))}
      </div>

      {/* Account info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Details tied to your MicroEarn account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <InfoItem icon={Mail} label="Email" value={email} />
            <InfoItem icon={CalendarDays} label="Member Since" value={memberSince} />
            <InfoItem icon={Clock} label="Last Logged In" value={lastLogin} />
            <InfoItem
              icon={ShieldCheck}
              label="Account Type"
              value={role ? role.charAt(0).toUpperCase() + role.slice(1) : "—"}
            />
            <InfoItem
              icon={BadgeCheck}
              label="Account Status"
              value="Active"
            />
          </dl>
        </CardContent>
      </Card>

      {/* Edit profile dialog */}
      <Dialog open={editOpen} onOpenChange={(open) => (open ? setEditOpen(true) : closeEdit())}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your display name and profile photo.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage src={preview} alt="Profile preview" />
              <AvatarFallback className="text-xl">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera /> Change photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <FormField
              label="Display name"
              id="profile-name"
              error={errors.name?.message}
              required
            >
              <Input placeholder="Your name" {...register("name")} />
            </FormField>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeEdit} disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)} disabled={isSaving}>
              {isSaving ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
