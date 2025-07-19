import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import BasicLayout from "../layouts/BasicLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
// import DashboardLayout from '../layouts/DashboardLayout';
// import AdminDashboard from '../pages/Dashboard/Admin/AdminDashboard';
// import BuyerDashboard from '../pages/Dashboard/Buyer/BuyerDashboard';
// import WorkerDashboard from '../pages/Dashboard/Worker/WorkerDashboard';
// import PrivateRoutes from './PrivateRoutes';

const router = createBrowserRouter([
	{
		path: "/",
		element: <BasicLayout />,
		children: [{ path: "/", element: <Home /> }],
	},
	//   {
	//     path: '/dashboard',
	//     element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
	//     children: [
	//       { path: 'admin', element: <AdminDashboard /> },
	//       { path: 'buyer', element: <BuyerDashboard /> },
	//       { path: 'worker', element: <WorkerDashboard /> },
	//     ],
	//   },
	{ path: "/login", element: <Login /> },
	{ path: "/register", element: <Register /> },
]);

export default router;
