import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import BasicLayout from "../layouts/BasicLayout";
import DashBoardLayout from "../layouts/DashBoardLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "../Routes/PrivateRoute";
import Dashboard from "../pages/Dashboard/Common/DashBoard";
import AddTask from "../pages/Dashboard/Buyer/AddTask";
import BuyerRoute from "./BuyerRoute";
import MyTasks from "../pages/Dashboard/Buyer/MyTasks";

const router = createBrowserRouter([
	{
		path: "/",
		Component: BasicLayout,
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
		],
	},
]);

export default router;
