import { Outlet } from "react-router";
import useRole from "../hooks/useRole";
import DashboardSidebar from "../pages/Dashboard/Common/DashboardSidebar";
import DashboardFooter from "../pages/Dashboard/Common/DashboardFooter";
import DashboardNavbar from "../pages/Dashboard/Common/DashboardNavbar";

const DashboardLayout = () => {
  const { role, isRoleLoading } = useRole();


	if (isRoleLoading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<span className='loading loading-spinner loading-lg'></span>
			</div>
		);
	}

	return (
		<div className='flex flex-col min-h-screen'>
			{/* Header */}
			<header className='flex justify-between items-center p-4 bg-base-200 shadow sticky top-0 z-50'>
				<DashboardNavbar role={role} />
			</header>

			{/* Main content area: Sidebar + Content */}
			<div className='flex flex-1 overflow-hidden'>
				<DashboardSidebar role={role} />

				<main className='flex-1 overflow-auto p-6 bg-base-100'>
					<Outlet />
				</main>
			</div>

			{/* Footer */}
			<DashboardFooter />
		</div>
	);
};

export default DashboardLayout;
