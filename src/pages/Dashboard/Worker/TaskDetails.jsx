import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CalendarDays,
  Coins,
  Users,
  UserRound,
  Upload,
  ChevronLeft,
  Info,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../api/utils";
import TaskDetailsSkeleton from "../../../components/ui/TaskDetailsSkeleton";
import PageTitle from "../../../components/PageTitle";
import { Button } from "../../../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import FormField from "../../../components/Form/FormField";
import RichText from "../../../components/shared/RichText";

const submissionSchema = z.object({
  submission_details: z
    .string()
    .trim()
    .min(1, "Submission details cannot be empty")
    .min(10, "Details must be at least 10 characters"),
});

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [proofImage, setProofImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(submissionSchema),
    mode: "onTouched",
    defaultValues: { submission_details: "" },
  });

  const { data: task, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tasks/${id}`);
      return data;
    },
  });

  const deadlinePassed = new Date(task?.completion_deadline) < new Date() + 1;

  const onSubmit = async (data) => {
    let proof_img_url = "";
    if (proofImage) {
      try {
        proof_img_url = await imageUpload(proofImage);
      } catch (err) {
        console.error("Image upload error:", err);
        toast.error("Failed to upload proof image! Please try again.");
        return;
      }
    }

    setLoading(true);
    const submission = {
      task_id: task?._id,
      task_title: task?.task_title,
      payable_amount: task?.payable_amount,
      worker_email: user?.email,
      submission_details: data.submission_details,
      worker_name: user?.displayName,
      buyer_name: task?.buyer_name,
      buyer_email: task?.posted_by,
      submission_date: new Date().toISOString(),
      proof_img: proof_img_url,
    };

    try {
      await axiosSecure.post("/submissions", submission);
      toast.success("Submission successful!");
      reset();
      navigate("/dashboard/my-submissions");
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to submit task! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <TaskDetailsSkeleton />;
  if (!task)
    return <div className="text-center text-muted-foreground">Task not found</div>;

  return (
    <div className="space-y-8">
      <PageTitle
        title="Task Details"
        description="View detailed information about the selected task."
      />

      <Button
        variant="outline"
        onClick={() => navigate("/dashboard/tasks-list")}
      >
        <ChevronLeft />
        Back to Tasks
      </Button>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">{task?.task_title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {task?.task_image_url && (
                <img
                  src={task?.task_image_url}
                  alt={task?.task_title}
                  className="max-h-80 w-full rounded-lg object-cover"
                />
              )}
              <div>
                <h2 className="mb-2 text-lg font-semibold">Description</h2>
                <RichText
                  html={task?.task_detail}
                  className="text-muted-foreground"
                />
              </div>
              <div>
                <h2 className="mb-2 text-lg font-semibold">
                  Submission Requirements
                </h2>
                <RichText
                  html={task?.submission_info}
                  className="text-muted-foreground"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full space-y-6 lg:w-80 xl:w-96">
          <Card>
            <CardHeader>
              <CardTitle>Task Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Coins className="size-4" /> Payment
                </span>
                <Badge variant="secondary">
                  {task?.payable_amount} coins
                </Badge>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="size-4" /> Deadline
                </span>
                <span>{new Date(task?.completion_deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Users className="size-4" /> Workers Needed
                </span>
                <span>{task?.required_workers}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <UserRound className="size-4" /> Posted By
                </span>
                <span>{task?.buyer_name}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="size-4" /> Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Complete all requirements before submitting</li>
                <li>Submissions are reviewed within 24-48 hours</li>
                <li>Payment is released upon approval</li>
                <li>Rejected submissions won't be paid</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="size-4" /> Submit Your Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          {deadlinePassed && (
            <Badge variant="destructive" className="mb-4">
              This task is no longer accepting submissions (Deadline passed).
            </Badge>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="proof">Upload Screenshot (optional)</Label>
              <Input
                id="proof"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setProofImage(file);
                  if (file) {
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }}
              />
              {previewUrl && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Image Preview:
                  </p>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-64 rounded-lg border"
                  />
                </div>
              )}
            </div>

            <FormField
              label="Submission Details"
              id="details"
              error={errors.submission_details?.message}
              required
            >
              <Textarea
                placeholder="Describe your completed task, include necessary links or proof..."
                className="min-h-32"
                {...register("submission_details")}
              />
            </FormField>

            <Button
              type="submit"
              className="w-full bg-gradient"
              disabled={
                loading || deadlinePassed || (task?.required_workers ?? 0) <= 0
              }
            >
              {loading ? "Submitting..." : "Submit Work"}
              {!loading && <ArrowRight />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetails;
