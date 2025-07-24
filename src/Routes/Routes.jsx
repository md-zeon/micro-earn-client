import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import DashBoardLayout from "../layouts/DashBoardLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "../Routes/PrivateRoute";
import Dashboard from "../pages/Dashboard/Common/DashBoard";
import AddTask from "../pages/Dashboard/Buyer/AddTask";
import BuyerRoute from "./BuyerRoute";
import MyTasks from "../pages/Dashboard/Buyer/MyTasks";
import PurchaseCoin from "../pages/Dashboard/Buyer/PurchaseCoin";
import PaymentHistory from "../pages/Dashboard/Buyer/PaymentHistory";
import TasksToReview from "../pages/Dashboard/Buyer/TasksToReview";
import TasksList from "../pages/Dashboard/Worker/TasksList";
import WorkerRoute from "./WorkerRoute";
import MySubmissions from "../pages/Dashboard/Worker/MySubmissions";
import ApprovedSubmissions from "../pages/Dashboard/Worker/ApprovedSubmissions";
import Withdrawals from "../pages/Dashboard/Worker/Withdrawals";
import TaskDetails from "../pages/Dashboard/Worker/TaskDetails";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageTasks from "../pages/Dashboard/Admin/ManageTasks";
import WithdrawRequests from "../pages/Dashboard/Admin/WithdrawRequests";
import Profile from "../pages/Dashboard/Common/Profile";

const router = createBrowserRouter([
	{
		path: "/",
		Component: HomeLayout,
		children: [{ path: "/", element: <Home /> }],
	},
	{ path: "/login", element: <Login /> },
	{ path: "/register", element: <Register /> },
	{
		path: "/dashboard",
		Component: DashBoardLayout,
		children: [
			{
				index: true,
				element: (
					<PrivateRoute>
						<Dashboard />
					</PrivateRoute>
				),
			},
			{
				path: "add-task",
				element: (
					<PrivateRoute>
						<BuyerRoute>
							<AddTask />
						</BuyerRoute>
					</PrivateRoute>
				),
			},
			{
				path: "my-tasks",
				element: (
					<PrivateRoute>
						<BuyerRoute>
							<MyTasks />
						</BuyerRoute>
					</PrivateRoute>
				),
			},
			{
				path: "purchase-coin",
				element: (
					<PrivateRoute>
						<BuyerRoute>
							<PurchaseCoin />
						</BuyerRoute>
					</PrivateRoute>
				),
			},
			{
				path: "payment-history",
				element: (
					<PrivateRoute>
						<BuyerRoute>
							<PaymentHistory />
						</BuyerRoute>
					</PrivateRoute>
				),
			},
			{
				path: "tasks-to-review",
				element: (
					<PrivateRoute>
						<BuyerRoute>
							<TasksToReview />
						</BuyerRoute>
					</PrivateRoute>
				),
			},
			{
				path: "tasks-list",
				element: (
					<PrivateRoute>
						<WorkerRoute>
							<TasksList />
						</WorkerRoute>
					</PrivateRoute>
				),
			},
			{
				path: "task-details/:id",
				element: (
					<PrivateRoute>
						<WorkerRoute>
							<TaskDetails />
						</WorkerRoute>
					</PrivateRoute>
				),
			},
			{
				path: "my-submissions",
				element: (
					<PrivateRoute>
						<WorkerRoute>
							<MySubmissions />
						</WorkerRoute>
					</PrivateRoute>
				),
			},
			{
				path: "approved-submissions",
				element: (
					<PrivateRoute>
						<WorkerRoute>
							<ApprovedSubmissions />
						</WorkerRoute>
					</PrivateRoute>
				),
			},
			{
				path: "withdrawals",
				element: (
					<PrivateRoute>
						<WorkerRoute>
							<Withdrawals />
						</WorkerRoute>
					</PrivateRoute>
				),
			},
			{
				path: "manage-users",
				element: (
					<PrivateRoute>
						<AdminRoute>
							<ManageUsers />
						</AdminRoute>
					</PrivateRoute>
				),
			},
			{
				path: "manage-tasks",
				element: (
					<PrivateRoute>
						<AdminRoute>
							<ManageTasks />
						</AdminRoute>
					</PrivateRoute>
				),
			},
			{
				path: "withdraw-requests",
				element: (
					<PrivateRoute>
						<AdminRoute>
							<WithdrawRequests />
						</AdminRoute>
					</PrivateRoute>
				),
			},
			{
				path: "profile",
				element: (
					<PrivateRoute>
						<Profile />
					</PrivateRoute>
				),
			},
		],
	},
]);

export default router;
