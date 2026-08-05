import { useParams, useNavigate, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  FileText,
  Loader2,
  ArrowLeft,
  AlertCircle,
  Users,
  Coins,
  CalendarDays,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PageHeader from "../../../components/shared/PageHeader";
import FormField from "../../../components/Form/FormField";
import RichTextEditor from "../../../components/Form/RichTextEditor";
import StatusBadge from "../../../components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stripHtml } from "@/lib/utils";
import { formatDate } from "@/lib/date";
import PageTitle from "../../../components/PageTitle";

const editTaskSchema = z.object({
  task_title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(120, "Title must be 120 characters or fewer"),
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
});

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: task,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["task", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tasks/${id}`);
      return data;
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(editTaskSchema),
    mode: "onTouched",
    values: {
      task_title: task?.task_title || "",
      task_detail: task?.task_detail || "",
      submission_info: task?.submission_info || "",
    },
  });

  const goBack = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Leave without saving?",
      );
      if (!confirmLeave) return;
    }
    navigate("/dashboard/my-tasks");
  };

  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch(`/tasks/${id}`, data);
      toast.success("Task has been updated successfully");
      navigate("/dashboard/my-tasks");
    } catch (err) {
      console.error("Update Task Error:", err);
      toast.error("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="w-full space-y-8">
      <PageTitle
        title="Edit Task"
        description="Update the details of your posted task."
      />

      <PageHeader
        eyebrow="Tasks"
        title="Edit Task"
        description="Review your task details and save any changes."
        actions={
          <Button render={<Link to="/dashboard/my-tasks" />} variant="outline">
            <ArrowLeft className="size-4" data-icon="inline-start" />
            Back to My Tasks
          </Button>
        }
      />

      {isLoading ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-44 w-full" />
              <Skeleton className="h-36 w-full" />
            </CardContent>
          </Card>
        </div>
      ) : isError || !task ? (
        <Card className="mx-auto max-w-lg">
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <AlertCircle className="size-10 text-destructive" aria-hidden="true" />
            <div>
              <p className="text-base font-semibold">Task not found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                We couldn't load this task. It may have been deleted.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => refetch()}
                disabled={isLoading}
              >
                <Loader2
                  className={isLoading ? "size-4 animate-spin" : "size-4"}
                  data-icon="inline-start"
                />
                Try Again
              </Button>
              <Button
                render={<Link to="/dashboard/my-tasks" />}
                className="bg-gradient"
              >
                Back to My Tasks
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <form
          key={task._id}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-4 text-primary" aria-hidden="true" />
                Task Information
              </CardTitle>
              <CardDescription>
                Workers will see the updated details when they view this task.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                label="Task Title"
                id="edit-task_title"
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
                label="Task Description"
                id="edit-task_detail"
                error={errors.task_detail?.message}
                required
                hint="Workers see this as formatted text — use headings and lists to keep it clear."
              >
                <Controller
                  name="task_detail"
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor
                      id="edit-task_detail"
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
                id="edit-submission_info"
                error={errors.submission_info?.message}
                required
                hint="What should the worker submit as proof of completion?"
              >
                <Controller
                  name="submission_info"
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor
                      id="edit-submission_info"
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

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="size-4 text-primary" aria-hidden="true" />
                  Budget
                </CardTitle>
                <CardDescription>
                  Budget fields are locked on this task.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Users className="size-4" aria-hidden="true" />
                    Workers
                  </span>
                  <span className="font-medium tabular-nums">
                    {task.required_workers}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Coins className="size-4" aria-hidden="true" />
                    Payment per worker
                  </span>
                  <span className="font-medium tabular-nums">
                    {task.payable_amount} coins
                  </span>
                </div>
                <div className="flex items-center justify-between border-t pt-3">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="size-4" aria-hidden="true" />
                    Deadline
                  </span>
                  <span className="font-medium tabular-nums">
                    {formatDate(task.completion_deadline, {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <StatusBadge status={task.status} />
                </div>
              </CardContent>
            </Card>

            {task.task_image_url && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">
                    Task Image
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={task.task_image_url}
                    alt=""
                    className="h-40 w-full rounded-lg border object-cover"
                  />
                </CardContent>
              </Card>
            )}

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="bg-gradient shadow-lg shadow-emerald-500/20"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      className="size-4 animate-spin"
                      data-icon="inline-start"
                    />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Button type="button" variant="ghost" onClick={goBack}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditTask;
