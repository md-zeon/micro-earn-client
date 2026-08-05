import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  Users,
  Coins,
  CalendarDays,
  FileText,
  ImagePlus,
  Loader2,
  Tag,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAvailableCoins from "../../../hooks/useAvailableCoins";
import PageHeader from "../../../components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PageTitle from "../../../components/PageTitle";

const today = new Date().toISOString().split("T")[0];

const TASK_CATEGORIES = [
  "Design",
  "Writing",
  "Research",
  "Data",
  "Development",
  "Marketing",
  "Video",
  "Other",
];

const AddTask = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { microCoins, refetch } = useAvailableCoins();

  const [form, setForm] = useState({
    task_title: "",
    task_detail: "",
    requiredWorkers: "",
    payableAmount: "",
    completion_deadline: "",
    submission_info: "",
    category: "",
  });
  const [taskImageUrl, setTaskImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const set = (key) => (e) => {
    const value = e.target.value;
    if (key === "requiredWorkers" || key === "payableAmount") {
      setForm((prev) => ({
        ...prev,
        [key]: value === "" ? "" : Math.max(1, parseInt(value, 10) || ""),
      }));
      return;
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const requiredWorkers = Number(form.requiredWorkers || 0);
  const payableAmount = Number(form.payableAmount || 0);
  const totalCost = requiredWorkers * payableAmount;
  const remaining = (microCoins || 0) - totalCost;
  const insufficientFunds = totalCost > (microCoins || 0);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgUploading(true);
    try {
      const url = await imageUpload(file);
      setTaskImageUrl(url);
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error("Image upload failed", err);
      toast.error("Image upload failed");
    } finally {
      setImgUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (insufficientFunds || totalCost <= 0) return;
    if (!form.category) {
      toast.error("Please select a category");
      return;
    }

    setLoading(true);
    const newTask = {
      task_title: form.task_title.trim(),
      task_detail: form.task_detail.trim(),
      required_workers: requiredWorkers,
      payable_amount: payableAmount,
      completion_deadline: form.completion_deadline,
      submission_info: form.submission_info.trim(),
      category: form.category,
      task_image_url: taskImageUrl,
      posted_by: user?.email,
      buyer_name: user?.displayName,
    };

    try {
      await axiosSecure.post("/tasks", newTask);
      await axiosSecure.patch(`/user/update-coins/${user?.email}`, {
        coinsToUpdate: totalCost,
        status: "decrease",
      });
      refetch();
      toast.success("Task created successfully");
      navigate("/dashboard/my-tasks");
    } catch (err) {
      console.error("Task Creation Failed", err);
      toast.error("Task creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      <PageTitle
        title="Add New Task"
        description="Create a new task for workers to complete and earn coins."
      />

      <PageHeader
        eyebrow="Tasks"
        title="Add New Task"
        description="Describe the work, set the budget, and publish it for workers."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-4 text-primary" aria-hidden="true" />
                Task Information
              </CardTitle>
              <CardDescription>
                Give workers everything they need to complete the task.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="task_title">Task Title *</Label>
                <Input
                  id="task_title"
                  name="task_title"
                  value={form.task_title}
                  onChange={set("task_title")}
                  placeholder="Enter a clear, descriptive title"
                  maxLength={120}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger
                    id="category"
                    className="w-full"
                    aria-label="Task category"
                  >
                    <Tag className="size-4 text-muted-foreground" aria-hidden="true" />
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {TASK_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="task_detail">Task Description *</Label>
                <Textarea
                  id="task_detail"
                  name="task_detail"
                  value={form.task_detail}
                  onChange={set("task_detail")}
                  placeholder="Explain what workers need to do, step by step"
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="submission_info">Submission Instructions *</Label>
                <Textarea
                  id="submission_info"
                  name="submission_info"
                  value={form.submission_info}
                  onChange={set("submission_info")}
                  placeholder="What should the worker submit as proof of completion?"
                  rows={3}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Budget & settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="size-4 text-primary" aria-hidden="true" />
                  Budget
                </CardTitle>
                <CardDescription>Set workers and payment per worker.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="required_workers">Required Workers *</Label>
                  <div className="relative">
                    <Users
                      className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      id="required_workers"
                      name="required_workers"
                      type="number"
                      inputMode="numeric"
                      min="1"
                      value={form.requiredWorkers}
                      onChange={set("requiredWorkers")}
                      onWheel={(e) => e.target.blur()}
                      placeholder="e.g. 100"
                      className="pl-8"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="payable_amount">Payment per Worker *</Label>
                  <div className="relative">
                    <Coins
                      className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      id="payable_amount"
                      name="payable_amount"
                      type="number"
                      inputMode="numeric"
                      min="1"
                      value={form.payableAmount}
                      onChange={set("payableAmount")}
                      onWheel={(e) => e.target.blur()}
                      placeholder="e.g. 10"
                      className="pl-8"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Workers earn this many coins per completed task.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="completion_deadline">Completion Deadline *</Label>
                  <div className="relative">
                    <CalendarDays
                      className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      id="completion_deadline"
                      name="completion_deadline"
                      type="date"
                      min={today}
                      value={form.completion_deadline}
                      onChange={set("completion_deadline")}
                      className="pl-8"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImagePlus className="size-4 text-primary" aria-hidden="true" />
                  Task Image *
                </CardTitle>
                <CardDescription>
                  Add a thumbnail to make your task stand out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={imgUploading}
                  required={!taskImageUrl}
                />
                {imgUploading && (
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Loader2 className="size-3.5 animate-spin" />
                    Uploading image...
                  </p>
                )}
                {taskImageUrl && (
                  <img
                    src={taskImageUrl}
                    alt="Uploaded task preview"
                    className="h-40 w-full rounded-lg border object-cover"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cost summary */}
        <Card
          className={cn(
            "border-primary/30",
            insufficientFunds && "border-destructive/50",
          )}
        >
          <CardContent className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Available coins</p>
                <p className="font-semibold tabular-nums">
                  <Wallet className="mr-1 inline size-3.5 text-muted-foreground" />
                  {microCoins ?? 0} coins
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="tabular-nums">
                  {requiredWorkers || "—"} × {payableAmount || "—"} coins
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Balance after</p>
                <p className="font-medium tabular-nums">{remaining} coins</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total cost</p>
              <p className="text-2xl font-bold tabular-nums text-primary">
                {totalCost} <span className="text-sm font-medium">coins</span>
              </p>
              {insufficientFunds && (
                <p className="mt-1 text-xs font-medium text-destructive">
                  Not enough coins. Please purchase more.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Coins are reserved upfront and refunded for unfilled workers.
          </p>
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient shadow-lg shadow-emerald-500/20 sm:w-auto"
            disabled={loading || imgUploading || insufficientFunds || totalCost <= 0}
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
                Creating Task...
              </>
            ) : (
              "Create Task"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
