import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
// import Login from '../pages/Auth/Login';
// import Register from '../pages/Auth/Register';
// import DashboardLayout from '../layouts/DashboardLayout';
import BasicLayout from '../layouts/BasicLayout';
// import AdminDashboard from '../pages/Dashboard/Admin/AdminDashboard';
// import BuyerDashboard from '../pages/Dashboard/Buyer/BuyerDashboard';
// import WorkerDashboard from '../pages/Dashboard/Worker/WorkerDashboard';
// import PrivateRoutes from './PrivateRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      { path: '/', element: <Home /> },
    //   { path: '/login', element: <Login /> },
    //   { path: '/register', element: <Register /> },
    ],
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
]);

export default router;
