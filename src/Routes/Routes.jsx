import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import BasicLayout from "../layouts/BasicLayout";
import DashBoardLayout from "../layouts/DashBoardLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

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
	}
]);

export default router;
