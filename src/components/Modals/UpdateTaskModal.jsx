import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Loader2 } from "lucide-react";

const UpdateTaskModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  task,
  submitting = false,
}) => {
  // Auto-fill when a task is provided directly (alternative API)
  useEffect(() => {
    if (isOpen && task && setFormData) {
      setFormData({
        task_title: task.task_title || "",
        task_detail: task.task_detail || "",
        submission_info: task.submission_info || "",
      });
    }
  }, [isOpen, task, setFormData]);

  if (!isOpen) return null;

  const update = (key) => (e) => {
    setFormData?.((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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

        <form onSubmit={handleSubmit} className="space-y-4" id="update-task-form">
          <div className="space-y-1.5">
            <Label htmlFor="update-task_title">Task Title</Label>
            <Input
              id="update-task_title"
              value={formData?.task_title || ""}
              onChange={update("task_title")}
              placeholder="Enter a clear, descriptive title"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="update-task_detail">Task Description</Label>
            <Textarea
              id="update-task_detail"
              value={formData?.task_detail || ""}
              onChange={update("task_detail")}
              placeholder="Explain what workers need to do"
              rows={4}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="update-submission_info">Submission Instructions</Label>
            <Textarea
              id="update-submission_info"
              value={formData?.submission_info || ""}
              onChange={update("submission_info")}
              placeholder="What should the worker submit as proof?"
              rows={3}
              required
            />
          </div>

          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient"
              disabled={submitting}
            >
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
