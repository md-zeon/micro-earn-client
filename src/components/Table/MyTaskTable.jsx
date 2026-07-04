import { LuEye, LuTrash2 } from "react-icons/lu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const MyTaskTable = ({ tasks, onViewClick, onDeleteClick }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Task Title</TableHead>
            <TableHead>Payable Amount</TableHead>
            <TableHead>Required Workers</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks?.map((task, idx) => (
            <TableRow key={task._id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell className="font-medium">{task.task_title}</TableCell>
              <TableCell>${task.payable_amount}</TableCell>
              <TableCell>{task.required_workers}</TableCell>
              <TableCell>
                <span className="capitalize text-sm">{task.status}</span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    onClick={() => onViewClick(task)}
                  >
                    <LuEye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => onDeleteClick(task)}
                  >
                    <LuTrash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyTaskTable;
