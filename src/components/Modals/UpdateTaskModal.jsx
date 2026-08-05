import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Loader2 } from "lucide-react";
import FormField from "../Form/FormField";
import RichTextEditor from "../Form/RichTextEditor";
import { stripHtml } from "@/lib/utils";

const updateTaskSchema = z.object({
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

const UpdateTaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  task,
  submitting = false,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(updateTaskSchema),
    mode: "onTouched",
    defaultValues: {
      task_title: task?.task_title || "",
      task_detail: task?.task_detail || "",
      submission_info: task?.submission_info || "",
    },
  });

  const requestClose = () => {
    if (submitting) return;
    if (isDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Leave without saving?",
      );
      if (!confirmLeave) return;
    }
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) requestClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="size-4 text-primary" aria-hidden="true" />
            Update Task
          </DialogTitle>
          <DialogDescription>
            Edit the task details below. Workers will see the updated
            information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <FormField
            label="Task Title"
            id="update-task_title"
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
            id="update-task_detail"
            error={errors.task_detail?.message}
            required
          >
            <Controller
              name="task_detail"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  id="update-task_detail"
                  value={field.value}
                  onChange={field.onChange}
                  ariaLabel="Task description"
                  error={!!errors.task_detail}
                />
              )}
            />
          </FormField>

          <FormField
            label="Submission Instructions"
            id="update-submission_info"
            error={errors.submission_info?.message}
            required
          >
            <Controller
              name="submission_info"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  id="update-submission_info"
                  value={field.value}
                  onChange={field.onChange}
                  ariaLabel="Submission instructions"
                  error={!!errors.submission_info}
                  minHeight="min-h-24"
                />
              )}
            />
          </FormField>

          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="ghost" onClick={requestClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTaskModal;
