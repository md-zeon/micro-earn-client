import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const UpdateTaskModal = ({ task, onClose, onUpdate }) => {
  if (!task) return null;

  return (
    <Dialog open={!!task} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-muted-foreground">
            Update functionality for task: <strong>{task.task_title}</strong>
          </p>
          {/* Add your update form fields here */}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-gradient" onClick={onUpdate}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTaskModal;
