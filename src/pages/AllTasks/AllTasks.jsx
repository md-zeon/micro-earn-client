import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { LuCoins, LuCalendar, LuUsers } from "react-icons/lu";
import Container from "../../components/Container";
import PageTitle from "../../components/PageTitle";
import GlassCard from "../../components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("deadline-soon");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const sortedTasks = [...tasks].sort((a, b) => {
    switch (sortOption) {
      case "deadline-soon":
        return new Date(a.deadline) - new Date(b.deadline);
      case "deadline-far":
        return new Date(b.deadline) - new Date(a.deadline);
      case "highest-pay":
        return b.payable_amount - a.payable_amount;
      case "lowest-pay":
        return a.payable_amount - b.payable_amount;
      default:
        return 0;
    }
  });

  return (
    <Container>
      <PageTitle
        title="All Tasks"
        description="Browse all available micro-tasks posted by buyers. Find tasks that match your skills and start earning coins."
      />
      <div className="py-8 px-4 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Available Tasks</h1>
          <div className="w-full sm:w-48">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deadline-soon">Deadline: Soonest</SelectItem>
                <SelectItem value="deadline-far">Deadline: Farthest</SelectItem>
                <SelectItem value="highest-pay">Highest Pay</SelectItem>
                <SelectItem value="lowest-pay">Lowest Pay</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTasks?.map((task) => (
              <GlassCard key={task._id} className="h-full">
                <Card className="h-full border-0 shadow-none bg-transparent">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold truncate line-clamp-1">
                      {task.task_title}
                    </CardTitle>
                    <CardDescription>
                      Posted by: {task.buyer_name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {task.task_description || task.task_detail}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <LuCoins className="h-4 w-4" />
                        {task.payable_amount} coins
                      </span>
                      <span className="flex items-center gap-1">
                        <LuUsers className="h-4 w-4" />
                        {task.required_workers} workers
                      </span>
                      <span className="flex items-center gap-1">
                        <LuCalendar className="h-4 w-4" />
                        {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-gradient"
                      onClick={() => navigate(`/task-details/${task._id}`)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllTasks;
