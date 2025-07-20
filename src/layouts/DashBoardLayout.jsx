import { Outlet } from "react-router";
import DashboardSidebar from "../pages/Dashboard/Common/DashboardSidebar";
import DashboardNavbar from "../pages/Dashboard/Common/DashboardNavbar";
// import useRole from "../hooks/useRole";

const DashBoardLayout = () => {
	// const { role, isRoleLoading } = useRole();

	// if (isRoleLoading) {
	// 	return (
	// 		<div className='flex justify-center items-center h-screen'>
	// 			<span className='loading loading-spinner loading-lg' />
	// 		</div>
	// 	);
	// }
    const role = 'Buyer'

	return (
		<div className='min-h-screen flex'>
			{/* Sidebar */}
			<DashboardSidebar role={role} />

			{/* Main Content */}
			<div className='flex-1'>
				{/* Top Navbar */}
				<DashboardNavbar />

				{/* Nested Pages Render Here */}
				<div className='p-4'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default DashBoardLayout;
