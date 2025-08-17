import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import useWorkerSubmissions from "../../hooks/useWorkerSubmissions";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const WorkerOverview = () => {
  const { submissions } = useWorkerSubmissions();
  const axiosSecure = useAxiosSecure();
  const [earningsData, setEarningsData] = useState([]);
  const [submissionStats, setSubmissionStats] = useState([]);

  useEffect(() => {
    const fetchWorkerStats = async () => {
      try {
        // Fetch earnings data
        const earningsRes = await axiosSecure.get("/worker/earnings-stats");
        setEarningsData(earningsRes.data);

        // Fetch submission statistics
        const submissionRes = await axiosSecure.get("/worker/submission-stats");
        setSubmissionStats(submissionRes.data);
      } catch (error) {
        console.error("Failed to fetch worker dashboard data:", error);
      }
    };

    fetchWorkerStats();
  }, [axiosSecure]);

  // Calculate submission statistics
  const totalSubmissions = submissions?.length ?? 0;
  const pendingSubmissions = submissions?.filter((s) => s?.status === "pending")?.length ?? 0;
  const approvedSubmissions = submissions?.filter((s) => s?.status === "approved")?.length ?? 0;
  const rejectedSubmissions = submissions?.filter((s) => s?.status === "rejected")?.length ?? 0;
  const totalEarnings = submissions?.filter((s) => s?.status === "approved")?.reduce((sum, item) => sum + (item?.payable_amount ?? 0), 0) ?? 0;

  const mockSubmissionStats = [
    { name: "Approved", value: approvedSubmissions },
    { name: "Pending", value: pendingSubmissions },
    { name: "Rejected", value: rejectedSubmissions },
  ];

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="space-y-8">
      {/* Charts */}
      <div className="grid grid-cols-1 gap-8">

        {/* Submission Distribution */}
        <div className="bg-base-200 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Submission Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={submissionStats.length > 0 ? submissionStats : mockSubmissionStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {mockSubmissionStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerOverview;