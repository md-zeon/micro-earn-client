import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import StatusBadge from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/date";

const MyTaskTable = ({ tasks = [], onEditClick, onDeleteClick }) => {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Workers</TableHead>
            <TableHead className="text-right">Payable</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => {
            const total = task.total_workers || task.required_workers || 0;
            const filled = Math.max(0, total - (task.required_workers || 0));
            const progress = total > 0 ? Math.round((filled / total) * 100) : 0;

            return (
              <TableRow key={task._id}>
                <TableCell className="min-w-56">
                  <div className="flex items-center gap-3">
                    {task.task_image_url ? (
                      <img
                        src={task.task_image_url}
                        alt=""
                        className="size-10 shrink-0 rounded-lg border object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground [&>svg]:size-5">
                        <Pencil />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {task.task_title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Posted {formatDate(task.createdAt, { year: "numeric", month: "numeric", day: "numeric" })}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="min-w-36">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <p className="mb-1 text-xs text-muted-foreground tabular-nums">
                        {filled} / {total} filled
                      </p>
                      <Progress
                        value={progress}
                        aria-label={`${progress}% of workers filled`}
                        className={cn(
                          "h-1.5",
                          task.status === "completed" && "bg-muted [&_[data-slot=progress-indicator]]:bg-sky-500",
                        )}
                      />
                    </div>
                    <span className="text-xs font-medium tabular-nums">
                      {progress}%
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-right font-medium tabular-nums">
                  {task.payable_amount} <span className="text-xs text-muted-foreground">coins</span>
                </TableCell>

                <TableCell className="whitespace-nowrap text-sm text-muted-foreground tabular-nums">
                  {formatDate(task.completion_deadline, { year: "numeric", month: "numeric", day: "numeric" })}
                </TableCell>

                <TableCell>
                  <StatusBadge status={task.status} />
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Edit task: ${task.task_title}`}
                            onClick={() => onEditClick?.(task)}
                          />
                        }
                      >
                        <Pencil className="size-4" />
                      </TooltipTrigger>
                      <TooltipContent>Edit task</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-muted-foreground hover:text-destructive"
                            aria-label={`Delete task: ${task.task_title}`}
                            onClick={() => onDeleteClick?.(task)}
                          />
                        }
                      >
                        <Trash2 className="size-4" />
                      </TooltipTrigger>
                      <TooltipContent>Delete task</TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyTaskTable;
