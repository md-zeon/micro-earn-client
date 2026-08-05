import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import FormField from "../../../components/Form/FormField";
import RichTextEditor from "../../../components/Form/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { cn, stripHtml } from "@/lib/utils";
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

const addTaskSchema = z.object({
  task_title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(120, "Title must be 120 characters or fewer"),
  category: z.string().min(1, "Please select a category"),
  task_detail: z
    .string()
    .refine(
      (value) => stripHtml(value).length >= 20,
      "Description must be at least 20 characters",
    ),
  submission_info: z
    .string()
    .refine(
      (value) => stripHtml(value).length >= 10,
      "Submission instructions must be at least 10 characters",
    ),
  requiredWorkers: z.coerce
    .number()
    .int("Enter a whole number")
    .min(1, "At least 1 worker required"),
  payableAmount: z.coerce
    .number()
    .int("Enter a whole number")
    .min(1, "Payment must be at least 1 coin"),
  completion_deadline: z.string().min(1, "Choose a completion deadline"),
});

const AddTask = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { microCoins, refetch } = useAvailableCoins();

  const [taskImageUrl, setTaskImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addTaskSchema),
    mode: "onTouched",
    defaultValues: {
      task_title: "",
      category: "",
      task_detail: "",
      submission_info: "",
      requiredWorkers: "",
      payableAmount: "",
      completion_deadline: "",
    },
  });

  const requiredWorkers = Number(watch("requiredWorkers")) || 0;
  const payableAmount = Number(watch("payableAmount")) || 0;
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

  const onSubmit = async (data) => {
    setLoading(true);
    const newTask = {
      task_title: data.task_title.trim(),
      task_detail: data.task_detail,
      required_workers: data.requiredWorkers,
      payable_amount: data.payableAmount,
      completion_deadline: data.completion_deadline,
      submission_info: data.submission_info,
      category: data.category,
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

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
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
              <FormField
                label="Task Title"
                id="task_title"
                error={errors.task_title?.message}
                required
              >
                <Input
                  placeholder="Enter a clear, descriptive title"
                  maxLength={120}
                  {...register("task_title")}
                />
              </FormField>

              <FormField
                label="Category"
                id="category"
                error={errors.category?.message}
                required
              >
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="category"
                        className="w-full"
                        aria-label="Task category"
                        aria-invalid={!!errors.category}
                        aria-describedby={
                          errors.category ? "category-error" : undefined
                        }
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
                  )}
                />
              </FormField>

              <FormField
                label="Task Description"
                id="task_detail"
                error={errors.task_detail?.message}
                required
                hint="Workers see this as formatted text — use headings and lists to keep it clear."
              >
                <Controller
                  name="task_detail"
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor
                      id="task_detail"
                      value={field.value}
                      onChange={field.onChange}
                      ariaLabel="Task description"
                      error={!!errors.task_detail}
                      minHeight="min-h-40"
                    />
                  )}
                />
              </FormField>

              <FormField
                label="Submission Instructions"
                id="submission_info"
                error={errors.submission_info?.message}
                required
                hint="What should the worker submit as proof of completion?"
              >
                <Controller
                  name="submission_info"
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor
                      id="submission_info"
                      value={field.value}
                      onChange={field.onChange}
                      ariaLabel="Submission instructions"
                      error={!!errors.submission_info}
                      minHeight="min-h-28"
                    />
                  )}
                />
              </FormField>
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
                <FormField
                  label="Required Workers"
                  id="required_workers"
                  error={errors.requiredWorkers?.message}
                  required
                  trailing={
                    <Users
                      className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                  }
                >
                  <Input
                    type="number"
                    inputMode="numeric"
                    min="1"
                    placeholder="e.g. 100"
                    className="pl-8"
                    onWheel={(e) => e.target.blur()}
                    {...register("requiredWorkers")}
                  />
                </FormField>

                <FormField
                  label="Payment per Worker"
                  id="payable_amount"
                  error={errors.payableAmount?.message}
                  required
                  trailing={
                    <Coins
                      className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                  }
                >
                  <Input
                    type="number"
                    inputMode="numeric"
                    min="1"
                    placeholder="e.g. 10"
                    className="pl-8"
                    onWheel={(e) => e.target.blur()}
                    {...register("payableAmount")}
                  />
                </FormField>
                <p className="text-xs text-muted-foreground">
                  Workers earn this many coins per completed task.
                </p>

                <FormField
                  label="Completion Deadline"
                  id="completion_deadline"
                  error={errors.completion_deadline?.message}
                  required
                  trailing={
                    <CalendarDays
                      className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                  }
                >
                  <Input
                    type="date"
                    min={today}
                    className="pl-8"
                    {...register("completion_deadline")}
                  />
                </FormField>
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
